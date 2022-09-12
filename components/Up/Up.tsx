import { motion, useAnimation } from 'framer-motion';
import useScrollY from '../../hooks/useScrollY';
import styles from './Up.module.css';
import { useEffect } from 'react';

export const Up = (): JSX.Element => {
  const y = useScrollY();
  const control = useAnimation();

  useEffect(() => {
    control.start({ opacity: y / document.body.scrollHeight });
  }, [y, control]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      className={styles.up}
      onClick={scrollToTop}
      animate={control}
      initial={{ opacity: 0 }}
    >
      Up
    </motion.button>
  );
};
