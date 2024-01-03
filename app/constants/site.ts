export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export const DefaultSite: Site = {
    website: "https://aolyang.me", // replace this with your deployed domain
    author: "Author Name",
    desc: "A minimal, responsive and SEO-friendly blog theme.",
    title: "Remix Blog",
    ogImage: "",
    lightAndDarkMode: true,
    postPerPage: 3
}
