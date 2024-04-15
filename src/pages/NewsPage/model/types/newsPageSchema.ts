import { EntityState } from '@reduxjs/toolkit';
import {
    New, NewOrder, NewSortField, NewView,
} from '@/entities/new';

export interface NewsPageSchema extends EntityState<New> {
  isLoading?: boolean;
  error?: string;

  // pagination

  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: NewOrder;
  view: NewView;
  sort: NewSortField;
  search: string;

  _inited: boolean;
}
