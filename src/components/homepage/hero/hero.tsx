"use client"; 

import styles from './hero.module.css';
import { Montserrat } from "next/font/google";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { useUser } from "@clerk/nextjs";

interface HeroProps {
    title: string;
    description: string;
}

const Hero: React.FC<HeroProps> = ({ title, description }) => {
    const { user } = useUser();  // Get the current user object
    const router = useRouter(); // Initialize the router

    const handleStartTyping = () => {
        if (!user) {
            router.push('/auth/sign-up'); // Navigate to /typing
        } else {
            router.push('/typing'); // Navigate to /typing
        }

    };

    return (
        <div className='flex w-full gap-x-20'>
            <div className={styles.container}>
                <div className={styles.textContainer}>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    <p className="text-3xl text-[var(--bubblegum)]">flourish your typing skills</p>
                <div className='flex gap-x-3 justify-start bg-slate- 200 w-full mt-32'>
                    <button className={styles.btn} onClick={handleStartTyping}>
                        {/* <svg viewBox="359.035925 222 483.964075 434" width="15" height="15" fill="#ffff"><path d=" M379.035925 465.000001 L438 465.000001 C438 465.000001, 448 465.000001, 448 455.000001 L448 410.999735 C448 410.999735, 448 400.999735, 438 400.999735 L381.02037 400.999735 C381.02037 400.999735, 371.02037 400.999735, 371.02037 390.999735 L371.02037 316.999735 C371.02037 316.999735, 371.02037 306.999735, 381.02037 306.999735 L437 306.999735 C437 306.999735, 447 306.999735, 447 296.999735 L447 242 C447 242, 447 232, 457 232 L529 232 C529 232, 539 232, 539 242 L539 290.074103 C539 290.074103, 539 300.074103, 549 300.074103 L591.929586 300.074103 C591.929586 300.074103, 601.929586 300.074103, 601.929586 310.074103 L601.929586 348 C601.929586 348, 601.929586 358, 611.929586 358 L659 358 C659 358, 669 358, 669 348 L669 306 C669 306, 669 296, 679 296 L751 296 C751 296, 761 296, 761 306 L761 355 C761 355, 761 365, 771 365 L823 365 C823 365, 833 365, 833 375 L833 449 C833 449, 833 459, 823 459 L770 459 C770 459, 760 459, 760 469 L760 513 C760 513, 760 523, 750 523 L678 523 C678 523, 668 523, 668 513 L668 462 C668 462, 668 452, 658 452 L601 452 C601 452, 591 452, 591 442 L591 404.074103 C591 404.074103, 591 394.074103, 581 394.074103 L550 394.074103 C550 394.074103, 540 394.074103, 540 404.074103 L540 450 C540 450, 540 460, 550 460 L592 460 C592 460, 602 460, 602 470 L602 544 C602 544, 602 554, 592 554 L559 554 C559 554, 549 554, 549 564 L549 636 C549 636, 549 646, 539 646 L467 646 C467 646, 457 646, 457 636 L457 569.000001 C457 569.000001, 457 559.000001, 447 559.000001 L379.035925 559.000001 C379.035925 559.000001, 369.035925 559.000001, 369.035925 549.000001 L369.035925 475.000001 C369.035925 475.000001, 369.035925 465.000001, 379.035925 465.000001, M461.035925 485 L461.035925 542 C461.035925 542, 461.035925 552, 471.035925 552 L500 552 C500 552, 510 552, 510 542 L510 485 C510 485, 510 475, 500 475 L471.035925 475 C471.035925 475, 461.035925 475, 461.035925 485, M463.02037 336 L463.02037 371 C463.02037 371, 463.02037 381, 473.02037 381 L499.929586 381 C499.929586 381, 509.929586 381, 509.929586 371 L509.929586 336 C509.929586 336, 509.929586 326, 499.929586 326 L473.02037 326 C473.02037 326, 463.02037 326, 463.02037 336, M683 400 L683 419 C683 419, 683 429, 693 429 L731 429 C731 429, 741 429, 741 419 L741 400 C741 400, 741 390, 731 390 L693 390 C693 390, 683 390, 683 400"></path></svg>             */}
                        <p>start typing</p>
                    </button>

                </div>
                </div>
            </div>
                <div className="w-3/4">
                    <div className="bg-slate-700 flex items-center justify-center ">
                    <Image 
                        src="/garden.png" 
                        alt="Typing image"  
                        width={600}
                        height={600}
                        quality={100}
                    />
                </div>
            </div>

        </div>
    );
};

export default Hero;
