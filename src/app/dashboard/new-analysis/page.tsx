import NewAnalysis from './index';
import styles from './styles.module.css'


async function Page() {
  return (
    <section className={styles['layout']}>
      <h1>Submit a New Analysis</h1>
        <NewAnalysis />
    </section>
  );
}


export default Page;
