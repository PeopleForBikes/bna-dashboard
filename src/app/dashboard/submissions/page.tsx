'use server';

import sql          from '@Utils/db';
import Submissions  from './index';


async function Page() {
  const submissionInfo = await sql`SELECT * FROM submission WHERE status='Pending'`;

  return (
    <Submissions data={submissionInfo} />
  );
}


export default Page;
