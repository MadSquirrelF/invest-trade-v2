import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

export function convertDate(date: string) {
    return format(date, "EEEE',' dd MMMM' 'yyyy'г.'", {
        locale: ru,
    });
}
