import styles from './hero.module.css';
import Image from 'next/image';

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
            <button className="btn w-36 bg-stone-600 text-white  py-2 rounded-3xl text-xl">type now</button>
        </div>
    );
};

export default Hero;