import { useContext } from "react";
import { ThemeContext } from "./themeDataProvider";

const useThemeContext = () => {
	return useContext(ThemeContext);
};

export default useThemeContext;
