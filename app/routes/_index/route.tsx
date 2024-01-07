import Intro from "@/routes/_index/Intro"

export default function Index() {
    return (
        <div>
            <Intro />
            <hr />
            <h1 className={"title mt-8 mb-4"}>Pinned posts</h1>
            <div>
                <p className={""}>Predefined color schemes</p>
            </div>
        </div>
    )
}
