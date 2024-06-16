export { CalculationCard } from './ui/CalculationCard/CalculationCard';
export { CalculationResult } from './ui/CalculationResult/CalculationResult';

export type { CalculationSchema, Calculation } from './model/types/calculationSchema';

export {
    getCalculationData,
    getCalculationError,
    getCalculationIsLoading,
    getCalculationPrice,
} from './model/selectors/getCalculation';
export { calculationReducer, calculationActions } from './model/slice/calculationSlice';
