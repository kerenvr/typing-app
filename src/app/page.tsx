// Home.tsx
import styles from "./home.module.css";
import Hero from '@/components/homepage/hero/hero';
import Demo from '@/components/homepage/demo/demo';
import Signup from "@/components/homepage/signup/signup";

export default function Home() {
  return (
        <main>
          <Hero title={"bloom type"} description={"Start your typing journey today and watch your skills flourish."} />
          <Demo />
          <Signup />
        </main>
  );
}

