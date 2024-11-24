'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@aws-amplify/ui-react';


function Results({ data }: { data: any }) {
  const listResults = data.map((result: any) => {
    const { country, region, city, version, state, score } = result;

    return (
      <TableRow key={`${state}-${city}-${version}`}>
        <TableCell>{country}</TableCell>
        <TableCell>{region}</TableCell>
        <TableCell>{state}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{score}</TableCell>
        <TableCell>{version}</TableCell>
      </TableRow>
    );
  });

  return (
    <section>
      <h1>BNA Results</h1>
      <Table className="styled-table">
        <TableHead>
          <TableRow>
            <TableCell as="th">Country</TableCell>
            <TableCell as="th">Region</TableCell>
            <TableCell as="th">State</TableCell>
            <TableCell as="th">City</TableCell>
            <TableCell as="th">Score</TableCell>
            <TableCell as="th">Version</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.length > 1
              ? listResults
              : <div>NOTHING TO SEE HERE</div>
          }
        </TableBody>
      </Table>
    </section>
  );
}


export default Results;
