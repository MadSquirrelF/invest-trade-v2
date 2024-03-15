import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarSvg from '@/shared/assets/icons/defaut-avatar.svg';
import { Avatar } from './Avatar';

export default {
    title: '@/shared/Avatar',
    component: Avatar,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Avatar>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    size: 150,
    children: <AvatarSvg />,
};

export const Small = Template.bind({});

Small.args = {
    size: 50,
    children: <AvatarSvg />,
};
