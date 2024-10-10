// 'use client';
// import { useTranslations } from 'next-intl';

// export function useNestedTranslations(namespace: string) {
//   const t = useTranslations(namespace);

//   function getNestedTranslation(key: string) {
//     const keys = key.split('.');
//     let result: any = t.raw(keys[0]);
//     for (let i = 1; i < keys.length; i++) {
//       if (Array.isArray(result)) {
//         result = result[parseInt(keys[i])];
//       } else {
//         result = result[keys[i]];
//       }
//     }
//     return result;
//   }

//   return getNestedTranslation;
// }