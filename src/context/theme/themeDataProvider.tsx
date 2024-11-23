import { createContext, useEffect, useState } from "react";
import { ThemeColors, ThemeColorsStateParams } from "@/types/utils.types";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import setGlobalColorTheme from "@/lib/themeColors";

export const ThemeContext = createContext<ThemeColorsStateParams>(
	{} as ThemeColorsStateParams
);

const ThemeDataProvider = ({ children }: ThemeProviderProps) => {
	const getSavedThemeColor = () => {
		try {
			return (
				(localStorage.getItem("themeColor") as ThemeColors) || "Violet"
			);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return "Violet" as ThemeColors;
		}
	};

	const [themeColor, setThemeColor] = useState<ThemeColors>(
		getSavedThemeColor() as ThemeColors
	);
	const [isMounted, setIsMounted] = useState(false);
	const { theme } = useTheme();

	useEffect(() => {
		localStorage.setItem("themeColor", themeColor);
		setGlobalColorTheme(theme as "light" | "dark", themeColor);

		if (!isMounted) {
			setIsMounted(true);
		}
	}, [themeColor, theme, isMounted]);

	if (!isMounted) {
		return null;
	}

	return (
		<ThemeContext.Provider value={{ themeColor, setThemeColor }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeDataProvider;
