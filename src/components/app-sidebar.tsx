import * as React from 'react';
import {
  Home,
  BadgeInfo,
  HousePlug,
  BadgePlus,
  Warehouse,
  Droplets,
  HeartPulse,
  Waves,
  Trash2,
  Flame,
  CloudSun,
  Car,
  Droplet,
  BriefcaseMedical,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LogoBrg from '@/assets/brgylogotrns1.png';

const data = {
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'About Us',
      url: '/about',
      icon: BadgeInfo,
    },
    {
      title: 'Registration',
      url: '/register',
      icon: BadgePlus,
      badge: '10',
    },
  ],
  navSecondary: [
    {
      title: 'Shelter',
      url: '/shelter',
      icon: Warehouse,
    },
    {
      title: 'Flood',
      url: '/flood',
      icon: Droplets,
    },
    {
      title: 'Pharmacy',
      url: '/pharmacy',
      icon: HeartPulse,
    },
    {
      title: 'Tsunami',
      url: '/tsunami',
      icon: Waves,
    },
    {
      title: 'Garbage',
      url: '/garbage',
      icon: Trash2,
    },
    {
      title: 'Fire Alert',
      url: '/fire',
      icon: Flame,
    },
    {
      title: 'Weather',
      url: '/weather',
      icon: CloudSun,
    },
    {
      title: 'Traffic',
      url: '/traffic',
      icon: Car,
    },
    {
      title: 'Utilities',
      url: '/utilities',
      icon: HousePlug,
    },
    {
      title: 'First Aid',
      url: '/first-aid',
      icon: BriefcaseMedical,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 " {...props}>
      <Avatar className="mb-4 w-30 h-30 mx-auto">
        <AvatarImage src={LogoBrg} />
        <AvatarFallback>InfoCenter</AvatarFallback>
      </Avatar>
      <Separator className="bg-white w-full" />

      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <Separator className="bg-white w-full  " />
      <SidebarContent>
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
