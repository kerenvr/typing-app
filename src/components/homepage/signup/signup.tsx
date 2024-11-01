"use client"; 
import Image from 'next/image';
import styles from './signup.module.css';
import { SignUp } from '@clerk/nextjs'

const SignupHome = () => {

    return (
        <>
        <div className={styles.container}>
        <Image 
                src="/signupgraphics.png" 
                alt="Hero Image" 
                width={1300} 
                height={1300} 
                className={styles.centeredImage} 
            />
            <SignUp routing="hash" />   
            <h1 className={styles.header}>Start now.</h1>    
        </div>
        </>
    );
};

export default SignupHome;
