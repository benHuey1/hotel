import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/config';
import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|es)/:path*']
};