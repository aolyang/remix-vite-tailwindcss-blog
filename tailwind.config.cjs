/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["app/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                sm: "640px"
            }
        }
    },
    plugins: [
        require("@tailwindcss/typography")
    ]
}
