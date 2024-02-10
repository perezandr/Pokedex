import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Custom404() {
  return (
    <main className={styles.Main}>
      <div className={styles.NotFoundWrapper}>
        <div className={styles.textWrapper}>
          <h1 className={styles.NotFoundTitle}>404 - Page Not Found</h1>
          <p>Click on Mimikyu to return Home</p>
        </div>
        <Link href="/">
          <img
            src="fakepikachu.gif"
            alt="fake pikachu"
            className={styles.FakePikachu}
          />
        </Link>
      </div>
    </main>
  );
}
