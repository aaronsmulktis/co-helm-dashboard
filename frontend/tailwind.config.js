/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            textShadow: {
                sm: '0 1px 2px rgba(0,0,0,0.33)',
                DEFAULT: '0 2px 4px rgba(0,0,0,0.33)',
                lg: '0 8px 16px rgba(0,0,0,0.33)',
            },
            animation: {
                "spin-slow": "spin 3s linear infinite"
            },
            colors: {
                gray: {
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    200: "#E5E7EB",
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    500: "#6B7280",
                    600: "#4B5563",
                    700: "#374151",
                    800: "#1F2937",
                    900: "#111827"
                },
                pablo: {
                    50: "#CECBC5",
                    100: "#C5C1BA",
                    200: "#B2ADA3",
                    300: "#9F9A8D",
                    400: "#8D8677",
                    500: "#777164",
                    600: "#59544A",
                    700: "#3A3731",
                    800: "#1C1A17",
                    900: "#000000",
                    950: "#000000"
                }
            }
        }
    },
    plugins: []
};
