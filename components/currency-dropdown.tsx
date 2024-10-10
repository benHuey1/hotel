// 'use client';

// import React from 'react';
// import DropdownMenu from './ui/dropdown-menu';
// import { EurIcon, GbpIcon, UsdIcon } from '@/components/icons';

// const currencies = [
//   { key: 'EUR', label: 'EUR', icon: <EurIcon /> },
//   { key: 'GBP', label: 'GBP', icon: <GbpIcon /> },
//   { key: 'USD', label: 'USD', icon: <UsdIcon /> },
// ];

// export default function CurrencyDropdown() {
//   const handleCurrencyChange = (newCurrency: string) => {
//     // Implémentez ici la logique pour changer la devise
//     console.log(`Currency changed to ${newCurrency}`);
//   };

//   return (
//     <DropdownMenu
//       items={currencies}
//       initialSelection="EUR"
//       onSelectionChange={handleCurrencyChange}
//       ariaLabel="Currency selection"
//     />
//   );
// }
'use client';

import React, { useState } from 'react';
import DropdownChoice from './ui/dropdown-menu';
import { EurIcon, GbpIcon, UsdIcon } from '@/components/icons';

const currencies = [
  { key: 'EUR', label: 'EUR', icon: <EurIcon /> },
  { key: 'GBP', label: 'GBP', icon: <GbpIcon /> },
  { key: 'USD', label: 'USD', icon: <UsdIcon /> },
];

export default function CurrencyDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    // Ajoutez ici la logique pour gérer le changement de devise
    console.log(`Currency changed to ${newCurrency}`);
  };

  return (
    <DropdownChoice
      items={currencies}
      selectedKey={selectedCurrency}
      onSelectionChange={handleCurrencyChange}
      ariaLabel="Currency selection"
    />
  );
}