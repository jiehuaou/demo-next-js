import styles from './alert.module.scss';
import { clsx } from 'clsx';
import React from 'react';

/**
 * 
 * @type {React.FC<{children:React.ReactNode, type:string, theme:string}>}
 */
const Alert =  ({ children, type, theme }) => {
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


export default Alert;