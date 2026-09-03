import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Category, Restaurant } from '../../domain/restaurant/types';
import { restaurantService } from '../../services/restaurantService';
import { RestaurantGrid } from '../components/restaurant/RestaurantGrid';
import { Button } from '../components/common/Button/Button';
import {
  SearchIcon,
  SparklesIcon,
  ChevronRightIcon,
  BuildingIcon,
  AwardIcon,
} from '../components/common/Icons';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [topRatedRestaurants, setTopRatedRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [heroSearch, setHeroSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      setIsLoading(true);
      try {
        const [cats, allRest] = await Promise.all([
          restaurantService.getCategories(),
          restaurantService.getRestaurants({ limit: 10 }),
        ]);
        setCategories(cats);

        // Featured: prioritize sponsored & top rated
        const sponsored = allRest.data.filter((r) => r.is_sponsored);
        const organic = allRest.data.filter((r) => !r.is_sponsored);
        setFeaturedRestaurants([...sponsored, ...organic].slice(0, 3));

        // Top rated
        const topRated = [...allRest.data].sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 3);
        setTopRatedRestaurants(topRated);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/restaurants?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <SparklesIcon size={16} />
              <span>Nền tảng ẩm thực số #1 Long Xuyên, An Giang</span>
            </div>

            <h1 id="hero-heading" className="hero-title">
              Khám Phá Thiên Đường <br />
              <span className="hero-title-highlight">Ẩm Thực Long Xuyên</span>
            </h1>

            <p className="hero-description">
              Tìm kiếm hàng trăm quán ăn đặc sản, cơm tấm nhuyễn nức tiếng, bún cá cá lóc đồng và những quán cà phê đậm chất miền Tây sông nước.
            </p>

            <div className="hero-search-wrapper">
              <form className="hero-search-form" onSubmit={handleSearch}>
                <SearchIcon size={22} color="var(--color-text-secondary)" style={{ marginRight: '8px' }} />
                <input
                  type="search"
                  className="hero-search-input"
                  placeholder="Nhập tên quán, món ăn hoặc con đường (VD: Cơm tấm Cây Điệp, Lý Tự Trọng)..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  aria-label="Tìm kiếm quán ăn"
                />
                <Button type="submit" variant="primary">
                  Tìm kiếm
                </Button>
              </form>

              <div className="hero-tags">
                <span>Gợi ý:</span>
                <Link to="/restaurants?q=C%C6%A1m+t%E1%BA%A5m" className="hero-tag-link">Cơm tấm</Link>
                <Link to="/restaurants?q=B%C3%BAn+c%C3%A1" className="hero-tag-link">Bún cá An Giang</Link>
                <Link to="/restaurants?q=L%E1%BA%A9u+m%E1%BA%AFm" className="hero-tag-link">Lẩu mắm</Link>
                <Link to="/restaurants?q=C%C3%A0+ph%C3%AA" className="hero-tag-link">Cà phê vợt</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Chips */}
      <section className="container category-section" aria-labelledby="category-heading">
        <div className="section-header">
          <div>
            <h2 id="category-heading" className="section-title">Danh mục ẩm thực</h2>
            <p className="section-subtitle">Lựa chọn theo khẩu vị và phong cách ẩm thực ưa thích</p>
          </div>
          <Link to="/restaurants" className="section-link">
            Xem tất cả <ChevronRightIcon size={16} />
          </Link>
        </div>

        <div className="category-scroll-container" role="list">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 1 ? '/restaurants' : `/restaurants?category=${cat.slug}`}
              className="category-chip"
              role="listitem"
            >
              <span>{cat.icon || '🍽️'}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured & Sponsored Restaurants */}
      <section className="container" aria-labelledby="featured-heading">
        <div className="section-header">
          <div>
            <h2 id="featured-heading" className="section-title">
              <SparklesIcon size={24} color="var(--color-primary)" />
              Quán ăn nổi bật & được quan tâm
            </h2>
            <p className="section-subtitle">Địa điểm ăn uống được thực khách đánh giá cao và đề xuất nhiều nhất</p>
          </div>
          <Link to="/restaurants" className="section-link">
            Khám phá thêm <ChevronRightIcon size={16} />
          </Link>
        </div>

        <RestaurantGrid
          restaurants={featuredRestaurants}
          isLoading={isLoading}
          columns={3}
          skeletonCount={3}
        />
      </section>

      {/* 4. Top Rated Long Xuyên Specials */}
      <section className="container" aria-labelledby="top-rated-heading">
        <div className="section-header">
          <div>
            <h2 id="top-rated-heading" className="section-title">
              <AwardIcon size={24} color="#b45309" />
              Đặc sản Long Xuyên điểm cao nhất
            </h2>
            <p className="section-subtitle">Chắt lọc từ hàng ngàn nhận xét chân thực từ người địa phương</p>
          </div>
          <Link to="/restaurants?sort=rating" className="section-link">
            Bảng xếp hạng <ChevronRightIcon size={16} />
          </Link>
        </div>

        <RestaurantGrid
          restaurants={topRatedRestaurants}
          isLoading={isLoading}
          columns={3}
          skeletonCount={3}
        />
      </section>

      {/* 5. Business Partner Banner */}
      <section className="container" aria-labelledby="b2b-heading">
        <div className="b2b-banner">
          <div>
            <h2 id="b2b-heading" className="b2b-banner-title">Bạn là chủ nhà hàng hoặc quán ăn tại Long Xuyên?</h2>
            <p className="b2b-banner-desc">
              Tham gia mạng lưới Long Xuyên Food để xác thực quyền sở hữu, cập nhật thực đơn, tiếp cận hơn 50.000 thực khách địa phương và khách du lịch mỗi tháng.
            </p>
          </div>
          <div className="b2b-banner-actions">
            <Link to="/business">
              <Button variant="primary" leftIcon={<BuildingIcon size={18} />}>
                Trung tâm Chủ quán
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" style={{ color: '#ffffff', borderColor: '#475569' }}>
                Xem bảng giá gói Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
