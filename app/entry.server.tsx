import { resolve } from "node:path"

import { createReadableStreamFromReadable, type EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import Backend from "i18next-fs-backend"
import { createInstance } from "i18next"
import { I18nextProvider, initReactI18next } from "react-i18next"

import isBot from "isbot"
import { renderToPipeableStream } from "react-dom/server"
import { PassThrough } from "stream"

import i18nextServer from "@/services/i18next.server"

import i18n from "./i18n" // your i18n configuration file

const ABORT_DELAY = 5000

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const callbackName = isBot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady"

    const instance = createInstance()
    const lng = await i18nextServer.getLocale(request)
    const ns = i18nextServer.getRouteNamespaces(remixContext)

    await instance
        .use(initReactI18next)
        .use(Backend)
        .init({
            ...i18n,
            lng,
            ns,
            backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") }
        })

    return new Promise((resolve, reject) => {
        let didError = false

        const { pipe, abort } = renderToPipeableStream(
            <I18nextProvider i18n={instance}>
                <RemixServer context={remixContext} url={request.url} />
            </I18nextProvider>,
            {
                [callbackName]: () => {
                    const body = new PassThrough()

                    const stream = createReadableStreamFromReadable(body)
                    responseHeaders.set("Content-Type", "text/html")

                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode
                        })
                    )

                    pipe(body)
                },
                onShellError(error: unknown) {
                    reject(error)
                },
                onError(error: unknown) {
                    didError = true

                    console.error(error)
                }
            }
        )

        setTimeout(abort, ABORT_DELAY)
    })
}
