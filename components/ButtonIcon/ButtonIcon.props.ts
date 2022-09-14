import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export const icons = {
  up: 'Up',
  close: 'Cl',
  menu: 'Mn',
};

export type IconName = 'up' | 'close' | 'menu';// keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: 'primary' | 'white';
}
