import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({ appearance, children }: ButtonProps): JSX.Element => {
    return (
        <button className={cn({
            [styles.button]: true,
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost',
        })}>{children}</button>
    );
};
