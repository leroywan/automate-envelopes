import styles from './app.module.scss';

import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <div>
      <h1 className={styles.Test}>Hello world</h1>
      <Button variant="contained">Hello World</Button>
    </div>
  )
}
