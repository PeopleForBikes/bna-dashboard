'use client';


import ClipLoader from 'react-spinners/ClipLoader';
import styles from './styles.module.css';


function SubmitButton({ text, isPending }: { text: string, isPending: boolean }) {
  return (
    <button
      aria-disabled={isPending}
      className={styles['button']}
      type="submit"
    >
      {isPending
        ? <ClipLoader color={'#fff'} loading={true} size={15} />
        : text
      }
    </button>
  );
}


export default SubmitButton;
