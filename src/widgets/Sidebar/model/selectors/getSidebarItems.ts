import { getUserAuthData } from '@/entities/User';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import CartIcon from '@/shared/assets/icons/cart-icon.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import FavoriteIcon from '@/shared/assets/icons/like-save-icon.svg';
import { SidebarItemType } from '../types/sidebar';
import { getRouteAbout, getRouteCart, getRouteFavorite, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { useSelector } from 'react-redux';

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
            path: getRouteCart(),
            Icon: CartIcon,
            text: 'Корзина',
        },
        {
            path: getRouteFavorite(),
            Icon: FavoriteIcon,
            text: 'Избранное',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
}
