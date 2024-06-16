import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    BudgetType, Calculation, CalculationSchema, HandleType, PlacesType,
    WindowType,
} from '../types/calculationSchema';
import defaultTypePoster from '@/shared/assets/images/calc-type-window-1stv.png';
import OneStv from '@/shared/assets/calculation/1stv/1stv.svg';
import { Sash } from '@/entities/Sash';
import { IAdds } from '@/entities/Product';

const initialState: CalculationSchema = {
    calculations: [
        {
            width: 400,
            height: 400,
            type: {
                title: 'Одностворчатое окно',
                price: 1497,
                poster: defaultTypePoster,
                sashes: [
                    Sash.DEAF,
                ],
            },
            id: 0,
            place: PlacesType.ROOM,
            icon: OneStv,
            budget: BudgetType.MIDDLE,
            handle: HandleType.NULL,
            adds: [],
            count: 1,
            price: 1497,
        },
    ],
    isLoading: false,
    totalPrice: 1497,
};

export const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        createCalculation: (state) => {
            if (state.calculations.length === 4) {
                state.error = 'Максимальное количество расчетов уже привышено';
            } else {
                state.calculations.push({
                    width: 400,
                    height: 400,
                    type: {
                        title: 'Одностворчатое окно',
                        price: 1497,
                        poster: defaultTypePoster,
                        sashes: [
                            Sash.DEAF,
                        ],
                    },
                    icon: OneStv,
                    id: state.calculations.length,
                    place: PlacesType.ROOM,
                    budget: BudgetType.MIDDLE,
                    handle: HandleType.NULL,
                    adds: [],
                    count: 1,
                    price: 1497,
                });

                state.totalPrice += 1497;
            }
        },
        copyCalculation: (state, action: PayloadAction<Calculation>) => {
            state.calculations.push({
                ...action.payload,
                id: state.calculations.length,
            });

            state.totalPrice += action.payload.price;
        },
        deleteCalculation: (state, action: PayloadAction<Calculation>) => {
            if (state.calculations.length > 1) {
                state.totalPrice -= action.payload.price;
                state.calculations = state.calculations.filter(
                    (obj) => obj.id !== action.payload.id,
                );
            } else {
                state.error = 'Нельзя удалить базовый расчет';
            }
        },
        setWidth: (state, action: PayloadAction<{id: number; width: number}>) => {
            const { id, width } = action.payload;
            state.calculations[id].width = width;

            state.calculations[id].price = 3 * (state.calculations[id].width - 400)
             + 5 * (state.calculations[id].height - 400)
             + state.calculations[id].type.price;

            state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
        },
        setHeight: (state, action: PayloadAction<{id: number; height: number}>) => {
            const { id, height } = action.payload;
            state.calculations[id].height = height;

            state.calculations[id].price = 3 * (state.calculations[id].width - 400)
             + 5 * (state.calculations[id].height - 400)
             + state.calculations[id].type.price;

            state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
        },
        setPlace: (state, action: PayloadAction<{id: number; place: PlacesType}>) => {
            const { id, place } = action.payload;
            state.calculations[id].place = place;
        },
        setBudget: (state, action: PayloadAction<{id: number; budget: BudgetType}>) => {
            const { id, budget } = action.payload;
            state.calculations[id].budget = budget;

            if (budget === BudgetType.CHEAP) {
                state.calculations[id].price -= (10 / 100);

                state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
            } else if (budget === BudgetType.EXPENSIVE) {
                state.calculations[id].price += (10 / 100);

                state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
            }
        },
        setType: (state, action: PayloadAction<{id: number; type: WindowType}>) => {
            const { id, type } = action.payload;
            state.calculations[id].type = type;
        },
        setAdd: (state, action: PayloadAction<{id: number; add: IAdds}>) => {
            const { id, add } = action.payload;
            state.calculations[id].adds.push(add);
            state.calculations[id].price += add.price;

            state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
        },
        removeAdd: (state, action: PayloadAction<{id: number; add: IAdds}>) => {
            const { id, add } = action.payload;
            state.calculations[id].adds = state.calculations[id].adds.filter(
                (item) => item.title !== add.title,
            );

            state.calculations[id].price -= add.price;

            state.totalPrice = state.calculations.reduce((acc, curr) => acc + curr.price, 0);
        },
        setHandle: (state, action: PayloadAction<{id: number; handle: HandleType}>) => {
            const { id, handle } = action.payload;
            state.calculations[id].handle = handle;
        },
        setSash: (state, action: PayloadAction<{id: number; idSash: number; sash: Sash}>) => {
            const { id, idSash, sash } = action.payload;
            state.calculations[id].type.sashes[idSash] = sash;

            if (sash === Sash.DEAF) {
                state.calculations[id].handle = HandleType.NULL;
            } else {
                state.calculations[id].handle = HandleType.LEFT;
            }
        },
        setIcon: (state, action: PayloadAction<{id: number; icon: React.VFC<React.SVGProps<SVGAElement>>;}>) => {
            const { id, icon } = action.payload;
            state.calculations[id].icon = icon;
        },
        clearCalculations: (state) => {
            state.totalPrice = 1497;
            state.calculations = [
                {
                    width: 400,
                    height: 400,
                    type: {
                        title: 'Одностворчатое окно',
                        price: 1497,
                        poster: defaultTypePoster,
                        sashes: [
                            Sash.DEAF,
                        ],
                    },
                    id: 0,
                    place: PlacesType.ROOM,
                    icon: OneStv,
                    budget: BudgetType.MIDDLE,
                    handle: HandleType.NULL,
                    adds: [],
                    count: 1,
                    price: 1497,
                },
            ];
        },

    },
});

export const { actions: calculationActions } = calculationSlice;
export const { reducer: calculationReducer } = calculationSlice;
