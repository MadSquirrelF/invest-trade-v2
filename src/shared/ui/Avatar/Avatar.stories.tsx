import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarImg from 'shared/assets/images/defaultAvatar.jpg';
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
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
    src: AvatarImg,
};

export const Small = Template.bind({});

Small.args = {
    size: 50,
    src: AvatarImg,
};
