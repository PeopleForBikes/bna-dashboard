'use server';

import sql from '@Utils/db';
import styles from './styles.module.css';


async function Page() {
  const pipelineInfo = await sql`SELECT * FROM brokenspoke_pipeline`;

  return (
    <div className={styles['layout']}>
      <h1>Dashboard</h1>

      <section style={{ width: '75%' }}>
        {pipelineInfo.map((item, index) => {
          const {
            end_time, fargate_task_arm, results_posted,
            s3_bucket, sqs_message, start_time, step,
            state_machine_id, torn_down, cost
          } = item;
          const sqsMessage = JSON.parse(sqs_message);

          return (
            <div key={index} className={styles['card']}>
              <header className={styles['header']}>
                <h2 className={styles['title']}>{step}</h2>
              </header>

              <div className={styles['content']}>
                <div className={styles['column']} style={{ display: 'flex', width: '35%' }}>
                    <div className={styles['location']}>
                      <p>
                        <span>Country:</span>
                        <span>{sqsMessage['country']}</span>
                      </p>
                      <p>
                        <span>City: </span>
                        <span>{sqsMessage['city']}</span>
                      </p>
                      <p>
                        <span>Region: </span>
                        <span>{sqsMessage['region']}</span>
                      </p>
                      <p>
                        <span>FIPS Code: </span>
                        <span>{sqsMessage['fips_code']}</span>
                      </p>
                    </div>
                  </div>
                <div className={styles['column']} style={{ width: '65%'}}>
                  <p>
                    <span>Cost: </span>
                    <span>{cost}</span>
                  </p>
                  <p>
                    <span>Start Time: </span>
                    <span>{start_time.toISOString()}</span>
                    </p>
                  <p>
                    <span>End Time: </span>
                    <span>{end_time?.toISOString()}</span>
                    </p>
                  <p>
                    <span>Fargate Task ARM: </span>
                    <span>{fargate_task_arm}</span>
                  </p>
                  <p>
                    <span>Results Posted: </span>
                    <span>{results_posted}</span>
                  </p>
                  <p>
                    <span>S3 Bucket: </span>
                    <span>{s3_bucket}</span>
                  </p>
                  <p>
                    <span>State Machine ID: </span>
                    <span>{state_machine_id}</span>
                  </p>
                  <p>
                    <span>Torn Down: </span>
                    <span>{torn_down}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}


export default Page;
