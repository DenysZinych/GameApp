import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import styles from "./Input.module.css";

interface InputProps {
  id: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  image?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  value,
  type,
  label,
  placeholder,
  image,
  error,
  errorMessage,
  onChange,
}: InputProps) => (
  <div className={styles.container}>
    {!!label && (
      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>
    )}
    <div className={styles.inputWrapper}>
      {!!image && (
        <img
          src={image}
          aria-hidden
          alt="input image"
          className={styles.image}
        />
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder || label}
        autoComplete="off"
      />
    </div>
    {error && <p className={styles.error}>{errorMessage}</p>}
  </div>
);
