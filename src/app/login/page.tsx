'use client';

import { redirect } from 'next/navigation';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';


function Page() {
  const { authStatus, user } = useAuthenticator(context => {
    return [context.user];
  });

  if (authStatus === 'authenticated') {
    return redirect('/dashboard');
  }

  return <Authenticator loginMechanisms={['username']} hideSignUp={true} />;
}


export default Page;
