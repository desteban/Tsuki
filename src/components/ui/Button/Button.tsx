import './ButtonStyles.css';
import { HtmlHTMLAttributes, ReactNode } from 'react';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}
