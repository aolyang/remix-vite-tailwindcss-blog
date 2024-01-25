import { useTranslation } from "react-i18next"

import PostCard from "@/components/PostCard"

import Intro from "./Intro"

export default function Index() {
    const { t } = useTranslation()
    return (
        <div>
            <Intro />
            <hr />
            <h1 className={"title mt-8 mb-4"}>{t("featured")}</h1>
            <ul>
                <PostCard
                    title={"How to use Remix blog template"}
                    pubDatetime={"2024-01-25T16:41:25.458Z"}
                    href={"/"}
                    description={"here is the example to intro how to use this template"}
                />
            </ul>
        </div>
    )
}
