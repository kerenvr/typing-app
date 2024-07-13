"use client"; // Ensure this component is client-side

import { useRouter } from 'next/navigation'; // Use the new import path for useRouter
import styles from './hero.module.css';
import { TiKeyboard } from 'react-icons/ti';

interface HeroProps {
    title: string;
    description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
    const router = useRouter(); // Initialize useRouter

    const handleClick = () => {
        router.push('/typing'); // Redirect to /typing page
    };

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                </div>
                <p className={styles.desc}>{description}</p>
            </div>
            <button
                onClick={handleClick} // Add onClick handler
                className="btn outline bg-indigo-500 text-white px-6 py-2 rounded-full text-md font-semibold flex justify-center items-center space-x-3"
            >
                <div>Start Typing</div>
            </button>
        </div>
    );
};

export default Hero;
