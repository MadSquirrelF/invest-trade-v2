import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import HomeIcon from 'shared/assets/icons/home-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
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
                text: 'О сайте',
            },
        ];

        // if (userData) {
        //     sidebarItemsList.push(
        //         {
        //             path: RoutePath.profile + userData.id,
        //             Icon: ProfileIcon,
        //             text: 'Профиль',
        //             authOnly: true,
        //         },
        //         {
        //             path: RoutePath.articles,
        //             Icon: ArticlesIcon,
        //             text: 'Статьи',
        //             authOnly: true,
        //         },
        //     );
        // }

        return sidebarItemsList;
    },
);
