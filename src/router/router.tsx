import HomePage from '../pages/HomePage/HomePage.tsx';
import SearchPage from '../pages/SearchPage/SearchPage.tsx';
import NotificationPage from '../pages/NotificationPage/NotificationPage.tsx';
import UserPage from '../pages/UserPage/UserPage.tsx';
import MessagePage from '../pages/MessagePage/MessagePage.tsx';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // Redirect from root to login page
        { path: "/", element: <HomePage /> },
        { path: "/search", element: <SearchPage /> },
        { path: "/notification", element: <NotificationPage /> },
        { path: "/user", element: <UserPage /> },
        { path: "/message", element: <MessagePage />}
      ],
    },
  ]);