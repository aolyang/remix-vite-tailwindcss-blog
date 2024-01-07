import { site } from "@/site"

export const loader = async () => {
    const content = `
    <urlset xmlns="https://sitemaps.org/schemas/sitemap/0.9/">
        <url>
            <loc>${site.website}</loc>
            <lastmod>${site.lastModTime}</lastmod>
            <priority>1.0</priority>
        </url>
    </urlset>
    `
        .replace(/^\n/, "")
        .replace(/^ +/gm, "")

    // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "xml-version": "1.0",
            encoding: "UTF-8"
        }
    })
}
