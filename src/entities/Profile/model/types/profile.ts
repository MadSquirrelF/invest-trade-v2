import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { UserRole, JsonSettings } from '@/entities/User';
import { FeatureFlags } from '@/shared/types/featureFlags';

export interface Profile {
    _id?: string;
    email?: string;
    username?: string;
    firstname?:string;
    discription?: string;
    lastname?:string;
    country?: Country;
    age?: number;
    currency?: Currency;
    sex?: string;
    phone_number?: string;
    createdAt?: string;
    city?: string;
    address?: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}
