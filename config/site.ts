export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Hotel Karibu',
  description: 'Piece of Heaven',
  navItems: [
    // {
    //   label: 'Home',
    //   href: '/',
    // },
    {
      label: 'Customer-Service',
      href: '/customer-service',
    },
    // {
    //   label: 'Pricing',
    //   href: '/pricing',
    // },
    {
      label: 'Connexion',
      href: '/connexion',
    },
    // {
    //   label: 'About',
    //   href: '/about',
    // },
  ],
  // navMenuItems: [
  //   {
  //     label: 'Profile',
  //     href: '/profile',
  //   },
  //   {
  //     label: 'Dashboard',
  //     href: '/dashboard',
  //   },
  //   // {
  //   //   label: 'Hotels',
  //   //   href: '/hotel',
  //   // },
  //   // {
  //   //   label: 'Calendar',
  //   //   href: '/calendar',
  //   // },
  //   {
  //     label: 'Help & Feedback',
  //     href: '/help-feedback',
  //   },
  //   {
  //     label: 'Logout',
  //     href: '/logout',
  //   },
  // ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    creator: 'https://benjaminmayeur.be',
  },
};
