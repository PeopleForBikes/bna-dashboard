'use client';

import { useState } from 'react';
import styles from './styles.module.css';


function Dashboard({ data }) {
  const [analysis, setAnalysis] = useState(data);

  return (
    <section>
    {analysis.map((item, index) => {
      const {
        end_time, fargate_task_arm, results_posted,
        s3_bucket, sqs_message, start_time, step,
        state_machine_id, torn_down, cost
      } = item;
      const sqsMessage = JSON.parse(sqs_message);
      console.log(start_time)

      return (
        <div key={index} className={styles['card']}>
          <h2>{step}</h2>
          <div>
            <div>
              <p>Cost: {cost}</p>
              <p>Start Time: {JSON.stringify(start_time)}</p>
              <p>End Time: {JSON.stringify(end_time)}</p>
              <p>Fargate Task ARM: {fargate_task_arm}</p>
              <p>Results Posted: {results_posted}</p>
              <p>S3 Bucket: {s3_bucket}</p>
              <p>State Machine ID: {state_machine_id}</p>
              <p>Torn Down: {torn_down}</p>
            </div>
            <div>
              <div className="location" style={{ border: '1px solid red' }}>
                <p>Country: {sqsMessage['country']}</p>
                <p>City: {sqsMessage['city']}</p>
                <p>Region: {sqsMessage['region']}</p>
                <p>FIPS Code: {sqsMessage['fips_code']}</p>
              </div>
            </div>
          </div>
        </div>
      );
    })}
    </section>
  );
}


export default Dashboard;

// Table
// Cost
// EndTime
// FargateTaskARN
// ResultsPosted
// S3Bucket
// SqsMessage
// StartTime
// Step
// StateMachineId
// TornDown
