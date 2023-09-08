import { createContext, useContext, useState } from "react";

const Context = createContext({});


/**
 * Creates a ThemeProvider component that wraps its children with a Context.Provider.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {JSX.Element} props.children - The children to be wrapped by the ThemeProvider.
 * @return {JSX.Element} The wrapped children with the Context.Provider.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider>
  );
}

/**
 * 
 * @returns {import("react").ServerContextJSONValue} 
 */
export function useThemeContext() {
  return useContext(Context);
}
