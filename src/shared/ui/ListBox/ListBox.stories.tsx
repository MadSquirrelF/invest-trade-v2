import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
    decorators: [
        (Story) => <div style={{ padding: '200px' }}><Story /></div>,
    ],
} as ComponentMeta<typeof ListBox>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const TopLeft = Template.bind({});

TopLeft.args = {
    direction: 'top left',
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const TopRight = Template.bind({});

TopRight.args = {
    direction: 'top right',
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const BottomRight = Template.bind({});

BottomRight.args = {
    direction: 'bottom right',
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const BottomLeft = Template.bind({});

BottomLeft.args = {
    direction: 'bottom left',
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};

export const Dark = Template.bind({});

Dark.args = {
    items: [
        {
            value: 'Durward Reynolds',
            content: 'Durward Reynolds',
            disabled: false,
        },
        {
            value: 'Kenton Towne',
            content: 'Kenton Towne',
            disabled: true,
        },
        {
            value: 'Therese Wunsch',
            content: 'Therese Wunsch',
            disabled: false,
        },
    ],
    value: 'Durward Reynolds',
    onChange: action('onChange'),
    defaultValue: 'Choose value',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
