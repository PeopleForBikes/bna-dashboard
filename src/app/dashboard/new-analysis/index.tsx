'use client';

import { useCallback } from 'react';

import useForm from '@Hooks/useForm';
import ResetButton from '@Components/ResetButton';
import SubmitButton from '@Components/SubmitButton';

import newAnalysisFormAction from './actions';
import newAnalysisFormSchema from './schema';
import styles from './styles.module.css';

// ADD IMPORT CSV FUNCTIONALITY HERE

type InitalFormData ={
  country: '',
  city: '',
  region: '',
  fips_code: ''
};

function NewAnalysis() {
  const {
    handleAction, handleSubmit,
    serverReply, isPending,
    validationErrors, errors
  } = useForm({
    schema: newAnalysisFormSchema,
    action: newAnalysisFormAction,
    initialActionState: { success: false, errors: null, data: null }
  });

  const handleReset = useCallback(() => {
    (document.getElementById('NewAnalysisForm') as HTMLFormElement)?.reset();
  }, []);

  return (
    <form
      id="NewAnalysisForm"
      name="NewAnalysisForm"
      className={styles['form']}
      action={handleAction}   //server
      onSubmit={handleSubmit} //client
    >
      { serverReply.success
        ? <p className={styles['success']}>Analysis submitted successfully!</p>
        : null
      }

      <div className={styles['inputs']}>
        <div className={styles['input-container']}>
          <div>
            <label htmlFor="country">Country</label>
            <span>{validationErrors.country?.message}</span>
          </div>
          <input
            id="country"
            name="country"
            type="text"
            required={true}
          />
        </div>

        <div className={styles['input-container']}>
          <div>
           <label htmlFor="city">City</label>
           <span>{validationErrors.city?.message}</span>
          </div>
          <input
            id="city"
            name="city"
            type="text"
            required={true}
          />
        </div>

        <div className={styles['input-container']}>
          <div>
            <label htmlFor="region">Region</label>
            <span>{validationErrors.region?.message}</span>
          </div>
          <input
            id="region"
            name="region"
            type="text"
            required={true}
          />
        </div>

        <div className={styles['input-container']}>
          <div>
            <label htmlFor="fips_code">FIPS Code</label>
            <span>{validationErrors.fips_code?.message}</span>
          </div>
          <input
            id="fips_code"
            name="fips_code"
            type="text"
            required={true}
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
