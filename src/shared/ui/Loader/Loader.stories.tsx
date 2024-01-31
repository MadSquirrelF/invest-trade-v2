import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../../../app/styles/index.scss';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

import { Loader, ThemeLoader } from './Loader';

export default {
    title: 'shared/Loader',
    component: Loader,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Loader>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const MainLoaderLight = Template.bind({});
MainLoaderLight.args = {
    theme: ThemeLoader.MAIN_LOADER,
};

export const MainLoaderDark = Template.bind({});
MainLoaderDark.args = {
    theme: ThemeLoader.MAIN_LOADER,
};
MainLoaderDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BtnLoaderLight = Template.bind({});
BtnLoaderLight.args = {
    theme: ThemeLoader.BTN_LOADER,
};

export const BtnLoaderDark = Template.bind({});
BtnLoaderDark.args = {
    theme: ThemeLoader.BTN_LOADER,
};
BtnLoaderDark.decorators = [ThemeDecorator(Theme.DARK)];
