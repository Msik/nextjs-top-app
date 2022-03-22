import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (category: string) => () => {
    setMenu(menu.map((item) => {
      if (item._id.secondCategory === category) {
        item.isOpened = !item.isOpened;
      }

      return item;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((item) => (
          <li key={item.route}>
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
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((item) => {
          const isOpened = item.pages.map(page => page.alias).includes(router.asPath.split('/')[2]);
          if (isOpened) {
            item.isOpened = true;
          }

          return (
            <div key={item._id.secondCategory}>
              <div className={styles.secondLevel} onClick={openSecondLevel(item._id.secondCategory)}>{item._id.secondCategory}</div>
              <div className={cn(styles.secondLevelBlock, { [styles.secondLevelBlockOpened]: item.isOpened })}>
                {item.isOpened && buildThirdLevel(item.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      pages.map((page) => (
        <Link href={`/${route}/${page.alias}`}>
          <a className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
          })}>
            {page.category}
          </a>
        </Link>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      <ul>
        {buildFirstLevel()}
      </ul>
    </div>
  );
};
