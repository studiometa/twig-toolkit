import './Button.css';
import Button from './Button.twig';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    level: { control: { type: 'select', options: ['primary', 'secondary'] } },
  },
};

export const Primary = (args) => ({ props: args });

Primary.args = {
  label: 'Primary',
  level: 'primary',
};

export const Secondary = (args) => ({ props: args });

Secondary.args = {
  label: 'Secondary',
  level: 'secondary',
};
