import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize } from './Text';

export default {
    title: 'shared/Text',
    component: Text,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Заголовок',
    text: 'Описание Описание Описание Описание Описание Описание Описание Описание',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Заголовок',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Описание Описание Описание Описание Описание Описание Описание Описание',
};

export const Dark = Template.bind({});
Dark.args = {
    title: 'Заголовок',
    text: 'Описание Описание Описание Описание Описание Описание Описание Описание',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Заголовок',
    text: 'Описание Описание Описание Описание Описание Описание Описание Описание',
    size: TextSize.L,
};

SizeL.decorators = [ThemeDecorator(Theme.DARK)];
