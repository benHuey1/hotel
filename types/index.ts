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

export interface PopoverCountriesProps {
  // Define the expected props here
  classNameTrigger?: string;
  countries: Hotel[];
  //  setCountry: React.Dispatch<React.SetStateAction<Hotel[]>>;
  selectedCountry: Hotel | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Hotel | null>>;
  whichHotel: string;
  // Other props...
}

export interface SearchBookingProps {
  countries: Hotel[];
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
  rooms?: Room[];
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

// Type Animation button
export interface AnimatedButtonArrowProps {
  children: React.ReactNode;
  href: string;
  bgColor: string;
  textColor: string;
  //   color?: 'primary' | 'secondary' | 'tertiary';
}
