# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## NOTICE

this is a template for remix + vite, try to explore Remix.

+ **light/dark** theme.
+ **i18n** (remix-i18next) cached in session.
+ cheap **responsive ui** for header and home page.

## Next plan

after this exploration, I found something I want to build:

1. Remix + Sqlite + Prisma + TailwindCSS + Light/Dark Theme + i18n + ResponsiveUI
2. Editor: Web/Electron Editor App for syncing markdown files
3. BlogSite: Post, HomePage, Tags, Search
4. Monorepo

heavy client-side editor feature is challenging

## Development

Run the Express server with Vite dev middleware:

```shellscript
pnpm run dev
```

## Deployment

### config your site

1. config your site info in `app/site.ts`

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

## Links

https://dev.to/chrisbenjamin/tutorial-add-sitemapxml-and-robotstxt-to-remix-site-4n23
https://www.mattstobbs.com/remix-dark-mode/#1-naive-dark-mode-switch
