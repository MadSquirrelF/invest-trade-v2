import { EntityState } from '@reduxjs/toolkit';
import { Info, CategoryInfoType } from '@/entities/Info';

export interface HelpPageSchema extends EntityState<Info> {
  isLoading?: boolean;
  error?: string;

  // filters
  category: CategoryInfoType
  search: string;

  _inited: boolean;
}
