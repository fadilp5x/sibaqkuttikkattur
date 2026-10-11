import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type FestivalTheme = 'festival' | 'calm';

interface ThemeContextValue {
  theme: FestivalTheme;
  setTheme: (t: FestivalTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'festival',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<FestivalTheme>(() => {
    const saved = localStorage.getItem('sibaq_festival_theme');
    return saved === 'calm' ? 'calm' : 'festival';
  });

  const setTheme = (t: FestivalTheme) => {
    setThemeState(t);
    localStorage.setItem('sibaq_festival_theme', t);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-festival-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
