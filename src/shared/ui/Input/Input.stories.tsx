import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: 'Enter name',
    label: 'Game of Thrones',
    value: 'Game of Thrones',
};

export const Password = Template.bind({});
Password.args = {
    placeholder: 'Enter password',
    label: 'Password',
    value: '12345',
    isPassword: true,
};

export const Dark = Template.bind({});
Dark.args = {
    placeholder: 'Enter name',
    label: 'Game of Thrones',
    value: 'Game of Thrones',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
