import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { Dropdown } from './Dropdown';
import { Button, ThemeButton } from '../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Dropdown>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    trigger: <Button theme={ThemeButton.DEFAULT}>Open!</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'memo',
        },
    ],
};

export const Dark = Template.bind({});

Dark.args = {
    trigger: <Button theme={ThemeButton.DEFAULT}>Open!</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'memo',
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
