import { site } from "@/site"

export const loader = async () => {
    const content = `
    User-agent: Googlebot
    Disallow: /nogooglebot/
    
    User-agent: *
    Allow: /
    
    Sitemap: ${new URL("sitemap-index.xml", site.website).href}
    `.trim()

    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "text/plain"
        }
    })
}
