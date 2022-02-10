import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    contructRating(rating);
  }, [rating]);

  const contructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((rating: JSX.Element, i: number) => {
      return (
        <StarIcon className={cn(styles.star, {
          [styles.filled]: i < currentRating
        })} />
      );
    });

    setRatingArray(updatedArray);
  };

  return (
    <div {...props}>
      {ratingArray.map((rating: JSX.Element, i: number) => (<span key={i}>{rating}</span>))}
    </div>
  );
};
