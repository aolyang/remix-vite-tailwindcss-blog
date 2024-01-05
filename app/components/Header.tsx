import "@/styles/header.scss"

import { Link, useLocation } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import { clsx } from "clsx"
import { type ReactNode } from "react"

import { site } from "@/site"

const navs = ["posts", "tags", "categories", "about"]
export default function Header({ children }: { children: ReactNode }) {
    const { t } = useTranslation()
    const location = useLocation()
    return (
        <>
            <header className={"nav-header p-8 w-full flex justify-center"}>
                <div className={"w-[48rem] flex justify-between"}>
                    <h1 className={"text-2xl tracking-wide font-medium"}>
                        <Link to={"/"}>{site.title}</Link>
                    </h1>
                    <ul className={"flex gap-8"}>
                        {navs.map((nav) => (
                            <li
                                key={nav}
                                className={clsx({
                                    active: location.pathname.startsWith(`/${nav}`)
                                })}
                            >
                                <Link to={`/${nav}`}>{t(nav)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <main className={"w-[48rem] m-auto"}>
                <hr />
                {children}
            </main>
        </>
    )
}
