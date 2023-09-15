/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			poppins: ["Poppins", "serif"],
		},
		colors: {
			white: colors.white,
			blue: colors.blue,
			red: colors.red,
			pink: colors.pink,
			purple: colors.purple,
			primary: {
				50: "#f2fbf5",
				100: "#e2f6e8",
				200: "#badec5",
				300: "#99dcad",
				400: "#64c482",
				500: "#3da35d",
				600: "#2f8a4c",
				700: "#286d3e",
				800: "#245734",
				900: "#1f482d",
				950: "#0c2716",
			},
			neutral: {
				0: "#ffffff",
				50: "#f7f7f7",
				100: "#EFF0EE",
				600: "#cccccc",
				700: "#BBBBBB",
				900: "#292929",
			},
			gunmetal: "#2d3a3a",
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
