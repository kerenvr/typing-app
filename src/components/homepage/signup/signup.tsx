"use client"; 
import Image from 'next/image';
import styles from './signup.module.css';
import Link from 'next/link';

const SignupHome = () => {
    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.header}>Sign Up Today!</h1>
            <Link href="/auth/sign-up">
                <button className={styles.signupButton}>Sign Up</button>
            </Link>
        </div>
        </>
    );
};

export default SignupHome;
