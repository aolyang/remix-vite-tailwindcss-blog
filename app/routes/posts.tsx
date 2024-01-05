import { Link } from "@remix-run/react"
import { useTranslation } from "react-i18next"

export default function App() {
    const { t } = useTranslation()
    return (
        <h1>
            <Link to={"/"}>Home</Link> {"> posts"}
            {t("welcome")}
        </h1>
    )
}
