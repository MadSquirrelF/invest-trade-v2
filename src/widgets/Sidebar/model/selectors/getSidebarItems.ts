import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import NewsIcon from '@/shared/assets/icons/news-icon.svg';
import CartIcon from '@/shared/assets/icons/cart-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import FavoriteIcon from '@/shared/assets/icons/like-save-icon.svg';
import CalculatorIcon from '@/shared/assets/icons/calculator-icon.svg';
import ShopIcon from '@/shared/assets/icons/shop-icon.svg';
import HelpIcon from '@/shared/assets/icons/help-icon.svg';
import {
    getRouteAbout,
    getRouteCalculator,
    getRouteCart,
    getRouteFavorite,
    getRouteHelp,
    getRouteMain,
    getRouteNews,
    getRouteProfile,
    getRouteShop,
} from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);

    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: HomeIcon,
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'О компании',
        },
        {
            path: getRouteNews(),
            Icon: NewsIcon,
            text: 'Новости',
        },
        {
            path: getRouteCalculator(),
            Icon: CalculatorIcon,
            text: 'Калькулятор',
        },
        {
            path: getRouteShop(),
            Icon: ShopIcon,
            text: 'Магазин',
        },
        {
            path: getRouteCart(),
            Icon: CartIcon,
            text: 'Корзина',
        },
        {
            path: getRouteFavorite(),
            Icon: FavoriteIcon,
            text: 'Избранное',
        },
        {
            path: getRouteHelp(),
            Icon: HelpIcon,
            text: 'Помощь',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData._id),
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};
