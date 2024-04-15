import { New } from './newSchema';

export interface NewDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: New;
}
