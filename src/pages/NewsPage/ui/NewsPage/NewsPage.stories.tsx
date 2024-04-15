import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import NewsPage from './NewsPage';

export default {
    title: '@/pages/NewsPage',
    component: NewsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NewsPage>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof NewsPage> = () => <NewsPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
