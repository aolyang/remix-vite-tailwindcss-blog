import { useFetcher } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import { useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function LanguageToggleBtn() {
    const { i18n } = useTranslation()

    const persistLocale = useFetcher()
    const persistLocaleRef = useRef(persistLocale)
    useEffect(() => {
        persistLocaleRef.current = persistLocale
    }, [persistLocale])
    const changeLanguage = (lng: string) => async () => {
        await i18n.changeLanguage(lng)
        persistLocaleRef.current.submit(
            { locale: lng },
            {
                action: "action/set-locale",
                method: "post"
            }
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"} size={"icon"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.384 49.384 0 0 1 5.343.371a.75.75 0 1 1-.186 1.489a46.7 46.7 0 0 0-1.99-.206a18.67 18.67 0 0 1-2.97 6.323c.318.384.65.753 1 1.108a.75.75 0 0 1-1.07 1.05A18.902 18.902 0 0 1 9 13.688a18.823 18.823 0 0 1-5.656 4.482a.75.75 0 0 1-.688-1.333a17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.168 17.168 0 0 0 2.391-5.165a48.04 48.04 0 0 0-8.298.307a.75.75 0 0 1-.186-1.489a49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25M15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 1 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9m-2.672 8.25h5.344l-2.672-5.726z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className={"p-0"}>
                    <Button variant={"link"} onClick={changeLanguage("en")}>
                        English
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className={"p-0"} onClick={changeLanguage("zh")}>
                    <Button variant={"link"}>简体中文</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
