export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    CART = 'cart',
    PROFILE = 'profile',
    FAVORITE = 'favorite',
    REGISTRATION = 'registration',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteCart= () => '/cart';
export const getRouteFavorite= () => '/favorite';
export const getRouteRegistration= () => '/registration';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteCart()]: AppRoutes.CART,
    [getRouteFavorite()]: AppRoutes.FAVORITE,
    [getRouteRegistration()]: AppRoutes.REGISTRATION,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
