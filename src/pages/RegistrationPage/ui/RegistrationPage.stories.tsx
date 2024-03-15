import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import RegistrationPage from './RegistrationPage';

export default {
    title: '@/pages/RegistrationPage',
    component: RegistrationPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RegistrationPage>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof RegistrationPage> = () => <RegistrationPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
