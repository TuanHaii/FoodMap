import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Category, Restaurant } from "../../domain/restaurant/types";
import { restaurantService } from "../../services/restaurantService";
import { RestaurantGrid } from "../components/restaurant/RestaurantGrid";
import {
  RestaurantFilter,
  type RestaurantFilterValues,
} from "../components/restaurant/RestaurantFilter";
import { Breadcrumb } from "../components/common/Breadcrumb/Breadcrumb";
import { Drawer } from "../components/common/Drawer/Drawer";
import { EmptyState } from "../components/common/EmptyState/EmptyState";
import { ErrorState } from "../components/common/ErrorState/ErrorState";
import { Pagination } from "../components/common/Pagination/Pagination";
import { Button } from "../components/common/Button/Button";
import { FilterIcon } from "../components/common/Icons";
import "./DiscoveryPage.css";

export const DiscoveryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // URL query params
  const query = searchParams.get("q") || "";
  const categorySlug = searchParams.get("category") || "";
  const sortParam =
    (searchParams.get("sort") as RestaurantFilterValues["sortBy"]) || "rating";

  const [filterValues, setFilterValues] = useState<RestaurantFilterValues>({
    sortBy: sortParam,
    rating: 0,
    isOpen: false,
  });

  // Load categories
  useEffect(() => {
    restaurantService.getCategories().then((cats) => {
      setCategories(cats);
      if (categorySlug) {
        const found = cats.find((c) => c.slug === categorySlug);
        if (found) {
          setFilterValues((prev) => ({ ...prev, categoryId: found.id }));
        }
      }
    });
  }, [categorySlug]);

  // Load restaurants
  const fetchRestaurants = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const search = query.trim()
        ? restaurantService.searchRestaurants
        : restaurantService.getRestaurants;
      const res = await search({
        q: query,
        category_id: filterValues.categoryId,
        rating: filterValues.rating,
        is_open: filterValues.isOpen,
        sort_by: filterValues.sortBy,
        page: currentPage,
        limit: 9,
      });
      setRestaurants(res.data);
      setTotalResults(res.total);
      setTotalPages(res.total_pages);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchRestaurants();
    });
  }, [query, filterValues, currentPage]);

  const handleFilterChange = (newValues: RestaurantFilterValues) => {
    setFilterValues(newValues);
    setCurrentPage(1);
    setIsFilterDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setFilterValues({
      sortBy: "rating",
      rating: 0,
      isOpen: false,
      categoryId: undefined,
    });
    setSearchParams({});
    setCurrentPage(1);
    setIsFilterDrawerOpen(false);
  };

  return (
    <div className="discovery-page">
      <div className="container">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            {
              label: query
                ? `Tìm kiếm: "${query}"`
                : "Khám phá quán ăn Long Xuyên",
            },
          ]}
        />

        <div className="discovery-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="discovery-sidebar">
            <RestaurantFilter
              categories={categories}
              values={filterValues}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Main Content Area */}
          <main className="discovery-main">
            <div className="discovery-toolbar">
              <div className="toolbar-header">
                <span className="toolbar-results-count">
                  {isLoading
                    ? "Đang tìm kiếm..."
                    : `Tìm thấy ${totalResults} quán ăn tại TP. Long Xuyên`}
                </span>

                <div className="toolbar-controls">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="filter-drawer-toggle-btn"
                    onClick={() => setIsFilterDrawerOpen(true)}
                    leftIcon={<FilterIcon size={16} />}
                  >
                    Bộ lọc{" "}
                    {filterValues.categoryId ||
                    filterValues.rating ||
                    filterValues.isOpen
                      ? "(Đang bật)"
                      : ""}
                  </Button>

                  {/* Sort Select */}
                  <div className="sort-select-wrapper">
                    <label htmlFor="sort-select" className="sr-only">
                      Sắp xếp theo
                    </label>
                    <select
                      id="sort-select"
                      className="sort-select"
                      value={filterValues.sortBy || "rating"}
                      onChange={(e) =>
                        handleFilterChange({
                          ...filterValues,
                          sortBy: e.target
                            .value as RestaurantFilterValues["sortBy"],
                        })
                      }
                    >
                      <option value="rating">Đánh giá cao nhất</option>
                      <option value="popular">Lượt ghé nhiều nhất</option>
                      <option value="newest">Mới cập nhật</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Error State */}
            {hasError && <ErrorState onRetry={fetchRestaurants} />}

            {/* Empty State */}
            {!isLoading && !hasError && restaurants.length === 0 && (
              <EmptyState
                title="Không tìm thấy quán ăn phù hợp"
                description="Hãy thử đổi từ khóa tìm kiếm, bỏ bớt bộ lọc hoặc đề xuất quán ăn mới cho cộng đồng Long Xuyên."
                actionText="Đặt lại bộ lọc"
                onAction={handleResetFilters}
              />
            )}

            {/* Restaurant Grid */}
            {!hasError && (
              <RestaurantGrid
                restaurants={restaurants}
                isLoading={isLoading}
                columns={3}
                skeletonCount={6}
              />
            )}

            {/* Pagination */}
            {!isLoading && !hasError && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setCurrentPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer (Requirement #19) */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Bộ lọc tìm kiếm quán ăn"
        position="left"
      >
        <RestaurantFilter
          categories={categories}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </Drawer>
    </div>
  );
};
