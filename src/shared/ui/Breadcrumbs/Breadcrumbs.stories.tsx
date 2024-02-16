import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

export default {
    title: 'shared/Breadcrumbs',
    component: Breadcrumbs,

    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Breadcrumbs>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Breadcrumbs> = (args) => <Breadcrumbs {...args} />;

export const Clear = Template.bind({});
Clear.args = {};
