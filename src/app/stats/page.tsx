"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";

function StatsPage() {
    const { isLoaded, user } = useUser();
    const [wpmRecords, setWpmRecords] = useState([]);
    const [error, setError] = useState(null);
    const [averageWpm, setAverageWpm] = useState<number>(0);
    const [greatestWpm, setGreatestWpm] = useState<number>(0);

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
                    let totalWpm = data.reduce((previousValue: number, currentValue: number) => {
                        return previousValue + currentValue.wpm;
                    }, 0)
                    
                    let average = totalWpm / data.length;

                    setAverageWpm(average)

                    const max = Math.max(...data.map(item => item.wpm))
                    setGreatestWpm(max)

                
                } catch (err) {
                    console.error("Error fetching WPM records:", err);
                    setError(err.message);
                }
            };

            fetchWpmRecords();

        }
    }, [isLoaded, user]);

    if (!isLoaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>WPM Records</h1>
            <h2>Average Wpm: {averageWpm}</h2>
            <h2>Greatest Wpm: {greatestWpm}</h2>
            <ul>
                {wpmRecords.map((record) => (
                    <li key={record.id}>
                        WPM: {record.wpm}, Difficulty: {record.difficulty}, Time: {record.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StatsPage;