import { socialIcons, socials } from "@/constants/socials"

export default function Socials() {
    return (
        <>
            {socials.map((social) => {
                const iconHTML = socialIcons[social.name]
                return (
                    <a
                        href={social.href}
                        key={social.name}
                        dangerouslySetInnerHTML={{
                            __html: iconHTML
                        }}
                    ></a>
                )
            })}
        </>
    )
}
