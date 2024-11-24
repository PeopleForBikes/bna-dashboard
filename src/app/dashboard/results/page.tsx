import sql      from '@Utils/db';
import Results  from './index';


async function Page() {
  const citySummary = await sql`
    WITH latest_summaries AS (
      SELECT
        city_id,
        created_at,
        version,
        score,
        ROW_NUMBER() OVER (
          PARTITION BY city_id ORDER BY created_at DESC
        ) AS rn
      FROM summary
    )

    SELECT
      s.created_at,
      s.version,
      s.score,
      c.country,
      c.state,
      c.region,
      c.name AS city
    FROM latest_summaries s
    JOIN city c ON c.id = s.city_id
    WHERE s.rn = 1
    ORDER BY s.created_at DESC;
  `;

  return (
    <Results data={citySummary} />
  );
}


export default Page;
