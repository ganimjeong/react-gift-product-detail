import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import MyPage from '@/pages/MyPage/MyPage';
import PrivateRoute from '@/PrivateRoute';
import OrderPage from '@/pages/OrderPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PATH } from '@/constants/paths';
import ThemeProductPage from '@/pages/ThemeProductPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <App />, // 기존 UI
    errorElement: <NotFoundPage />,
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATH.MY_PAGE,
    element: (
      <PrivateRoute>
        <MyPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATH.ORDER_DETAIL_PATH,
    element: (
      <PrivateRoute>
        <OrderPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATH.THEME_PRODUCTS_PATH,
    element: <ThemeProductPage />,
  },
  {
    path: PATH.PRODUCT_DETAIL_PATH,
    element: <ProductDetailPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={2000} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
