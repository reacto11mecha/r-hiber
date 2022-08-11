import { Link } from "react-router-dom";

import styles from "styles/pages/Home.module.css";

export const Home = () => (
  <div className={styles.container}>
    <div>
      <article className={`card ${styles.cardStyle}`}>
        <footer>
          <h1>List Arduino</h1>
          <Link to="viewer">Test Halaman Viewer</Link>
        </footer>
      </article>
    </div>
  </div>
);
