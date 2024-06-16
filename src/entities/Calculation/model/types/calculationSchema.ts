import { IAdds } from '@/entities/Product';
import { Sash } from '@/entities/Sash';

export interface WindowType {
  title: string;
  poster: string;
  price: number;
  sashes: Sash[]
}

export enum HandleType {
  LEFT = 'Слева',
  RIGHT = 'Справа',
  NULL = 'Нет'
}

export enum PlacesType {
  HOUSE = 'Дом',
  OFFICE = 'Офис',
  ROOM = 'Квартира',
}

export enum BudgetType {
  CHEAP = 'Дешево',
  MIDDLE = 'Средне',
  EXPENSIVE = 'Дорого',
}

export interface Calculation {
  id: number;
  width: number;
  height: number;
  place: PlacesType;
  budget: BudgetType;
  handle: HandleType;
  type: WindowType;
  icon: React.VFC<React.SVGProps<SVGAElement>>;
  adds: IAdds[];
  count: number;
  price: number;
}

export interface CalculationSchema {
  calculations: Calculation[];
  isLoading: boolean;
  error?: string;
  totalPrice: number;
}
