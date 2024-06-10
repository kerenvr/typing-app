import styles from './hero.module.css';
import Image from 'next/image';
import { TiKeyboard } from "react-icons/ti";

interface HeroProps {
    title: string;
    description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                <h1>{title}</h1>
                </div>
                <p className={styles.desc}>{description}</p>
            </div>
            <button className="btn outline px-6 py-2 text-white rounded-full text-md font-semibold flex justify-center items-center space-x-3">
            <TiKeyboard className="w-10 h-10" />
            <div>Start Typing</div>
            </button>
        </div>
    );
};

export default Hero;