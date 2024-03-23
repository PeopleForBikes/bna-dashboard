'use server';

import { cookies } from 'next/headers';

import formSchema from './schema';
import { ZodIssue } from 'zod';


type Result = {
  success: boolean,
  errors: Array<{
    message: string;
  }> | null | ZodIssue[]
};

async function ServerAction(prevState: Result, formData: FormData): Promise<Result> {
  const _formData = {
    country: formData.get('country') as string,
    city: formData.get('city') as string,
    region: formData.get('region') as string,
    fips_code: formData.get('fips_code') as string
  };

  const isValid = formSchema.safeParse(_formData);

  if (!isValid.success) {
    return {
      success: false,
      errors: isValid.error.issues
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
    body: JSON.stringify(isValid.data)
  };

  try {
    const resp = await fetch(`${process.env.BNA_API_URL}/bnas/enqueue`, metadata);

    if (!resp.ok) {
      console.error(resp.headers);
      console.error(await resp.text());
      return { success: false, errors: [{ message: 'Server error' }] };
    }

    return { success: true, errors: null };
  } catch (error) {
    console.error('Request Error', error);
    return { success: false, errors: [{ message: 'Server error' }] };
  }
}


export default ServerAction;
