import { Siren, LifeBuoy, Flame, HeartPulse, UtilityPole, Droplet} from 'lucide-react';

export interface DataFile {
    title?: string;
    number?: string;
    title1?: string;
    description?: string;
    logo?: React.ComponentType;
}


export const DataNum: DataFile[] = [
    {title: 'Police', number: '09123453', logo: Siren},
    {title: 'Rescue', number: '034234', logo: LifeBuoy},
    {title: 'Fire', number: '09234324', logo: Flame},
    {title: 'Medical', number: '09324234', logo: HeartPulse},
    {title: 'Power', number: '0423423', logo: UtilityPole},
    {title: 'Water', number: '0123423423', logo: Droplet},
];

export const AboutUs: DataFile[] = [
    {title1: 'Our Vision', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'},
    {title1: 'Our Mission', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'},
];