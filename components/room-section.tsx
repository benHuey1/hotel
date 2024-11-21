'use client';

import { Room, Option, HotelWithRelations } from '@/types';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { ArrowBackIcon, EnIcon, LuggageIcon, ParkingIcon, PersonIcon, PlaneLandingIcon, PlaneTakeoffIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthModal from './auth-modal';

interface RoomSectionProps {
  hotel: HotelWithRelations;
  room: Room | null;
  backUrl: string;
  translationsRoom: any;
}

export default function RoomSection({ hotel, room, backUrl, translationsRoom }: RoomSectionProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleBookingClick = () => {
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    } else {
      // Rediriger vers la page de réservation
      // router.push(`/booking/${room.id}`);
      alert("Ok, you'll be redirected");
    }
  };
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    // Rediriger vers la page de réservation
    // router.push(`/booking/${room.id}`);
      alert("Ok, you'll be redirected")
  };

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  if (!room) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8">
        <p className="text-lg text-gray-600 mb-4">
          La chambre n'a pas été trouvée
        </p>
        <Link href={backUrl}>
          <Button
            className="bg-tertiary text-white hover:bg-gray-500"
            startContent={<ArrowBackIcon fillColor="white" />}
          >
            {translationsRoom.back}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main
      className="w-full h-full p-5 space-y-6"
    >    
        {/* <h1 className="text-2xl font-bold">Détails de la chambre</h1> */}
        {/* <div className="space-y-4">
          <p className="text-lg">Type: <span className="font-medium">{room.type}</span></p>
          <p className="text-lg">Capacité: <span className="font-medium">{room.capacity} personnes</span></p>
          <p className="text-lg">Prix: <span className="font-medium">{room.cost}€</span></p>
        </div> */}
        {/* <div className=""> */}
            {/* <h2 className="text-xl font-semibold"><span className='text-secondary font-bold'>{translationsRoom.title}</span> - {hotel.capital || 'Not Available'} ({hotel.country || 'Not Available'})</h2> */}
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }} 
                className='flex justify-between mx-10'
            >
                <div className='flex flex-col text-secondary'>
                    <h1 className='flex gap-4'><p>{room.type}</p>-<p>{room.capacity}</p><PersonIcon /></h1>
                    <p className='text-sm underline underline-offset-4 decoration decoration-2 decoration-secondary'>{hotel.country}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <Image 
                        src='/icon/heart-empty.png' 
                        alt='unlike'
                        // fill
                        // className="object-cover transition-transform duration-500 ease-out group-hover:scale-2"
                        width={30}
                        height={30}
                        // sizes="(max-width: 50px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* <Link href=''> */}
                        <Button
                            onClick={handleBookingClick}
                            className="bg-primary text-white hover:bg-gray-500 transition-colors"
                        >
                            {translationsRoom.booking}
                        </Button>
                    {/* </Link> */}
                </div>
            </motion.div>
          {room.options && room.options.length > 0 ? (
            <>
            <div className='flex flex-col gap-20'>
                <motion.div
                    initial={{ opacity: 0, zoom: 0.8 }}
                    animate={{ opacity: 1, zoom: 1 }}
                    transition={{ duration: 0.5 }} 
                    className="container mx-auto p-4"
                >
                    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[400px]">
                        {room.pictures.slice(0, 5).map((picture, index) => (
                            <div
                            key={index}
                            className={clsx(
                                'relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group',
                                {
                                'col-start-1 row-start-1': index === 0,
                                'col-start-1 row-start-2': index === 1,
                                'col-start-2 row-span-2': index === 2,
                                'col-start-3 row-start-1': index === 3,
                                'col-start-3 row-start-2': index === 4,
                                }
                            )}
                            >
                            <div className="absolute inset-0 overflow-hidden">
                                <Image 
                                src={picture} 
                                alt={`Room image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index === 0}
                                />
                            </div>
                            {/* Overlay optionnel au survol */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                </motion.div>
                <hr className='w-2/3 m-auto border-medium border-[#0000006b] rounded-xl'/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10">
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }} 
                    >
                        <ul className='space-y-4'>
                            <li className=''>
                                <p className='flex gap-4'><span className='font-bold'>Arrivée</span><PlaneLandingIcon/></p>
                                <p>L’Hôtel Karibu vous accueille <span className='font-bold'>dès 15h</span></p>
                            </li>
                            <li className=''>
                                <p className='flex gap-4'><span className='font-bold'>Départ</span><PlaneTakeoffIcon/></p>
                                <p>Vous pouvez profiter de votre réservation <span className='font-bold'>jusqu’à 11h</span></p>
                            </li>
                            <li className=''>
                                <p className='flex gap-4'><span className='font-bold'>Parking</span><ParkingIcon /></p>
                                <p>Un parking Gratuit est mis à disposition à l’entrée de l’Hôtel Karibu</p>
                            </li>
                            <li className=''>
                                <p className='flex gap-4'><span className='font-bold'>Valises</span><LuggageIcon /></p>
                                <p>Un service de gardiennage pour vos valises est à disposition avant 
                                et après votre réservation</p>
                            </li>
                        </ul>
                    </motion.div>
                    <hr className='block md:hidden w-1/3 m-auto my-5 border-medium border-[#0000006b] rounded-xl'/>
                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }} 
                        className='flex flex-col justify-center gap-4'
                    >
                        <p>
                            L’hôtel dispose d’une <span className='font-bold'>piscine</span> où vous pourrez vous prélasser
                            tout en profitant de la vue imprenable sur la mer. 
                            Un <span className='font-bold'>bar</span> est à votre disposition avec des cocktails pour tous les goûts.
                            Des <span className='font-bold'>serviettes</span> sont disponibles sur demande.
                        </p>
                        <p>Le <span className='font-bold'>déjeuner</span> sera servi en buffet chaque matin dans le bâtiment principal.</p>
                        <p>
                            Chaque chambre est munie au minimum des équipements nécessaires à votre bien-être. 
                            Un <span className='font-bold'>bureau</span> avec un minimum de fournitures ainsi que des tables de chevêts pour déposer vos affaires personnelles. 
                            La <span className='font-bold'>salle de bain</span> est équipée de serviettes de bain, d’essuis, d’un shampoing, d’un bain mousse et d’un sèche cheveux.
                        </p>
                    </motion.div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                  <p>{translationsRoom.its_time}</p>
                  {/* <Link href=''> */}
                    <Button
                      onClick={handleBookingClick}
                      className="bg-primary text-white hover:bg-gray-500 transition-colors"
                    >
                      {translationsRoom.booking}
                    </Button>
                  {/* </Link> */}
                  <p>!</p>
                </div>
                <hr className='w-2/3 m-auto border-medium border-[#0000006b] rounded-xl'/>
            </div>
            </>
          ) : (
            <p className="text-gray-500 italic">Pas d'options disponibles</p>
          )}
          <div className='flex justify-center items-center'>
            <Link href={backUrl}>
              <Button
                className="mt-8 bg-tertiary text-white hover:bg-gray-500 transition-colors"
                startContent={<ArrowBackIcon fillColor="white" />}
              >
                {translationsRoom.back}
              </Button>
            </Link>
          </div>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
          />
      {/* </div> */}
    </main>
  );
}