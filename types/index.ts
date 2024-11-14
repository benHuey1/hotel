import { Prisma } from '@prisma/client';
import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
};

// Components

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

// export interface DropdownChoiceProps {
//   items: DropdownItem[];
// }

export interface DropdownChoiceProps {
  items: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
  }>;
  selectedKey: string;
  onSelectionChange: (key: string) => void;
  ariaLabel: string;
}

export interface NavbarProps {
  translations: {
    customerService: string;
    connexion: string;
  };
}

export interface PopoverCountriesProps {
  // Define the expected props here
  classNameTrigger?: string;
  countries: HotelWithRelations[];
  //  setCountry: React.Dispatch<React.SetStateAction<Hotel[]>>;
  selectedCountry: HotelWithRelations | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<HotelWithRelations | null>>;
  whichHotel: string;
  // Other props...
}

export interface SearchBookingProps {
  countries: HotelWithRelations[];
  roomWidth: string;
  familyWidth: string;
  countryWidth: string;
  dateWidth: string;
  layout?: 'horizontal' | 'vertical';
  initialValues?: {
    rooms?: number;
    adults?: number;
    children?: number;
    startDate?: Date;
    endDate?: Date;
    selectedCountryId?: string;
  };
  roomText: string;
  roomPopup: string;
  personAdult: string;
  personChild: string;
  personPopup: string;
  whichHotel: string;
}

export interface ExpandableTranslation {
  room: string;
  room_popup: string;
  person_adult: string;
  person_child: string;
  person_popup: string;
  which_hotel: string;
  text: string;
  textClose: string;
}

export interface ExpandableSearchSectionProps {
  hotel: HotelWithRelations;
  countries: HotelWithRelations[];
  initialValues: any;
  translationExpandable: ExpandableTranslation;
  Rooms: Room[];
  onFilteredRooms: (rooms: Room[]) => void;
}

export interface RoomProps {
  initialValues?: {
    rooms?: number;
    adults?: number;
    children?: number;
    startDate?: Date;
    endDate?: Date;
    selectedCountryId?: string;
  };
}

export interface HotelProps {
  initialValues?: {
    rooms?: number;
    adults?: number;
    children?: number;
    startDate?: Date;
    endDate?: Date;
    selectedCountryId?: string;
  };
}
// export type SelectKeys = Set<string>

// Types Hotel
export interface Hotel {
  id: string;
  country: string;
  capital: string;
  picture: string;
  localisation: string;
  Rooms?: Room[];
}

export interface Room {
  id: string;
  hotelId: string;
  capacity: number;
  cost: number;
  pictures: string[];
  type: string;
  options: Option[];
}
export interface RoomTypes {
  id:          string;
  name:       string;
  description: string;
  capacity:    number;
  basePrice:   number;
  Rooms:       Room[];
}

export interface Option {
  id: string;
  name: string;
  roomsId: string;
}

export type HotelWithRelations = Prisma.HotelsGetPayload<{
  include: {
    Rooms: {
      include: {
        options: true
      }
    }
  }
}>;

// Type Animation button
export interface AnimatedButtonArrowProps {
  children: React.ReactNode;
  href: string;
  bgColor: string;
  textColor: string;
  //   color?: 'primary' | 'secondary' | 'tertiary';
}

export interface MapMarker {
  id: string;
  longitude: number;
  latitude: number;
  title: string;
  description: string;
}

export interface MapBoxProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  title?: string;
  style?: string;
  className?: string;
}