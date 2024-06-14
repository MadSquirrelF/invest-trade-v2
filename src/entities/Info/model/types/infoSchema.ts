import GeneralCategoryIcon from '@/shared/assets/icons/development_icon.svg';
import PartnerCategoryIcon from '@/shared/assets/icons/partner-icon.svg';
import AppCategoryIcon from '@/shared/assets/icons/service-icon.svg';
import PriceCategoryIcon from '@/shared/assets/icons/price-icon.svg';
import { ITabs } from '@/entities/Product';

export enum CategoryInfoType {
  GENERAL = 'GENERAL',
  PARTNER = 'PARTNER',
  APP = 'APP',
  PRICE = 'PRICE'
}

export const CategoryInfoList: ITabs[] = [
    {
        value: CategoryInfoType.GENERAL,
        icon: GeneralCategoryIcon,
    },
    {
        value: CategoryInfoType.PARTNER,
        icon: PartnerCategoryIcon,
    },
    {
        value: CategoryInfoType.APP,
        icon: AppCategoryIcon,
    },
    {
        value: CategoryInfoType.PRICE,
        icon: PriceCategoryIcon,
    },
];

export interface Info {
  _id: string;
  question: string;
  answer: string;
  category: CategoryInfoType
}
