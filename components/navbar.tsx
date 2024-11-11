'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  EnIcon,
  EsIcon,
  EurIcon,
  FrIcon,
  GbpIcon,
  // TwitterIcon,
  // GithubIcon,
  // DiscordIcon,
  // HeartFilledIcon,
  // SearchIcon,
  Logo,
  UsdIcon,
} from '@/components/icons';
import DropdownChoice from '@/components/ui/dropdown-menu';
import React, { useEffect, useState } from 'react';
import LanguageDropdown from './language-dropdown';
import CurrencyDropdown from './currency-dropdown';
import { useClientTranslations } from '@/lib/useClientTranslations';
import { NavbarProps } from '@/types';

export const Navbar: React.FC<NavbarProps> = (
  translations
) => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: 'bg-default-100',
  //       input: 'text-sm',
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={['command']}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
  //     }
  //     type="search"
  //   />
  // );
  // const t = useClientTranslations('Navbar');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const icons = {
  //   chevron: <ChevronDown fill="currentColor" size={16} />,
  // };

  // Ferme le menu lors du chargement de la page
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Ferme le menu lorsque l'on clique sur un lien
  };

  return (
    <NextUINavbar
      maxWidth="full"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='shadow-lg'
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <div>
              <p className="hidden md:block text-2xl font-bold text-[#f9a72b]">Hotel Karibu</p>
              <p className="hidden md:block text-tiny uppercase text-[#ff5757]">piece of heaven</p>
            </div>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="ml-2 hidden justify-start gap-4 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:font-medium data-[active=true]:text-primary',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>
      <NavbarContent className="md:invisible" justify="end">
        <CurrencyDropdown/>
        <LanguageDropdown/>
        <ThemeSwitch />
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      {/* <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end"> */}
      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link aria-label="Customer-Service" href="/customer-service" className="text-inherit">
            {/* {t('customerService')} */}
            {translations.translations.customerService}
          </Link>
          <CurrencyDropdown/>
          <LanguageDropdown/>
          <Link aria-label="Connexion" href="/connexion" className="text-inherit">
            {translations.translations.connexion}
          </Link>
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="bg-default-100 text-sm font-normal text-default-600"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      {/* <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}

      <NavbarMenu className="top-16">
        <div className='flex justify-between items-start'>
          <div className="mx-4 flex flex-col gap-2 mt-2">
            {/* {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  key={index}
                  href={item.href}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            ))} */}
             <NavbarMenuItem key='Customer-service-1'>
                <NextLink
                  key='Customer-service'
                  href='/customer-service'
                  onClick={handleLinkClick}
                >
                  {translations.translations.customerService}
                </NextLink>
              </NavbarMenuItem>
             <NavbarMenuItem key='Connexion-2'>
                <NextLink
                  key='Connexion'
                  href='/connexion'
                  onClick={handleLinkClick}
                >
                  {translations.translations.connexion}
                </NextLink>
              </NavbarMenuItem>
          </div>
          {/* <div className='flex flex-col justify-end'>
            <CurrencyDropdown/>
            <LanguageDropdown/>
          </div> */}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
