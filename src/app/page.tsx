// Home.tsx
import styles from "./home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <h1>Master Typing,</h1>
          <h1>Grow Your Garden</h1>
        </div>
        <p className={styles.desc}>Start your typing journey today and watch your skills flourish. </p>
        <button className="btn w-36 bg-stone-500 text-white p-3 rounded-md">GET STARTED</button>
      </div>
      <div className={styles.imgContainer}>
        <Image
          className={styles.img}
          src="/image1.svg"
          alt="flower"
          fill/>
      </div>
    </main>
  );
}

