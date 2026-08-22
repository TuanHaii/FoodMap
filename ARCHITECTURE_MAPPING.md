# Architecture mapping

This repository is a scaffold only. `docs/` is the source of truth; every TODO requires a corresponding Notion backlog task before implementation.

| Architecture decision | Repository mapping |
| --- | --- |
| #1 Product platform | `README.md`, `backend/app/Domain/`, `frontend/src/domain/` |
| #2 Laravel 12 / PHP 8.4 | `backend/composer.json`, `backend/app/` |
| #3 Client-API separation | `backend/app/Interfaces/`, `frontend/` |
| #4 React + TypeScript | `frontend/package.json`, `frontend/src/` |
| #5 Flutter future client | API-only boundaries in `backend/app/Interfaces/Http/` |
| #6 `/api/v1` | `backend/routes/api.php`, `backend/routes/api/v1/`, `frontend/src/shared/config/apiVersion.ts` |
| #7 Sanctum | `backend/app/Infrastructure/Auth/`, `backend/composer.json` |
| #8 PostgreSQL | `backend/docker-compose.yml`, `backend/database/migrations/` |
| #9 PostGIS | `backend/config/postgis.php`, `Restaurant` model placeholder |
| #10 Redis cache | `backend/app/Infrastructure/Cache/` |
| #11 Redis + Horizon queue | `backend/app/Providers/HorizonServiceProvider.php`, `Infrastructure/Storage/ImagePipelineJob.php` |
| #12 Database metadata, not image files | `backend/app/Domain/Media/`, `Infrastructure/.../Models/Media.php` |
| #13 Cloudflare R2 | `backend/config/r2.php`, `Infrastructure/Storage/R2StorageService.php` |
| #14 S3-compatible storage | `backend/composer.json`, `Infrastructure/Storage/` |
| #15 Cloudflare CDN/WAF | `README.md` deployment placeholder |
| #16 Image variants / WebP / AVIF | `Infrastructure/Storage/ImagePipelineJob.php` |
| #17 Resource-organized media keys | `Domain/Media/ValueObjects/StorageKey.php` |
| #18 Storage abstraction | `Application/Media/Ports/StorageServiceInterface.php` |
| #19 PostgreSQL FTS first | `Infrastructure/Search/PostgresFullTextSearchService.php` |
| #20 AI provider abstraction | `Application/Shared/Ports/AIProviderInterface.php`, `Infrastructure/AI/` |
| #21 Recommendation evolution | `Domain/Recommendation/` placeholder |
| #22 Docker + GitHub Actions | `backend/docker/`, `backend/docker-compose.yml`, `backend/.github/workflows/ci.yml` |
| #23 Sentry | `backend/config/sentry.php`, `Infrastructure/Monitoring/SentryLogger.php` |
| #24 Phased roadmap | `Domain/Subscription/` (Phase 2), Search/Recommendation/AI placeholders |

## Required source reconciliation before logic

- OpenAPI uses integer IDs, `name`, `latitude` and `longitude`; DDL uses UUIDs, `username`/`full_name`, and PostGIS `location`.
- OpenAPI defines token refresh but the DDL contains no token/refresh-token persistence contract.
- The business documents require community proposal, claim, business verification, moderation cases, entitlements, invoices and refunds; the current OpenAPI/DDL do not define their tables or endpoints.
- The DDL `media` table supplies `url` and `thumbnail_url`, while Decision #12 requires only metadata plus storage key; the canonical media contract must be clarified.
- DDL subscription states (`active`, `inactive`, `cancelled`, `expired`, `pending`) conflict with the B2B state machine (`TRIALING`, `ACTIVE`, `PAST_DUE`, `CANCELED`, `EXPIRED`, `PAUSED`).
- Favorites, check-ins, reports, notifications administration, search, recommendation and AI are named in the architectural/business material but have no matching complete API/DDL contract.
