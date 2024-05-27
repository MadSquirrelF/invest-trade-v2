import SchternLogo from '@/shared/assets/images/Schtern.svg';
import MacoLogo from '@/shared/assets/images/MACO.svg';
import RingerLogo from '@/shared/assets/images/RINGER.svg';
import KomplectIcon from '@/shared/assets/icons/komplect-icon.svg';
import PvhProfileIcon from '@/shared/assets/icons/pvc-profile-icon.svg';
import OborudovanIcon from '@/shared/assets/icons/oborudovan-icon.svg';
import FurnituraIcon from '@/shared/assets/icons/furnitura-icon.svg';

export interface ITabs {
  value: string;
  icon: React.VFC<React.SVGProps<SVGAElement>> | string;
}

export interface IAdds {
  title: string;
  description: string;
  price: number;
  poster: string;
}

export interface Settings {
  name: string;
  value: string;
}

export enum BrandType {
  SCHTERN = 'SCHTERN',
  MACO = 'MACO',
  RINGER = 'RINGER'
}

export enum CategoryType {
  OBORUDOVANIE = 'OBORUDOVANIE',
  KOMPLEKT = 'KOMPLEKT',
  FURNITURA = 'FURNITURA',
  PROFILEPVC = 'PROFILEPVC'
}

export const BrandList: ITabs[] = [
    {
        value: BrandType.SCHTERN,
        icon: SchternLogo,
    },
    {
        value: BrandType.MACO,
        icon: MacoLogo,
    },
    {
        value: BrandType.RINGER,
        icon: RingerLogo,
    },
];

export const CategoryList: ITabs[] = [
    {
        value: CategoryType.PROFILEPVC,
        icon: PvhProfileIcon,
    },
    {
        value: CategoryType.FURNITURA,
        icon: FurnituraIcon,
    },
    {
        value: CategoryType.OBORUDOVANIE,
        icon: OborudovanIcon,
    },
    {
        value: CategoryType.KOMPLEKT,
        icon: KomplectIcon,
    },
];

export interface Product {
  _id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  brand: BrandType;
  adds: IAdds[]
  details: Settings[];
  category: CategoryType;
  is_avaible: boolean;
  view_count: number;
  rating: number;
  poster: string;
  createdAt: string;
  thermalInsulation?: number;
  soundInsulation?: number;
  lightTransmission?: number;
}
