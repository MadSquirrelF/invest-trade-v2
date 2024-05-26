import './styles/index.scss';
import {
    Suspense, memo, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/router';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { useTheme } from './providers/ThemeProvider';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { getProfileData } from '@/features/editableProfileCard';
import { SizeSaveActions } from '@/features/SizeSave';

const App = memo(() => {
    const [collapsed, setCollapsed] = useState(false);

    const { theme } = useTheme();

    const dispatch = useAppDispatch();

    const inited = useSelector(getUserInited);

    const profileData = useSelector(getProfileData);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    useEffect(() => {
        function handleWindowResize() {
            dispatch(SizeSaveActions.setWith(window.innerWidth));
            dispatch(SizeSaveActions.setHeight(window.innerHeight));
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [dispatch]);

    if (!inited) {
        return (
            <div className={classNames('app', {}, [theme])}>
                <AppLoaderLayout />
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar onToggle={onToggle} />}
                    content={<AppRouter />}
                    sidebar={<Sidebar collapsed={collapsed} />}
                />
            </Suspense>
        </div>
    );
});

export default withTheme(App);
