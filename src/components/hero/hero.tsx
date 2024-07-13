import styles from './hero.module.css';
import Image from 'next/image';
import { TiKeyboard } from "react-icons/ti";
import { Merriweather } from "next/font/google";
const merriweatherMerriweather = Merriweather({ 
    subsets: ["latin"],
    weight: ["300", "400", "700"],

});

const Hero = ()  => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    <h1>Bloom Type</h1>
                </div>
                <p className={`${merriweatherMerriweather.className} ${styles.desc}`}>start typing today and watch your skills flourish.</p>
            </div>

            <button className="flex space-x-2 px-5 py-2 rounded-md font-bold text-white lowercase bg-indigo-500">
                {/* <TiKeyboard className="w-6 h-6" /> */}
                <span>Start Now</span>
            </button>
        </div>
    );
};

export default Hero;