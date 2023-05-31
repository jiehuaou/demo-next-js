import styles from './alert.module.scss';
import { clsx } from 'clsx';

export default function Alert({ children, type, theme }) {
  return (
    <div
      className={
        clsx({
          [styles.success]: type === 'success',
          [styles.error]: type === 'error',
          [styles.light]: theme === 'light',
          [styles.dark]: theme === 'dark',
        })
    }
    >
      {children}
    </div>
  );
}

