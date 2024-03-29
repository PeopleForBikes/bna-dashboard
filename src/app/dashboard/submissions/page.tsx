import { cookies } from 'next/headers';
import Submissions from './index';


async function Page() {
  const cookieStore = cookies();
  let accessToken: string | null = null;
  let data = [];

  cookieStore.getAll().forEach(({ name, value }) => {
    if (name.endsWith('.accessToken')) {
      accessToken = value;
    }
  });

  const metadata = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BNA_API_URL}/cities/submissions?status=Pending`, metadata);

    !resp.ok
      ? console.error('Submission response not OK:', await resp.text())
      : data = await resp.json()
    ;

    console.info('Submission data:', data);
    return (
      <Submissions data={data} />
    );
  } catch (error) {
    console.error('Submission request failed:', error);
    return <Submissions data={data} />;
  }
}


export default Page;
