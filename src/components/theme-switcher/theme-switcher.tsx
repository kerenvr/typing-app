import React from 'react';
import { useTheme } from '../../themes/ThemeContext';
import styles from './theme-switcher.module.css';

type Theme = 'blue' | 'pink' | 'green' | 'purple';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const themes: Theme[] = ['blue', 'pink', 'green', 'purple'];

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return (
        <div className={styles.themeSwitcher}>
            {themes.map((themeOption) => (
                <button 
                    key={themeOption} 
                    onClick={() => handleThemeChange(themeOption)} 
                    className={`${styles.btn} ${styles[themeOption]} ${theme === themeOption ? styles.active : ''}`}
                > 
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
