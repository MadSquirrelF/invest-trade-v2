import { EntityState } from '@reduxjs/toolkit';
import { New } from '@/entities/new';

export interface NewDetailsLastSchema extends EntityState<New> {
  isLoading?: boolean;
  error?: string;
}
