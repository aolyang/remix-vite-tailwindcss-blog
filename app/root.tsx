import "./tailwind.css"

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

import i18nextServer from "@/services/i18next.server"
import { site } from "@/site"

import Header from "./components/Header"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const locale = await i18nextServer.getLocale(request)
    return json({ locale: locale })
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

export default function App() {
    // Get the locale from the loader
    const { locale } = useLoaderData<typeof loader>()

    const { i18n } = useTranslation()

    // This hook will change the i18n instance language to the current locale
    // detected by the loader, this way, when we do something to change the
    // language, this locale will change and i18nextServer will load the correct
    // translation files
    useChangeLanguage(locale)
    return (
        <html lang={locale} dir={i18n.dir()}>
            <head>
                <title>{site.title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
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
