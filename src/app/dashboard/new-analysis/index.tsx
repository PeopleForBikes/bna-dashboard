'use client';

import { useActionState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ResetButton from '@Components/ResetButton';
import SubmitButton from '@Components/SubmitButton';

import ServerAction from './action';
import { FormSchema } from './schema';
import styles from './styles.module.css';

// ADD IMPORT CSV FUNCTIONALITY HERE

function NewAnalysis() {
  const {
    clearErrors,
    register,
    reset,
    setError,
    formState: { isValid, errors }
  } = useForm<FormSchema>({
    defaultValues: {
      country: '',
      city: '',
      region: '',
      fips_code: ''
    },
    resetOptions: {
      keepDirtyValues: true,  // user-interacted input will be retained
      keepErrors: false       // input errors will be retained with value update
    }
  });

  const initialState = { success: false, errors: [] };
  const [serverReply, formAction, isPending] = useActionState(ServerAction, initialState);

  const handleReset = useCallback(() => reset(), [reset]);

  useEffect(() => {
    if (serverReply.errors && serverReply.errors.length > 0) {
      clearErrors();

      for (const error of serverReply.errors) {
        const { name, message } = error;
        setError(name, { message });
      };
    }

    if (serverReply.success) {
      reset();
    }
  }, [clearErrors, reset, setError, serverReply]);

  return (
    <form className={styles['form']} action={formAction}>
      { serverReply.success
        ? <p className={styles['success']}>Analysis submitted successfully!</p>
        : null
      }

      <div className={styles['inputs']}>
        <div className={styles['input-container']}>
          <label htmlFor="country">Country</label>
          <input id="country"
            {...register('country', { required: true })}
          />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="city">City</label>
          <input id="city"
            {...register('city', { required: true })}
          />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="region">Region</label>
          <input id="region"
            {...register('region', { required: true })}
          />
        </div>

        <div className={styles['input-container']}>
          <label htmlFor="fips_code">FIPS Code</label>
          <input id="fips_code"
            {...register('fips_code', { required: true })}
        />
        </div>
      </div>

      <div className={styles['actions']}>
        <ResetButton
          text="Reset"
          onClick={handleReset}
        />

        <SubmitButton
          text="Submit"
          isPending={isPending}
        />
      </div>
    </form>
  );
}


export default NewAnalysis;
