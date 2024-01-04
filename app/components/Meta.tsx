import { site as SITE } from "@/site"

const googleSiteVerification = import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION

type Props = {
    title?: string
    author?: string
    description?: string
    ogImage?: string
    canonicalURL?: string
    pubDatetime?: Date
    modDatetime?: Date
}
export default function Meta(props: Props) {
    const {
        title = SITE.title,
        author = SITE.author,
        description = SITE.desc,
        canonicalURL = "",
        pubDatetime,
        modDatetime
    } = props
    // TODO
    const socialImageURL = ""

    // TODO content, empty string
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width" />
            <link rel="icon" type="image/svg+xml" href="" />
            <link rel="canonical" href={canonicalURL} />
            <meta name="generator" content={""} />

            {/* General Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            <link rel="sitemap" href="" />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalURL} />
            <meta property="og:image" content={socialImageURL} />

            {/* Article Published/Modified time */}
            {pubDatetime && (
                <meta property="article:published_time" content={pubDatetime.toISOString()} />
            )}
            {modDatetime && (
                <meta property="article:modified_time" content={modDatetime.toISOString()} />
            )}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalURL} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={socialImageURL} />

            {/* Google Font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
                rel="stylesheet"
            />

            <meta name="theme-color" content="" />

            {
                // If PUBLIC_GOOGLE_SITE_VERIFICATION is set in the environment variable,
                // include google-site-verification tag in the heading
                // Learn more: https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag
                googleSiteVerification && (
                    <meta name="google-site-verification" content={googleSiteVerification} />
                )
            }
        </>
    )
}