/** @type {import("tailwindcss").Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
    // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
        'bg-gray-100',
        'bg-yellow-500',
        'bg-kelp-500',
    ],
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
                },
                kelp: {
                    50: "#e5f2ec",
                    100: "#cce5da",
                    200: "#009e67",
                    300: "#008f5d",
                    400: "#008153",
                    500: "#037146",
                    600: "#026137",
                    700: "#024d2d",
                    800: "#013a23",
                    900: "#01271a"
                },
                red: {
                    50: "#FEE2E2",
                    100: "#FECACA",
                    200: "#FCA5A5",
                    300: "#F87171",
                    400: "#EF4444",
                    500: "#DC2626",
                    600: "#B91C1C",
                    700: "#991B1B",
                    800: "#7F1D1D",
                    900: "#702424"
                },
                yellow: {
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    200: "#FDE68A",
                    300: "#FCD34D",
                    400: "#FBBF24",
                    500: "#F59E0B",
                    600: "#D97706",
                    700: "#B45309",
                    800: "#92400E",
                    900: "#78350F"
                },
            }
        }
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
          matchUtilities(
            {
              'text-shadow': (value) => ({
                textShadow: value,
              }),
            },
            { values: theme('textShadow') }
          )
        }),
    ],
};
