"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import styles from "./statsPage.module.css"
import ProtectedRoute from '@/components/protected-route/protectedRoute';

function StatsPage() {
    const { isLoaded, user } = useUser();
    const [wpmRecords, setWpmRecords] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [averageWpm, setAverageWpm] = useState<number>(0);
    const [greatestWpm, setGreatestWpm] = useState<number>(0);

    interface CardProps {
        title: string;
        value: number;
    }

    const Card: React.FC<CardProps> = ({ title, value }) => {
        return (
            <div className={styles.cardContainer}>
                <h2 className={styles.header}>{title}</h2>
                <p className={styles.value}>{value}</p>
            </div>
        );
    }

    useEffect(() => {
        if (isLoaded && user) {
            const fetchWpmRecords = async () => {
                try {
                    const response = await fetch(`/api/wpm/?userid=${user.id}`);
                    if (!response.ok) {
                        const errorDetails = await response.json(); // Try to parse any error details from the response
                        throw new Error(`Error fetching WPM records: ${response.status} - ${response.statusText} ${errorDetails.message ? `: ${errorDetails.message}` : ''}`);
                    }
                    const data = await response.json();
                    setWpmRecords(data);

                    // get average
                    let totalWpm = data.reduce((previousValue: number, currentValue: { wpm: number }) => {
                        return previousValue + currentValue.wpm;
                    }, 0)
                    
                    let average = totalWpm / data.length;

                    setAverageWpm(average)

                    const max = Math.max(...data.map((item: { wpm: number }) => item.wpm))
                    setGreatestWpm(max)

                
                } catch (err) {
                    console.error("Error fetching WPM records:", err);
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("An unknown error occurred");
                    }
                }
            };

            fetchWpmRecords();

        }
    }, [isLoaded, user]);

    if (!isLoaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ProtectedRoute>
        <div className={styles.container}>
            <div className={styles.statsContainer}>
                <div>
                    <h1 className={styles.title}>Statistics</h1>
                    <p>Welcome back, {user?.username}</p>
                </div>
                <div className={styles.allCards}>
                    <Card title={"Average WPM"} value={averageWpm}/>
                    <Card title={"Greatest WPM"} value={greatestWpm}/>
                </div>
            </div>
            {/* <ul>
                {wpmRecords.map((record) => (
                    <li key={record.id}>
                        WPM: {record.wpm}, Difficulty: {record.difficulty}, Time: {record.time}
                    </li>
                ))}
            </ul> */}
        </div>
        </ProtectedRoute>
    );
}

export default StatsPage;
