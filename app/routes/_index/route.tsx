import RssLink from "@/components/RssLink"
import Socials from "@/components/Socials"
import { site } from "@/site"

export default function Index() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <div className={"flex gap-2 items-end pt-12 pb-8"}>
                <h1 className={"text-5xl tracking-wide font-medium"}>Balagalagala</h1>
                <div className={"fill-blue-700"}>
                    <RssLink />
                </div>
            </div>
            <p>
                RemixBlog is a minimal, responsive, accessible and and SEO-friendly open source blog
                template repo. This theme follows best practices and provides accessibility out of
                the box. Light and dark mode are supported by default. Moreover, additional color
                schemes can also be configured.
            </p>
            <p>
                Read the blog posts or check
                <a className={"mx-2 underline decoration-dashed"} href={site.github}>
                    README
                </a>
                for more info.
            </p>
            <p className={"my-3 gap-2 flex items-center"}>
                Social Links: <Socials />
            </p>
            <hr />
            <h1 className={"title mt-8 mb-4"}>Pinned posts</h1>
            <div>
                <p className={""}>Predefined color schemes</p>
            </div>
        </div>
    )
}
