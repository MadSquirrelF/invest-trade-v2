import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Error } from './Error';

export default {
    title: 'shared/Error',
    component: Error,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Error>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    error: 'Неверное имя пользователя или пароль',
};

export const Dark = Template.bind({});
Dark.args = {
    error: 'Неверное имя пользователя или пароль',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
