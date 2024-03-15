/* eslint-disable import/no-relative-packages */
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './shared/config/i18n/i18n';
import '@/app/styles/index.scss';
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/modules/pagination.scss';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';
import { ThemeProvider } from './app/providers/ThemeProvider';


const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
              <ForceUpdateProvider>
                    <ThemeProvider>
                            <App />
                    </ThemeProvider>
               </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);

export { Theme } from '@/shared/const/theme';
