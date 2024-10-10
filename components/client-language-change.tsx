// // 'use client';

// import { useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';

// export default function ClientLanguageChange() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     if (searchParams.get('lang_changed') === '1') {
//       // Recharge la page sans le paramètre de requête
//     //   router.replace(window.location.pathname);
//     router.refresh();
//     }
//   }, [searchParams, router]);

//   return null; // Ce composant ne rend rien visuellement
// }