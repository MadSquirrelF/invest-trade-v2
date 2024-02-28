/* eslint-disable import/no-relative-packages */
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import 'shared/config/i18n/i18n';
import 'app/styles/index.scss';
import '../node_modules/swiper/swiper.scss';
import '../node_modules/swiper/modules/pagination.scss';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать реакт приложение');
}
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider initialTheme={Theme.LIGHT}>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
