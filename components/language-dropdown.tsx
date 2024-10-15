// 'use client';

// import React from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useLocale } from 'next-intl';
// import DropdownMenu from './ui/dropdown-menu';
// import { FrIcon, EnIcon, EsIcon } from '@/components/icons';

// const languages = [
//   { key: 'fr', label: 'Français', icon: <FrIcon /> },
//   { key: 'en', label: 'English', icon: <EnIcon /> },
//   { key: 'es', label: 'Español', icon: <EsIcon /> },
// ];

// export default function LanguageDropdown() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const locale = useLocale();

//   const handleLanguageChange = (newLocale: string) => {
//     if (newLocale === locale) return; // Ne rien faire si la langue sélectionnée est déjà active
//     const currentPath = pathname;
//     // const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
//     // router.push(newPath);
//     const segments = currentPath.split('/');
//     segments[1] = newLocale; // Remplace le segment de locale dans le chemin
//     const newPath = segments.join('/');
//     // Utilise replace au lieu de push et ajoute un paramètre pour forcer le rechargement
//     router.push(newPath + '?lang_changed=1');
//   };

//   return (
//     <DropdownMenu
//       items={languages}
//       initialSelection={locale}
//       onSelectionChange={handleLanguageChange}
//       ariaLabel="Language selection"
//     />
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import DropdownChoice from './ui/dropdown-menu';
import { FrIcon, EnIcon, EsIcon } from '@/components/icons';
import { locales } from '../config/config';

const languages = [
  { key: 'fr', label: 'Français', icon: <FrIcon /> },
  { key: 'en', label: 'English', icon: <EnIcon /> },
  { key: 'es', label: 'Español', icon: <EsIcon /> },
];

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const initialLocale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    // Mettre à jour currentLocale lorsque le pathname change
    const localeFromPath = pathname.split('/')[1];
    if (languages.some(lang => lang.key === localeFromPath)) {
      setCurrentLocale(localeFromPath);
    }
  }, [pathname]);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath + '?lang_changed=1');
    setCurrentLocale(newLocale);
  };

  return (
    <DropdownChoice
      // items={languages}
      items={languages.filter(lang => locales.includes(lang.key as any))}
      selectedKey={currentLocale}
      onSelectionChange={handleLanguageChange}
      ariaLabel="Language selection"
    />
  );
}