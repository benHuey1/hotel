'use client';
import React, { useState } from 'react';
// import SelectCountry from "./ui/select-city";
import DateRangePickerBooking from './ui/date-range-picker-booking';
// import Countries, { Hotel } from '@/api/countries';
// import prisma from '@/lib/prisma';
import PopoverFamily from './ui/popover-family';
import PopoverRoom from './ui/popover-room';
import { Button } from '@nextui-org/button';
import { MagnifierIcon } from './icons';
import { Image } from '@nextui-org/react';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import CountriesList from './countries-list';
import { Hotel, HotelWithRelations, SearchBookingProps } from '@/types';
import { useLocale } from 'next-intl';

const SearchBooking: React.FC<SearchBookingProps> = ({
  countries, 
  roomWidth, 
  familyWidth, 
  countryWidth, 
  dateWidth,
  layout,
  initialValues,
  roomText,
  roomPopup,
  personAdult,
  personChild,
  personPopup,
  whichHotel
}) => {
  const [room, setRoom] = useState(initialValues?.rooms || 0);
  const [family, setFamily] = useState({ adults: initialValues?.adults || 0, children: initialValues?.children || 0 });
  const [selectedCountry, setSelectedCountry] = useState<HotelWithRelations | null>( 
    initialValues?.selectedCountryId 
    ? countries.find(c => c.id === initialValues.selectedCountryId) || null 
    : null
  );
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: initialValues?.startDate || null,
    endDate: initialValues?.endDate || null,
  });
  const router = useRouter();
    const locale = useLocale();
  const submitDatas = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (selectedCountry) {
    //   router.push({
    //     pathname: '/hotel/[id]',
    //     query: { id: selectedCountry.id }
    //   });
    // } else {
    //   alert('Please select a country/hotel first.');
    // }
    if (selectedCountry) {
      console.log('Selected hotel ID:', selectedCountry.id);
      router.push(`/${locale}/hotels/${selectedCountry.id}?rooms=${room}&adults=${family.adults}&children=${family.children}&start=${dateRange.startDate?.toLocaleDateString().split('T')[0]}&end=${dateRange.endDate?.toLocaleDateString().split('T')[0]}`);
    } else {
      alert('Please select a country/hotel first.');
    }
    // event.preventDefault();
    // console.log(event);

    // alert(`
    //       Chambres :  ${event.target[1].textContent}?
    //       personnes : ${event.target[2].textContent}
    //       hotel : ${event.target[5].textContent}
    //       dates : ${event.target[8].textContent}
    // `);

    alert(`
      Chambres :  ${room}
      personnes : Adultes: ${family.adults}, Enfants: ${family.children}
      hotel : ${selectedCountry ? `ID: ${selectedCountry.id}, Pays: ${selectedCountry.country}, Capitale: ${selectedCountry.capital}` : ''}
      dates : ${dateRange.startDate?.toLocaleDateString() || ''} - ${dateRange.endDate?.toLocaleDateString() || ''}
    `);
  };
  return (
    <>
      {/* <form className="flex w-[450px] h-60" onSubmit={submitDatas}> */}
      {/* <form
        className="flex h-auto w-full max-w-[450px] flex-col-reverse sm:h-60 sm:flex-row"
        onSubmit={submitDatas}
      > */}
      <form
        className={`flex w-full max-w-[450px] ${
        layout === 'horizontal' 
          ? 'h-auto flex-col-reverse sm:h-60 sm:flex-row' 
          : 'flex-col-reverse lg:h-60'
        }`}
        onSubmit={submitDatas}
      >
        <div className={`flex w-3/4 ${
          layout === 'horizontal' 
            ? 'sm:h-4/6 sm:w-1/4 sm:justify-end'
            :  'h-full w-full justify-center'
        }`}>
          <Button
            type="submit"
            isIconOnly
            className={`h-full w-full rounded-xl border-4 border-[#F9A72B] bg-[#FF5757] ${
            layout === 'horizontal' 
            ? 'sm:rounded-r-none'
            :  'h-20'
            }`}
          >
            <Image src="/icon/magnifier.png" width={40} height={40} />
          </Button>
        </div>
        <div className={`flex h-full flex-col ${
          layout === 'horizontal' 
            ? 'sm:w-3/4 sm:items-start'
            :  'w-full items-center'
        }`}>
          <PopoverRoom
            room={room}
            setRoom={setRoom}
            classNameTrigger={`flex justify-start bg-white border-[#F9A72B] border-4 border-b-2 sm:border-t-4 sm:border-r-4 sm:border-l-2 sm:border-b-2
              ${   
                layout === 'horizontal' 
              ? `w-3/4 sm:w-[${roomWidth}] h-16 sm:h-1/6 sm:rounded-l-none`
              :  'w-full'
              }
            `}
            roomText={roomText}
            roomPopup={roomPopup}
          />
          <PopoverFamily
            family={family}
            setFamily={setFamily}
            classNameTrigger={`flex justify-start bg-white border-[#F9A72B] border-4 border-y-2 sm:border-4 sm:border-l-2 sm:border-t-2 sm:border-b-2
              ${   
                layout === 'horizontal' 
              ? `w-3/4 sm:w-[${familyWidth}] h-16 sm:h-1/6 sm:rounded-l-none`
              :  'w-full'
              }
            `}
            personAdult={personAdult}
            personChild={personChild}
            personPopup={personPopup}
          />
          <CountriesList
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            classNameTrigger={`flex justify-start bg-white border-[#F9A72B] border-4 border-y-2 sm:border-r-4 sm:border-l-2 sm:border-t-2 sm:border-b-2
              ${   
                layout === 'horizontal' 
              ? `w-3/4 sm:w-[${countryWidth}] h-16 sm:h-1/6 sm:rounded-l-none`
              :  'w-full'
              }
            `}
            whichHotel={whichHotel}
          />
          <DateRangePickerBooking
            dateRange={dateRange}
            setDateRange={setDateRange}
            classNameTrigger={`flex flex-row justify-start bg-white border-[#F9A72B] border-4 border-y-2 sm:border-r-4 sm:border-l-2 sm:border-t-2 sm:border-b-4
              ${   
                layout === 'horizontal' 
              ? `w-3/4 sm:w-[${dateWidth}] h-16 sm:h-2/6 sm:rounded-l-none`
              :  'w-full'
              }
            `}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBooking;
