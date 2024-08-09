'use client';

import type { ButtonHTMLAttributes, ReactHTML } from 'react';
import styles from './styles.module.css';


function ResetButton(
  { text, className='', style={}, onClick, ...props }:
  { text: string, className?: string, style?: any, onClick?: () => void, props?: any }) {
  return (
    <button
      type="button"
      className={`${styles['button']} ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {text}
    </button>
  );
}


export default ResetButton;
