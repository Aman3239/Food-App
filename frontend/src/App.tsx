import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetail from './components/RestaurantDetail'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'
import AddMenu from './admin/AddMenu'
import Orders from './admin/Orders'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import React, { useEffect } from 'react'
import Loading from './components/Loading'
import { useThemeStore } from './store/useThemeStore'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthentication, user } = useUserStore();
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children;
}

const AuthenticationUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthentication, user } = useUserStore();
  if (isAuthentication && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthentication } = useUserStore();
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }
  return children;

}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/status",
        element: <Success />
      },
      ///**admin service start here.. */
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute>
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>
      },
      {
        path: "admin/orders",
        element: <AdminRoute><Orders /></AdminRoute>
      },

    ]
  },
  {
    path: "/login",
    element: <AuthenticationUser><Login /></AuthenticationUser>
  },
  {
    path: "/signup",
    element: <AuthenticationUser><Signup /></AuthenticationUser>
  },
  {
    path: "/forgot-password",
    element: <AuthenticationUser><ForgotPassword /></AuthenticationUser>
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  }
])

function App() {
  const initializeTheme=useThemeStore((state:any)=>state.initializeTheme);
  const {checkAuthentication,isCheackingAuth}=useUserStore();
  //checking auth every time when page is loaded
  useEffect(()=>{
    checkAuthentication();
    initializeTheme();
  },[checkAuthentication])

  if(isCheackingAuth) return <Loading/>
  return (
    <>
      <main>
        <RouterProvider router={appRouter}></RouterProvider>
      </main>
    </>
  )
}

export default App
