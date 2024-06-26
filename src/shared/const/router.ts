export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NEWS = 'news',
    NEW_DETAILS = 'new_details',
    PRODUCT_DETAILS = 'product_details',
    CART = 'cart',
    PROFILE = 'profile',
    CALCULATOR = 'calculator',
    SHOP = 'shop',
    HELP = 'help',
    FAVORITE = 'favorite',
    REGISTRATION = 'registration',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteNews = () => '/news';
export const getRouteCalculator = () => '/calculator';
export const getRouteNewDetails = (slug: string) => `/news/${slug}`;
export const getRouteProductDetails = (slug: string) => `/shop/${slug}`;
export const getRouteCart = () => '/cart';
export const getRouteHelp = () => '/help';
export const getRouteFavorite = () => '/favorite';
export const getRouteRegistration = () => '/registration';
export const getRouteShop = () => '/shop';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteNews()]: AppRoutes.NEWS,
    [getRouteCalculator()]: AppRoutes.CALCULATOR,
    [getRouteNewDetails(':slug')]: AppRoutes.NEW_DETAILS,
    [getRouteProductDetails(':slug')]: AppRoutes.PRODUCT_DETAILS,
    [getRouteCart()]: AppRoutes.CART,
    [getRouteHelp()]: AppRoutes.HELP,
    [getRouteFavorite()]: AppRoutes.FAVORITE,
    [getRouteRegistration()]: AppRoutes.REGISTRATION,
    [getRouteShop()]: AppRoutes.SHOP,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
