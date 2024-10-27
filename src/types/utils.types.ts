import React from "react";

export type ThemeColors = "Zinc" | "Slate" | "Stone";

export type ThemeColorsStateParams = {
	themeColor: ThemeColors;
	setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
};
