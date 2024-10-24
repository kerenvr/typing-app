import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'blue' | 'pink' | 'green' | 'purple'; // Update the type

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void; // Allow setting a specific theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('blue'); // Default to one of your themes

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
