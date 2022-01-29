import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ size = 'm', children, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, styles[size])}
      {...props}
    >
      {children}
    </p>
  );
};
