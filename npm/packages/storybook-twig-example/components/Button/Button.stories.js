import './Button.css';
import ButtonTemplate from './Button.twig';
import Button from './Button.js';

let btn;
window.addEventListener('DOMContentLoaded', () => {
  btn = new Button();
});

export default {
  title: 'Button',
  component: ButtonTemplate,
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
