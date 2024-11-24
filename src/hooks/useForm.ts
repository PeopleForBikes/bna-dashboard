'use client';

import type { SyntheticEvent } from 'react';
import type { ZodSchema } from 'zod';

import { useActionState, useEffect, useState } from 'react';


interface UseFormHook<FormState, Payload> {
  handleAction: (payload: Payload) => void;
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  isPending: boolean;
  serverReply: any;
  errors: Record<string, { message: string }>;
  setErrors: (errors: Record<string, { message: string }>) => void;
  validationErrors: Record<string, { message: string }>;
  setValidationErrors: (errors: Record<string, { message: string }>) => void;
}

function useForm<State, Payload>({ schema, action, initialActionState }: {
  schema: ZodSchema,
  action: (
    formState: Awaited<State>,
    payload: Payload
  ) => Promise<any>,
  initialActionState: Awaited<State>
}): UseFormHook<State, Payload> {
  const [serverReply, handleAction, isPending] = useActionState(action, initialActionState);
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});            // reset errors
    setValidationErrors({});  // reset validation errors
    const formData = new FormData(event.currentTarget);

    const _zodFormData: Record<string, string> = {};
    for (const [name, value] of formData) {
      if (name.startsWith('$ACTION')) continue;
      _zodFormData[name] = value as string;
    }

    const _validationErrors: Record<string, { message: string }> = {};
    const validation = schema.safeParse(_zodFormData);

    if (validation.success) {
      handleAction(formData as Payload);
    } else {
      for (const issue of validation.error.issues) {
        const { path, message } = issue;
        if (path && path[0]) {
          _validationErrors[path[0]] = { message };
        }
      }

      setValidationErrors(_validationErrors);
    }
  }

  useEffect(() => {
    if (serverReply && serverReply.errors && serverReply.errors.validation) {
      setValidationErrors(serverReply.errors.validation);
    }
  }, [serverReply, setValidationErrors]);

  console.info('server: serverReply', serverReply);

  return {
    handleAction, handleSubmit,
    isPending, serverReply,
    errors, setErrors,
    validationErrors, setValidationErrors
  };
}


export default useForm;
