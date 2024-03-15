import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import FavoritePage from './FavoritePage';

export default {
    title: '@/pages/FavoritePage',
    component: FavoritePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FavoritePage>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof FavoritePage> = () => <FavoritePage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
