import styles from './notfound.module.css';
import { Link } from 'react-router-dom';

export function NotFound(){
  return(
    <>
      <div className={styles.container}>
        <h1>404 Not found page!</h1>
        <Link to={'/'}>
          Access cripto currency
        </Link>
      </div>
    </>
  )
}