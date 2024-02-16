import { AboutPage } from 'pages/AboutPage';
import { CartPage } from 'pages/CartPage';
import { FavoritePage } from 'pages/FavoritePage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { ProfilePage } from 'pages/ProfilePage';

import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;

}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  CART = 'cart',
  PROFILE = 'profile',
  FAVORITE = 'favorite',
  REGISTRATION = 'registration',
  // last
  NOT_FOUND = 'not_found',
}
export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.CART]: '/cart',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.FAVORITE]: '/favorite',
    [AppRoutes.REGISTRATION]: '/registration',
    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.CART]: {
        path: RoutePath.cart,
        element: <CartPage />,
    },
    [AppRoutes.FAVORITE]: {
        path: RoutePath.favorite,
        element: <FavoritePage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        element: <RegistrationPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
