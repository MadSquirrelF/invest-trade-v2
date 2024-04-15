import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Card } from './Card';

export default {
    title: 'shared/Card',
    component: Card,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: (<div>Some Text</div>),
};

export const Dark = Template.bind({});
Dark.args = {
    children: (<div>Some Text</div>),
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
