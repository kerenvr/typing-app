// pages/Home.tsx
"use client"
import styles from "./home.module.css";
import Hero from '@/components/homepage/hero/hero';
import Demo from '@/components/homepage/demo/demo';
import Signup from "@/components/homepage/signup/signup";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();  // Get the current user object

  return (
    <main>
      <div className="mt-[200px] ml-[200px] mr-[200px]"> 
        <Hero title={"bloom type."} description={"Start your typing journey today and watch your skills flourish."} />
      </div>
      <Demo />
      {!user &&  <Signup />} 
    </main>
  );
}
