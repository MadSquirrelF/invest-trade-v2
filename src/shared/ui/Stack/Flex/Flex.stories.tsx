import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Flex>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});

Row.args = {
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const Column = Template.bind({});

Column.args = {
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const ColumnGap4 = Template.bind({});

ColumnGap4.args = {
    gap: '4',
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const ColumnGap16 = Template.bind({});

ColumnGap16.args = {
    gap: '16',
    direction: 'column',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const RowGap4 = Template.bind({});

RowGap4.args = {
    gap: '4',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const RowGap10 = Template.bind({});

RowGap10.args = {
    gap: '10',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};

export const RowGap32 = Template.bind({});

RowGap32.args = {
    gap: '32',
    children: (
        <>
            <div>first</div>
            <div>second</div>
            <div>third</div>
        </>
    ),
};
