// 'use client'
// import React, { useEffect, useState } from "react";
// import {Select, SelectItem, SelectSection} from "@nextui-org/react";
// import { Hotels } from "@prisma/client";

// interface SelectProps {
//     hotels: Hotels[];
//   }

// export default function SelectCity(
//   { hotels }: SelectProps
//   ) {
//         // Enable to display hotel grouping them by localisation
//         const groupHotelsByLocalization = (hotels: any[]) => {
//           return hotels.reduce((acc, hotel) => {
//             if (!acc[hotel.localisation]) {
//               acc[hotel.localisation] = [];
//             }
//             acc[hotel.localisation].push(hotel);
//             return acc;
//           }, {});
//         };
//         // The following lines resolve the "Hydration failed because the initial UI does not match what was rendered on the server."
//         const [isMounted, setIsMounted] = useState(false);

//         // This is a side effect that runs after the first render and sets the isMounted state to true
//         useEffect(() => {
//             setIsMounted(true);
//         }, []);

//         // This is a conditional rendering that returns null if the component is not mounted yet
//         if (!isMounted) {
//             return null;
//         }

//   return (
//     <Select
//     // label="Select Hôtel"
//     aria-label="Select Hôtel"
//     placeholder="Quel hôtel ?"
//     className="min-w-52"
//     listboxProps={{
//       itemClasses: {
//         base: [
//           // "rounded-md",
//           "text-default-500",
//           "dark:text-white",
//           // "transition-opacity",
//           "data-[hover=true]:text-white",
//           "data-[hover=true]:bg-[#FF5757]",
//           "dark:data-[hover=true]:bg-[#FF5757]",
//           "data-[selectable=true]:focus:bg-[#FF5757]",
//           "data-[focus-visible=true]:ring-[#FF5757]",
//         ],
//       },
//     }}
//     >
//       {Object.entries(groupHotelsByLocalization(hotels)).map(([localization, hotels]) => (
//                             <SelectSection key={localization} showDivider title={localization}>
//                             {hotels.map((hotel) => (
//                                 <SelectItem key={hotel.country} value={hotel.country}>{hotel.country}</SelectItem>
//                             ))}
//                             </SelectSection>
//                         ))}
//       {/* <SelectSection showDivider title="Afrique">
//         <SelectItem key="Sénégal" textValue="Sénégal">
//           <div className="flex gap-2 items-center">
//               <div className="flex flex-col">
//                 <span className="text-small">Sénégal</span>
//                 <span className="text-tiny opacity-80">Dakar</span>
//               </div>
//             </div>
//         </SelectItem>
//         <SelectItem key="Tanzanie" textValue="Tanzanie">
//           <div className="flex gap-2 items-center">
//               <div className="flex flex-col">
//                 <span className="text-small">Tanzanie</span>
//                 <span className="text-tiny opacity-80">Dar-Es-Salaam</span>
//               </div>
//             </div>
//           </SelectItem>
//       </SelectSection>
//       <SelectSection title="Europe">
//         <SelectItem key="France" textValue="France">
//           <div className="flex gap-2 items-center">
//               <div className="flex flex-col">
//                 <span className="text-small">France</span>
//                 <span className="text-tiny opacity-80">Paris</span>
//               </div>
//             </div>
//           </SelectItem>
//         <SelectItem key="Angleterre" textValue="Angleterre">
//           <div className="flex gap-2 items-center">
//               <div className="flex flex-col">
//                 <span className="text-small">Angleterre</span>
//                 <span className="text-tiny opacity-80">Londres</span>
//               </div>
//             </div>
//           </SelectItem>
//       </SelectSection> */}
//     </Select>
//   );
// }

// ------------------------------------------------------------------------------------------------------------------------------------------------------

// import { Select, SelectItem } from '@nextui-org/select';

// // export default function SelectCountry() {
// //   return(
// //     <Select
// //         aria-label="Selection de l'hôtel"
// //         placeholder="Quel hôtel ?"
// //         className="min-w-52"
// //         listboxProps={{
// //           itemClasses: {
// //             base: [
// //               "text-default-500",
// //               "dark:text-white",
// //               "data-[hover=true]:text-white",
// //               "data-[hover=true]:bg-[#FF5757]",
// //               "dark:data-[hover=true]:bg-[#FF5757]",
// //               "data-[selectable=true]:focus:bg-[#FF5757]",
// //               "data-[focus-visible=true]:ring-[#FF5757]",
// //             ],
// //           },
// //         }}
// //     >

// //       <SelectItem key="pays.key"textValue="France">
// //         <div className="flex gap-2 items-center">
// //           <div className="flex flex-col">
// //             <span className="text-small">France</span>
// //             <span className="text-tiny opacity-80">Paris</span>
// //           </div>
// //         </div>
// //       </SelectItem>
// //     </Select>
// //   )
// // }

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const SelectCountry = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     axios
//       .get('/api/countries.tsx')
//       .then((response) => {
//         console.log('REPONSE AXIOS', response);
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching countries:', error);
//       });
//   }, []);

//   return (
//     <Select
//       aria-label="Selection de l'hôtel"
//       placeholder="Quel hôtel ?"
//       className="min-w-52"
//       listboxProps={{
//         itemClasses: {
//           base: [
//             'text-default-500',
//             'dark:text-white',
//             'data-[hover=true]:text-white',
//             'data-[hover=true]:bg-[#FF5757]',
//             'dark:data-[hover=true]:bg-[#FF5757]',
//             'data-[selectable=true]:focus:bg-[#FF5757]',
//             'data-[focus-visible=true]:ring-[#FF5757]',
//           ],
//         },
//       }}
//     >
//       {countries.map((country) => (
//         <SelectItem key={country.id} value={country.country}>
//           {country.country}
//         </SelectItem>
//       ))}
//     </Select>
//   );
// };

// export default SelectCountry;
