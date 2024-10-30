"use client"; 
import Image from 'next/image';
import styles from './demo.module.css';

const Demo = () => {

    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.header}>typing made easy.</h1>
            <div className={styles.imgtext}>
                <Image src="/typing.png" alt="Description of image" width={500} height={300} />
                <h2 className={styles.text}>Type away.</h2>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.imgtext}>
                <h2 className={styles.text}>Track your stats.</h2>
                <div className={styles.img}>
                    <Image src="/stats.png" alt="Description of image" width={500} height={300} />
                </div>
            </div>
        </div>
        </>
    );
};

export default Demo;
