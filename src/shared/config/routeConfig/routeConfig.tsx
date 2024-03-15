import { RouteProps } from 'react-router-dom';

import {
    AppRoutes,
    getRouteAbout,
    getRouteCart,
    getRouteFavorite,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteRegistration,
} from '@/shared/const/router';
import { UserRole } from '@/entities/User';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { CartPage } from '@/pages/CartPage';
import { FavoritePage } from '@/pages/FavoritePage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
    notAutOnly?: boolean;
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.CART]: {
        path: getRouteCart(),
        element: <CartPage />,
    },
    [AppRoutes.FAVORITE]: {
        path: getRouteFavorite(),
        element: <FavoritePage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,
        notAutOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
