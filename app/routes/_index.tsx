import { Link, Outlet } from "@remix-run/react"
import { useTranslation } from "react-i18next"

export default function Index() {
    const { t, i18n } = useTranslation()

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1 className={"text-red-500"}>{t("welcome")} to Remix</h1>
            <button
                onClick={() => {
                    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
                }}
            >
                language to: {i18n.language}
            </button>
            <br />
            <Link to={"/about"}>About</Link>
            <ul>
                <li>
                    <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
                        15m Quickstart Blog Tutorial
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
                        Deep Dive Jokes App Tutorial
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                        Remix Docs
                    </a>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}
