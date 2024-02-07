export const USER_LOCALSTORAGE_KEY = 'user';

export const ARTICLES_VIEW_LOCALSTORAGE_KEY = 'articles_view';

export const getStoreLocal = (name: string) => {
    if (typeof localStorage !== 'undefined') {
        const ls = localStorage.getItem(name);
        return ls ? JSON.parse(ls) : null;
    }
    return null;
};
