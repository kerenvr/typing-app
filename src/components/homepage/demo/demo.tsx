"use client"; 
import Image from 'next/image';
import styles from './demo.module.css';

const Demo = () => {

    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.header}>Mix it up your way!</h1>
            <div className={styles.imgtext}>
                <Image src="/typing2.png" alt="Description of image" width={1200} height={600} />
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.imgtext}>
                <h2 className={styles.text}>Keep tabs on your stats!</h2>
                <div className={styles.img}>
                    <Image src="/stats.png" alt="Description of image" width={700} height={300} />
                </div>
            </div>
        </div>
        </>
    );
};

export default Demo;
