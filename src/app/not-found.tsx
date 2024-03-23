import { redirect } from 'next/navigation';


function NotFound() {
  redirect(`/dashboard/submissions`);
}


export default NotFound;
