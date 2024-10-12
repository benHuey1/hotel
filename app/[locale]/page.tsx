import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
// import Hotels, {Hotel} from '@/api/hotels';
// import prisma from '@/lib/prisma';
import Image from 'next/image';
import SearchBooking from '@/components/search-booking';
// import { PrismaClient } from '@prisma/client';
import HotelsList from '@/components/hotels-list';
import { Hotel } from '@/types';
import { prisma } from '@/lib/prisma';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// const prisma = new PrismaClient();

async function getHotels(): Promise<Hotel[]> {
  const hotels = await prisma.hotels.findMany({
    include: {
      Rooms: {
        include: {
          options: true,
        },
      },
    },
  });
  return hotels;
}

export default async function Home() {
  const t = await getTranslations('HomePage');
  // const hotels: Hotel[] = await prisma.hotels.findMany({
  //   include: {
  //     Rooms: true,
  //   },
  // })
  // const countries: Hotel[] = await prisma.hotels.findMany();
  const countries: Hotel[] = await getHotels();
  const hotels = await getHotels();
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-8">
      <div
        className="flex h-[50vh] w-full items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618582240632-1937f4c91d7d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {/* <div className="flex items-center h-[80%] px-10 py-5"> */}
        <div className="flex w-full items-center justify-center px-4 sm:px-10">
          <SearchBooking countries={countries} layout='horizontal' roomWidth='40%'  familyWidth='60%' countryWidth='80%' dateWidth='100%'/>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-16 py-10 md:gap-0">
        <div className="flex h-full w-full flex-col items-center gap-16 md:h-[20vh] lg:h-[40vh] md:flex-row md:items-start md:gap-0">
          <div className="flex h-full w-full md:w-[50%] flex-col items-center justify-center gap-2 md:px-5 lg:px-0">
            <h3 className="text-center text-lg font-bold">
              {t('intro_0_title')}
              {/* Présent dans plus de 10 capitales dans le monde */}
            </h3>
            {/* <p>{t('title')}</p> */}
            <div className="flex gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <Image key={i} priority src="/icon/star.png" height={40} width={40} alt="a star" />
              ))}
            </div>
          </div>
          <div className="flex h-full w-full md:w-[50%] flex-col items-center justify-center gap-8">
            <h3 className="text-lg font-bold">{t('intro_1_title')}</h3>
            <div className="flex justify-center gap-10 text-center">
              <div className="flex flex-col items-center gap-5">
                <p>{t('intro_1_text_text1')}</p>
                <Image
                  priority
                  src="/icon/vision.png"
                  height={40}
                  width={40}
                  alt="a pair of binocluars"
                />
              </div>
              <div className="flex flex-col items-center gap-5">
                <p>{t('intro_1_text_text2')}</p>
                <Image priority src="/icon/dollar.png" height={40} width={40} alt="a dollar icon" />
              </div>
              <div className="flex flex-col items-center gap-5">
                <p>{t('intro_1_text_text3')}</p>
                <Image
                  priority
                  src="/icon/sleeping-yellow.png"
                  height={55}
                  width={55}
                  alt="a bed"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[10vh] w-full flex-col items-center justify-center gap-4 md:flex-row">
          <h3 className="text-center text-lg font-bold">{t('intro_2_title')}</h3>
          <Image priority src="/icon/luggage-yellow.png" height={40} width={50} alt="a suitcase" />
        </div>
      </div>
      <div className="flex w-full flex-col items-start p-8">
        <p className="text-lg">{t('intro_1_text_text1')}</p>
        <p>
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable Notre vision sera incroyable
          Notre vision sera incroyable Notre vision sera incroyable
        </p>
      </div>
      <div className="flex w-full flex-col items-start p-8">
        <p className="text-lg">{t('intro_1_text_text2')}</p>
        <div className="flex w-full justify-center">
          <HotelsList hotels={hotels} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start p-8">
        <p className="text-lg">{t('intro_1_text_text3')}</p>
      </div>
    </main>
  );
}
