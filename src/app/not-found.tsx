import { redirect } from 'next/navigation';


function NotFound() {
  console.info(process.env);
  redirect(`/dashboard/submissions`);
}


export default NotFound;
