import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect, useState } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { AppRouter } from './providers/router';

function App() {
    const [collapsed, setCollapsed] = useState(true);

    const dispatch = useDispatch();

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
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
