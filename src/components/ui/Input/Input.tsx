import styles from './StylesInput.module.css';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <label className={`${styles.label}`}>
      {label}
      <input
        {...props}
        className={`${styles.input} ${props.className}`}
      />
    </label>
  );
}
