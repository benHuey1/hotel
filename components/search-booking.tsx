'use client';
import React, { useState } from 'react';
// import SelectCountry from "./ui/select-city";
import DateRangePickerBooking from './ui/date-range-picker-booking';
// import Countries, { Hotel } from '@/api/countries';
import prisma from '@/lib/prisma';
import PopoverFamily from './ui/popover-family';
import PopoverRoom from './ui/popover-room';
import { Button } from '@nextui-org/button';
import { MagnifierIcon } from './icons';
import { Image } from '@nextui-org/react';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import CountriesList from './countries-list';
import { Hotel } from '@/types';

const SearchBooking = ({ countries }: { countries: Hotel[] }) => {
  const [room, setRoom] = useState(0);
  const [family, setFamily] = useState({ adults: 0, children: 0 });
  const [selectedCountry, setSelectedCountry] = useState<Hotel | null>(null);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const router = useRouter();
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
      router.push(`/hotels/${selectedCountry.id}?rooms=${room}&adults=${family.adults}&children=${family.children}&start=${dateRange.startDate?.toLocaleDateString().split('T')[0]}&end=${dateRange.endDate?.toLocaleDateString().split('T')[0]}`);
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
      <form
        className="flex h-auto w-full max-w-[450px] flex-col-reverse sm:h-60 sm:flex-row"
        onSubmit={submitDatas}
      >
        <div className="flex h-16 w-full justify-center sm:h-4/6 sm:w-1/4 sm:justify-end">
          <Button
            type="submit"
            isIconOnly
            className="h-full w-3/4 rounded-lg border-4 border-[#F9A72B] bg-[#FF5757] sm:rounded-r-none"
          >
            <Image src="icon/magnifier.png" width={40} height={40} />
          </Button>
        </div>
        <div className="flex h-full w-full flex-col items-center sm:w-3/4 sm:items-start">
          <PopoverRoom
            room={room}
            setRoom={setRoom}
            classNameTrigger="w-3/4 sm:w-[40%] h-16 sm:h-1/6 rounded-lg sm:rounded-l-none bg-white border-[#F9A72B] border-4 border-b-2 sm:border-t-4 sm:border-r-4 sm:border-l-2 sm:border-b-2"
          />
          <PopoverFamily
            family={family}
            setFamily={setFamily}
            classNameTrigger="w-3/4 sm:w-[60%] h-16 sm:h-1/6 rounded-lg sm:rounded-l-none bg-white border-[#F9A72B] border-4 border-y-2 sm:border-4 sm:border-l-2 sm:border-t-2 sm:border-b-2"
          />
          <CountriesList
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            classNameTrigger="w-3/4 sm:w-[80%] h-16 sm:h-1/6 rounded-lg sm:rounded-l-none bg-white border-[#F9A72B] border-4 border-y-2 sm:border-r-4 sm:border-l-2 sm:border-t-2 sm:border-b-2"
          />
          <DateRangePickerBooking
            dateRange={dateRange}
            setDateRange={setDateRange}
            classNameTrigger="w-3/4 sm:w-[100%] h-16 sm:h-2/6 rounded-lg sm:rounded-l-none bg-white border-[#F9A72B] border-4 border-y-2 sm:border-r-4 sm:border-l-2 sm:border-t-2 sm:border-b-4"
          />
        </div>
      </form>
    </>
  );
};

export default SearchBooking;
