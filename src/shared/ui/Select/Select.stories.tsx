import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Select>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    label: 'Укажите значение',
    options: [
        {
            value: '123',
            content: 'Первый пункт',
        },
        {
            value: '1234',
            content: 'Второй пункт',
        },
    ],
};

export const Dark = Template.bind({});

Dark.args = {
    label: 'Укажите значение',
    options: [
        {
            value: '123',
            content: 'Первый пункт',
        },
        {
            value: '1234',
            content: 'Второй пункт',
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
