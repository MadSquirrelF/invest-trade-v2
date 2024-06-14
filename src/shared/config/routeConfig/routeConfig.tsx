import { RouteProps } from 'react-router-dom';

import {
    AppRoutes,
    getRouteAbout,
    getRouteCalculator,
    getRouteCart,
    getRouteFavorite,
    getRouteForbidden,
    getRouteHelp,
    getRouteMain,
    getRouteNewDetails,
    getRouteNews,
    getRouteProductDetails,
    getRouteProfile,
    getRouteRegistration,
    getRouteShop,
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
import { NewsPage } from '@/pages/NewsPage';
import { NewDetailsPage } from '@/pages/NewDetailsPage';
import { CalculatorPage } from '@/pages/CalculatorPage';
import { ShopPage } from '@/pages/ShopPage';
import { HelpPage } from '@/pages/HelpPage';
import { ShopDetailsPage } from '@/pages/ShopDetailsPage';

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
    [AppRoutes.NEWS]: {
        path: getRouteNews(),
        element: <NewsPage />,
    },
    [AppRoutes.CALCULATOR]: {
        path: getRouteCalculator(),
        element: <CalculatorPage />,
    },
    [AppRoutes.CART]: {
        path: getRouteCart(),
        element: <CartPage />,
    },
    [AppRoutes.HELP]: {
        path: getRouteHelp(),
        element: <HelpPage />,
    },
    [AppRoutes.SHOP]: {
        path: getRouteShop(),
        element: <ShopPage />,
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
    [AppRoutes.NEW_DETAILS]: {
        path: getRouteNewDetails(':slug'),
        element: <NewDetailsPage />,
    },
    [AppRoutes.PRODUCT_DETAILS]: {
        path: getRouteProductDetails(':slug'),
        element: <ShopDetailsPage />,
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
