import React, { createContext, ReactNode, useCallback, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

export interface IThemeContextData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeContext = createContext<IThemeContextData>(
  {} as IThemeContextData
);

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<DefaultTheme>(dark); //Using light as default

  const toggleTheme = useCallback(() => {
    setTheme(theme === light ? dark : light);
  }, [theme]);

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};