"use client"; 
import styles from './signup.module.css';
import { SignUp } from '@clerk/nextjs'

const SignupHome = () => {

    return (
        <>
        <div className={styles.container}>
            <SignUp routing="hash" />   
            <h1 className={styles.header}>Start now.</h1>    
        </div>
        </>
    );
};

export default SignupHome;
