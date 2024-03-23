'use client';

import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@aws-amplify/ui-react';
import Empty from '@Components/Empty';


function Submissions({ data }) {
  return (
    <section>
      <h1>Pending submissions</h1>
      {
        data.length > 1
          ? <SubmissionTable data={data}/>
          : <Empty />
      }
    </section>
  );
}

const SubmissionTable = ({ data }) => {
  const submissionRows = data.map(s => (
    <TableRow key={s.id}>
      <TableCell>{s.country}</TableCell>
      <TableCell>{s.region}</TableCell>
      <TableCell>{s.city}</TableCell>
      <TableCell>{s.fips_code}</TableCell>
      <TableCell>
        <Button colorTheme="success" onClick={(e) => handleOnClickAccept(e, s)}>
          ✅
        </Button>
      </TableCell>
      <TableCell>
        <Button colorTheme="error" onClick={(e) => handleOnClickReject(e, s)}>
          ❌
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <Table className="styled-table">
      <TableHead>
        <TableRow>
          <TableCell as="th">Country</TableCell>
          <TableCell as="th">Region</TableCell>
          <TableCell as="th">City</TableCell>
          <TableCell as="th">Fips Code</TableCell>
          <TableCell as="th"></TableCell>
          <TableCell as="th"></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      { submissionRows }
      </TableBody>
    </Table>
  );
};


export default Submissions;



// useEffect(() => {
//   async function fetchS3Results() {
//     const res = await fetch('/submissions?status=Pending');
//     const data = await res.json();
//     setSubmissions(data.data);
//   }

//   fetchS3Results();
// }, []);
// const handleOnClickAccept = (event, submission) => {
//   let s = submission;
//   s.status = 'Approved';
//   fetch(`/submissions?cognito_access=${cognito_access}`, {
//     method: 'PATCH',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify(s),
//   })
//     .then((result) => {
//       console.log('client result', result);
//     })
//     .catch((err) => {
//       console.log('fetch error client', err);
//     });

//   const body = {
//     country: s.country,
//     city: s.city,
//     region: s.region,
//     fips_code: s.fipsCode,
//   };
//   // 👇 call backend endpoint using fetch API
//   fetch(`/analysis?cognito_access=${cognito_access}`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${cognito_access}`,
//     },
//   })
//     .then((result) => {
//       console.log('client result', result);
//     })
//     .catch((err) => {
//       console.log('fetch error client', err);
//     });
// };

// const handleOnClickReject = (event, submission) => {
//   let s = submission;
//   s.status = 'Rejected';

// };
