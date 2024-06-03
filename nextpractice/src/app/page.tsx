import Main from "./components/Main";
import Header from "./components/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Header title={"都道府県の人口構成"} />
        <Main />
      </div>
    </main>
  );
}
