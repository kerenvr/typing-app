import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const radius = 45; // Radius of the circle
    const normalizedRadius = radius - 5; // Adjust for stroke width
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg height="100" width="100">
            <circle
                stroke="#e0e0e0"
                fill="transparent"
                strokeWidth="5"
                r={normalizedRadius}
                cx="50"
                cy="50"
            />
            <circle
                stroke="#4caf50"
                fill="transparent"
                strokeWidth="5"
                r={normalizedRadius}
                cx="50"
                cy="50"
                strokeDasharray={circumference + ' ' + circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill="#4caf50">
                {progress}%
            </text>
        </svg>
    );
};

export default ProgressBar;
