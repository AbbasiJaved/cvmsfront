import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Auth
import { AuthProvider } from "./providers/AuthProvider";

import {
  PublicRoute,
  AdminProtectedRoute,
  ProtectedRoute,
} from "./components/Routes";
import { AuthManager } from "./components/AuthManager";
import { Layout } from "./views/User/Layout";

import {
  Login,
  Logout,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
} from "./views/Auth";
import {
  AdminLayout,
  AdminCourses,
  Lecturers,
  AdminCourse,
  AdminVenues,
  AdminVenue,
  AdminSemesters,
  AdminSemester,
  AdminPrograms,
  AdminTimetables,
  AdminTimetable,
  AdminProgram,
  AdminMeetings,
} from "./views/Admin/";
import { Schedule, UserCourses, UserTimetables } from "./views/User";
import { NotificationProvider } from "./providers/NotificationProvider";
import {
  AuthorizationError,
  InternalServerError,
  NotFoundError,
} from "./views/Errors";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <AuthManager />
      </AuthProvider>
    ),
    children: [
      // user routes
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <UserCourses />,
          },
          {
            path: "/schedule",
            element: <Schedule />,
          },
          {
            path: "/timetables",
            element: <UserTimetables />,
          },
        ],
      },
      // auth routes
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: "/reset-password",
        element: (
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        ),
      },
      // admin routes
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          {
            path: "/admin/",
            element: <Lecturers />,
          },
          {
            path: "/admin/courses",
            element: <AdminCourses />,
          },
          {
            path: "/admin/courses/:id",
            element: <AdminCourse />,
          },
          { path: "/admin/venues", element: <AdminVenues /> },
          {
            path: "/admin/venues/:id",
            element: <AdminVenue />,
          },
          {
            path: "/admin/semesters",
            element: <AdminSemesters />,
          },
          {
            path: "/admin/semesters/:id",
            element: <AdminSemester />,
          },
          {
            path: "/admin/programs",
            element: <AdminPrograms />,
          },
          {
            path: "/admin/programs/:id",
            element: <AdminProgram />,
          },
          {
            path: "/admin/timetables",
            element: <AdminTimetables />,
          },
          {
            path: "/admin/timetables/:id",
            element: <AdminTimetable />,
          },
          {
            path: "/admin/meetings",
            element: <AdminMeetings />,
          },
        ],
      },
      {
        path: "/404",
        element: <NotFoundError />,
      },
      {
        path: "/403",
        element: <AuthorizationError />,
      },
      {
        path: "/500",
        element: <InternalServerError />,
      },
      { path: "*", element: <NotFoundError /> },
    ],
  },
]);

const App = () => (
  <NotificationProvider>
    <RouterProvider router={Router} />;
  </NotificationProvider>
);

export default App;
