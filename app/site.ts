export type Site = {
    title: string
    website: string
    author: string
    desc: string
    ogImage?: string
    lightAndDarkMode: boolean
    postPerPage: number
}

export const site: Site = {
    title: "Remix Blog", // default site title, root.tsx
    website: "https://aolyang.me", // replace this with your deployed domain
    author: "Author Name",
    desc: "A minimal, responsive and SEO-friendly blog theme.",
    ogImage: "",
    lightAndDarkMode: true,
    postPerPage: 3
}
