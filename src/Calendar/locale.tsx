import { ru } from 'date-fns/locale/ru';
import { Locale } from 'date-fns';

export const locale: Locale = {
  ...ru,
  localize: {
    ...ru.localize,
    day: (n, opts) => {
      const day = ru.localize.day(n, opts);
      return day.charAt(0).toUpperCase() + day.slice(1);
    },
    month: (n, opts) => {
      const month = ru.localize.month(n, opts);
      return month.charAt(0).toUpperCase() + month.slice(1);
    },
  },
};
