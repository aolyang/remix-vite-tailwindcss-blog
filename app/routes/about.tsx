import { Link } from "@remix-run/react"
import { useTranslation } from "react-i18next"

export default function App() {
    const { t } = useTranslation()
    return (
        <h1>
            <Link to={"/"}>Home</Link> {"> about"}
            {t("welcome")}
        </h1>
    )
}
