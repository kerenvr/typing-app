import styles from './hero.module.css';
import Image from 'next/image';
import { TiKeyboard } from "react-icons/ti";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

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
                <p className={`${montserrat.className} ${styles.desc}`}>{description}</p>
            </div>

            <div className="relative inline-flex group">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <div className='relative inline-flex items-center justify-center space-x-4 px-8 py-2 text-lgtransition-all duration-200 font-pj bg-[var(--text)] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                        <TiKeyboard className="w-10 h-10 text-blue-100" />
                        <div className="select-none bg-gradient-to-r from-[#ceeeff] via-[#ffd3fb] to-[#ffb4b0] text-transparent bg-clip-text">start typing</div>
                    </div>
            </div>
        </div>
    );
};

export default Hero;