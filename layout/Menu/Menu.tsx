import styles from './Menu.module.css';
import cn from 'classnames';
import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [annouce, setAnnouce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      }
    },
    hidden: { marginBottom: 0 },
  };
  const variantsChildren = {
    visible: { opacity: 1, minHeight: 19 },
    hidden: { opacity: 0, height: 0 },
  };

  const openSecondLevel = (category: string) => {
    setMenu && setMenu(menu.map((item) => {
      if (item._id.secondCategory === category) {
        setAnnouce(item.isOpened ? 'closed' : 'opened');
        item.isOpened = !item.isOpened;
      }

      return item;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, category: string) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      openSecondLevel(category);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul>
        {firstLevelMenu.map((item) => (
          <li key={item.route} aria-expanded={item.id === firstCategory}>
            <Link href={`/${item.route}`}>
              <a>
                <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: item.id === firstCategory })}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </a>
            </Link>
            {item.id === firstCategory && buildSecondLevel(item)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((item) => {
          const isOpened = item.pages.map(page => page.alias).includes(router.asPath.split('/')[2]);
          if (isOpened) {
            item.isOpened = true;
          }

          return (
            <li key={item._id.secondCategory}>
              <button
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
                aria-expanded={item.isOpened}
              >{item._id.secondCategory}</button>
              <motion.ul
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {item.isOpened && buildThirdLevel(item.pages, menuItem.route, item.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map((page) => (
        <motion.li
          key={page._id}
          variants={variantsChildren}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
          })}
          aria-current={`/${route}/${page.alias}` == router.asPath ? 'page' : false}
        >
          <Link href={`/${route}/${page.alias}`}>
            <a tabIndex={isOpened ? 0 : -1} >
              {page.category}
            </a>
          </Link>
        </motion.li>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      <nav role='navigation'>
        {annouce && <span role='log' className='visuallyHidden'>{annouce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
        {buildFirstLevel()}
      </nav>
    </div>
  );
};
