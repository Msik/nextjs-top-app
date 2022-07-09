import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import cn from 'classnames';
import UserIcon from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating';

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  return (
    <div className={cn(styles.review, className)} {...props}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{review.name}:</span>&nbsp;&nbsp;
        <span>{review.title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(review.createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={review.rating} />
      </div>
      <div className={styles.description}>
        {review.description}
      </div>
    </div>
  );
};
