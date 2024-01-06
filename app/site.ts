export type Site = {
    title: string
    description: string
    keywords: string
    website: string
    github: string
    lastModTime: string
}

export const site: Site = {
    title: "Remix Blog", // default site title, root.tsx
    description: "Remix Blog Template",
    keywords:
        "remix, react, typescript, blog, template, starter, tailwindcss," +
        "markdown, md, mdx, express, fullstack," +
        "SEO, seo, rss, remix blog",
    website: "https://example.app/",
    github: "https://github.com/aolyang/remix-vite-tailwindcss-blog.git",
    lastModTime: new Date().toISOString()
}
