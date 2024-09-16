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

export interface DropdownChoiceProps {
  items: DropdownItem[];
}

export interface PopoverCountriesProps {
  // Define the expected props here
  classNameTrigger?: string;
  countries: Hotel[];
  //  setCountry: React.Dispatch<React.SetStateAction<Hotel[]>>;
  selectedCountry: Hotel | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Hotel | null>>;
  // Other props...
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