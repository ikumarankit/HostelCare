import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

function applyThemeClass(isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
    localStorage.setItem('hostelcare_theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('hostelcare_theme', 'light');
  }
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const isDark = localStorage.getItem('hostelcare_theme') === 'dark';
    applyThemeClass(isDark);
    return isDark;
  });

  useEffect(() => {
    applyThemeClass(darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default ThemeContext;
