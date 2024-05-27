import { EntityState } from '@reduxjs/toolkit';
import {
    New,
} from '@/entities/new';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';

export interface NewsPageSchema extends EntityState<New> {
  isLoading?: boolean;
  error?: string;

  // pagination

  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: OrderType;
  view: ViewType;
  sort: SortType;
  search: string;

  _inited: boolean;
}
