import { type InitOptions } from "i18next"

export default {
    supportedLngs: ["en", "zh"],
    fallbackLng: "en",
    defaultNS: "common",
    react: { useSuspense: false }
} satisfies InitOptions
