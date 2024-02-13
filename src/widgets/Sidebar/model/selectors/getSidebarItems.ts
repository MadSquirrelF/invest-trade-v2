import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import HomeIcon from 'shared/assets/icons/home-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import CartIcon from 'shared/assets/icons/cart-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import FavoriteIcon from 'shared/assets/icons/like-save-icon.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: HomeIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О компании',
            },
            {
                path: RoutePath.cart,
                Icon: CartIcon,
                text: 'Корзина',
            },
            {
                path: RoutePath.favorite,
                Icon: FavoriteIcon,
                text: 'Избранное',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
