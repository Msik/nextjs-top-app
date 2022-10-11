import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ isEditable = false, rating, error, setRating, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  const computeFocus = (rating: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }

    if (!rating && i == 0) {
      return tabIndex ?? 0;
    }

    if (rating == i + 1) {
      return tabIndex ?? 0;
    }

    return -1;
  };

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={handleKey}
          ref={(r) => ratingArrayRef.current?.push(r)}
        >
          <StarIcon />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }

    setRating(i);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }

    let actualRating = rating ?? 0;

    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      e.preventDefault();
      actualRating = actualRating >= 5 ? 5 : actualRating + 1;
      ratingArrayRef.current[rating]?.focus();
    }

    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault();
      actualRating = actualRating <= 0 ? 0 : actualRating - 1;
      ratingArrayRef.current[rating - 2]?.focus();
    }

    setRating(actualRating);
  };

  return (
    <div {...props} ref={ref} className={cn(styles.inputWrapper, {
      [styles.error]: error
    })}>
      {ratingArray.map((rating: JSX.Element, i: number) => (<span key={i}>{rating}</span>))}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
