'use server';

import { cookies } from 'next/headers';

import formSchema from './schema';
import { ZodIssue } from 'zod';
import NewAnalysis from '.';


type Result = {
  success: boolean;
  errors?: {
    server?: [{ message: string }];
    validation?: Record<string, { message: string }>;
  } | null;
  data?: unknown;
};

async function NewAnalysisAction(prevState: Result, formData: FormData): Promise<Result> {
  const _formData = {
    country: formData.get('country') as string,
    city: formData.get('city') as string,
    region: formData.get('region') as string,
    fips_code: formData.get('fips_code') as string
  };

  const validationErrors: Record<string, { message: string }> = {};
  const validation = formSchema.safeParse(_formData);

  if (!validation.success) {
    for (const issue of validation.error.issues) {
      const { path, message } = issue;
      if (path && path[0]) {
        validationErrors[path[0]] = { message };
      }
    }

    console.warn({ validationErrors });
    return {
      success: false,
      errors: { validation: validationErrors }
    };
  }

  const cookieStore = cookies();
  let accessToken: string | null = null;
  let data = [];

  cookieStore.getAll().forEach(({ name, value }) => {
    if (name.endsWith('.accessToken')) {
      accessToken = value;
    }
  });

  const metadata = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(validation.data)
  };

  try {
    const resp = await fetch(`${process.env.BNA_API_URL}/bnas/enqueue`, metadata);

    if (!resp.ok) {
      console.error(resp.headers);
      console.error(await resp.text());
      return { success: false, errors: { server: [{ message: 'Server error' }] }};
    }

    return { success: true, errors: null };
  } catch (error) {
    console.error('Request Error', error);
    return { success: false, errors: { server: [{ message: 'Server error' }] }};
  }
}


export default NewAnalysisAction;
