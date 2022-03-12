import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';

export const Menu = (): JSX.Element => {
  const { menu } = useContext(AppContext);

  return (
    <div>
      <ul>
        {menu.map(item => <li key={item._id.secondCategory}>{item._id.secondCategory}</li>)}
      </ul>
    </div>
  );
};
