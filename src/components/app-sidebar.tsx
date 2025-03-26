import * as React from 'react';
import {
  Home,
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
      title: 'SMS Alert Registration',
      url: '/register',
      icon: BadgePlus,
      badge: '10',
    },
  ],
  navSecondary: [
    {
      title: 'Fire Alert',
      url: '/fire',
      icon: Flame,
    },
    {
      title: 'First Aid',
      url: '/first-aid',
      icon: BriefcaseMedical,
    },
    {
      title: 'Flood',
      url: '/flood',
      icon: Droplets,
    },
    {
      title: 'Garbage',
      url: '/garbage',
      icon: Trash2,
    },
    {
      title: 'Pharmacy',
      url: '/pharmacy',
      icon: HeartPulse,
    },
    {
      title: 'Shelter',
      url: '/shelter',
      icon: Warehouse,
    },
    {
      title: 'Traffic',
      url: '/traffic',
      icon: Car,
    },
    {
      title: 'Tsunami',
      url: '/tsunami',
      icon: Waves,
    },
    {
      title: 'Utilities',
      url: '/utilities',
      icon: HousePlug,
    },
    {
      title: 'Weather',
      url: '/weather',
      icon: CloudSun,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 " {...props}>
      <Avatar className="w-30 h-30 mx-auto my-3">
        <AvatarImage src={LogoBrg} />
        <AvatarFallback>InfoCenter</AvatarFallback>
      </Avatar>
      <p className="font-bold text-white text-center  mb-2">INFOCENTER</p>
      <Separator className="bg-white w-full" />

      <SidebarHeader className="text-white">
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <Separator className="bg-white w-full my-1" />

      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="text-white" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
