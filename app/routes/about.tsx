import { useTranslation } from "react-i18next"
import { Link } from "@remix-run/react"

export default function App() {
    const { t } = useTranslation()
    return (
        <h1>
            <Link to={"/"}>Home</Link> {"> about"}
            {t("welcome")}
        </h1>
    )
}
