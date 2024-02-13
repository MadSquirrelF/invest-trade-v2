import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect, useState } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { SizeSaveActions } from 'features/SizeSave';
import { AppRouter } from './providers/router';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

function App() {
    const [collapsed, setCollapsed] = useState(false);

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

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar onToggle={onToggle} />
                <div className="content-page">
                    <Sidebar collapsed={collapsed} />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
