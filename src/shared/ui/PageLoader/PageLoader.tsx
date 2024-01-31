import { classNames } from 'shared/lib/classNames/classNames';
import { Loader, ThemeLoader } from '../Loader/Loader';
import style from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}
const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(style.PageLoader, {}, [className])}>
        <Loader theme={ThemeLoader.MAIN_LOADER} />
    </div>
);

export default PageLoader;
