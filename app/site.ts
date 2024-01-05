export type Site = {
    title: string
    description: string
    keywords: string
    github: string
}

export const site: Site = {
    title: "Remix Blog", // default site title, root.tsx
    description: "Remix Blog Template",
    keywords:
        "remix, react, typescript, blog, template, starter, tailwindcss," +
        "markdown, md, mdx, express, fullstack," +
        "SEO, seo, rss, remix blog",
    github: "https://github.com/aolyang/remix-vite-tailwindcss-blog.git"
}
