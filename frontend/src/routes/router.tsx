import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../presentation/layouts/MainLayout';
import { AuthLayout } from '../presentation/layouts/AuthLayout';

import { HomePage } from '../presentation/pages/HomePage';
import { DiscoveryPage } from '../presentation/pages/DiscoveryPage';
import { RestaurantDetailPage } from '../presentation/pages/RestaurantDetailPage';
import { SubmitRestaurantPage } from '../presentation/pages/SubmitRestaurantPage';
import { ClaimRestaurantPage } from '../presentation/pages/ClaimRestaurantPage';
import { LoginPage } from '../presentation/pages/LoginPage';
import { RegisterPage } from '../presentation/pages/RegisterPage';
import { ProfilePage } from '../presentation/pages/ProfilePage';
import { BusinessDashboardPage } from '../presentation/pages/BusinessDashboardPage';
import { PricingPage } from '../presentation/pages/PricingPage';
import { AboutPage } from '../presentation/pages/AboutPage';
import { ContactPage } from '../presentation/pages/ContactPage';
import { NotFoundPage } from '../presentation/pages/NotFoundPage';

export const router = createBrowserRouter([
  // Main Public Application Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'restaurants', element: <DiscoveryPage /> },
      { path: 'search', element: <DiscoveryPage /> },
      { path: 'restaurants/:slug', element: <RestaurantDetailPage /> },
      { path: 'restaurants/:slug/claim', element: <ClaimRestaurantPage /> },
      { path: 'restaurants/submit', element: <SubmitRestaurantPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'business', element: <BusinessDashboardPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Auth Layout Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);
