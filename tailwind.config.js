/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/components/*.{js,vue,ts}",
        "./src/pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./src/App.vue",
    ],
    theme: {
        extend: {},
    },
    darkMode: 'selector',
    plugins: [],
}