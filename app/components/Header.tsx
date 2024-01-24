import "@/styles/header.scss"

import { Link, useLocation } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import { clsx } from "clsx"
import { type ReactNode, useState } from "react"

import LanguageToggleBtn from "@/components/LanguageToggleBtn"
import MenuNavsToggleBtn from "@/components/MenuNavsToggleBtn"
import ThemeToggleBtn from "@/components/ThemeToggleBtn"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { site } from "@/site"

const navs = ["posts", "tags", "categories", "about"]
export default function Header({ children }: { children: ReactNode }) {
    const { t } = useTranslation()
    const location = useLocation()

    const [open, setOpen] = useState(false)

    return (
        <>
            <header className={"nav-header p-8 w-full flex justify-center"}>
                <div
                    className={
                        "w-full md:w-[48rem] flex justify-between gap-2 sm:gap-8 items-center"
                    }
                >
                    <h1 className={"text-2xl mr-auto tracking-wide font-medium"}>
                        <Link to={"/"}>{site.title}</Link>
                    </h1>
                    <div className={"hidden sm:inline-flex gap-8"}>
                        {navs.map((nav) => (
                            <div
                                key={nav}
                                className={clsx("nav-item hover:text-primary", {
                                    active: location.pathname.startsWith(`/${nav}`)
                                })}
                            >
                                <Link to={`/${nav}`}>{t(nav)}</Link>
                            </div>
                        ))}
                    </div>
                    <LanguageToggleBtn />
                    <ThemeToggleBtn />
                    <div className={"sm:hidden"}>
                        <MenuNavsToggleBtn open={open} setOpen={setOpen}>
                            <DropdownMenuContent>
                                {navs.map((nav) => (
                                    <DropdownMenuItem
                                        key={nav}
                                        className={clsx("nav-item hover:text-primary", {
                                            active: location.pathname.startsWith(`/${nav}`)
                                        })}
                                    >
                                        <Link to={`/${nav}`}>{t(nav)}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </MenuNavsToggleBtn>
                    </div>
                </div>
            </header>
            <main className={"w-full px-4 md:px-0 md:w-[48rem] mx-auto"}>
                <hr />
                {children}
            </main>
        </>
    )
}
