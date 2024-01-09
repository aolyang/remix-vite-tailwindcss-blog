import { type ActionFunction, json } from "@remix-run/node"

import { getI18nSession } from "@/services/i18next.server"

export const action: ActionFunction = async ({ request }) => {
    const i18nSession = await getI18nSession(request)
    const requestText = await request.text()
    const form = new URLSearchParams(requestText)
    const locale = form.get("locale")

    if (!locale) {
        return new Response("locale is required", { status: 400 })
    }
    i18nSession.setLocale(locale)
    console.log("setLocale", locale)
    return json({ success: true }, { headers: { "Set-Cookie": await i18nSession.commit() } })
}
