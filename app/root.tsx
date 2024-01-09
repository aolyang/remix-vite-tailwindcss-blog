import "@/styles/tailwind.css"
import "@/styles/base.css"

import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData
} from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { useChangeLanguage } from "remix-i18next"

import { clsx } from "clsx"

import Header from "@/components/Header"
import { type Theme, useTheme } from "@/providers/theme-context"
import { NonFlashOfWrongThemeEls, ThemeProvider } from "@/providers/theme-provider"
import i18nextServer, { getI18nSession, i18nCookie } from "@/services/i18next.server"
import { getThemeSession } from "@/services/theme.server"
import { site } from "@/site"

type LoaderData = {
    locale: string
    theme: Theme | null
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const locale = await i18nextServer.getLocale(request)
    const i18nSession = await getI18nSession(request)
    const themeSession = await getThemeSession(request)

    console.log("i18nSession", i18nSession.getLocale(), locale)
    return json(
        {
            locale: i18nSession.getLocale() || locale,
            theme: themeSession.getTheme()
        } satisfies LoaderData,
        {
            headers: {
                "Set-Cookie": await i18nCookie.serialize(locale)
            }
        }
    )
}

export const meta: MetaFunction = () => {
    return [
        {
            name: "description",
            content: site.description
        },
        {
            name: "keywords",
            content: site.keywords
        }
    ]
}

function App() {
    const theme = useTheme()

    const data = useLoaderData<typeof loader>()

    const { i18n } = useTranslation()

    // This hook will change the i18n instance language to the current locale
    // detected by the loader, this way, when we do something to change the
    // language, this locale will change and i18nextServer will load the correct
    // translation files
    useChangeLanguage(data.locale)
    console.log("data.locale from loader", data.locale, i18n.language)
    return (
        <html lang={data.locale} dir={i18n.dir()} className={clsx(theme)}>
            <head>
                <title>{site.title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="color-scheme"
                    content={data.theme === "light" ? "light dark" : "dark light"}
                />
                <Meta />
                <Links />
                <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
            </head>
            <body>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
                <Header>
                    <Outlet />
                </Header>
            </body>
        </html>
    )
}

export default function AppWithProviders() {
    const data = useLoaderData<LoaderData>()
    return (
        <ThemeProvider specifiedTheme={data.theme}>
            <App />
        </ThemeProvider>
    )
}
