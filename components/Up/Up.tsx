import { motion, useAnimation } from 'framer-motion';
import useScrollY from '../../hooks/useScrollY';
import styles from './Up.module.css';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

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
    <motion.div
      className={styles.up}
      animate={control}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon icon='up' appearance='primary' onClick={scrollToTop} />
    </motion.div>
  );
};
