import './styles/index.scss';
import {
    Suspense, memo, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, userActions } from '@/entities/User';
import { SizeSaveActions } from '@/features/SizeSave';
import { AppRouter } from './providers/router';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useTheme } from './providers/ThemeProvider';
import { MainLayout } from '@/shared/layouts/MainLayout';

const App = memo(() => {
    const [collapsed, setCollapsed] = useState(false);

    const { theme } = useTheme();

    const dispatch = useDispatch();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
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
            <div className={classNames('app', {}, [])}>
                <AppLoaderLayout />
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [])}>
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
