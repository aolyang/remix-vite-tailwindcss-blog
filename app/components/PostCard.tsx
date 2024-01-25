import { Link } from "@remix-run/react"

import Datetime, { type DatetimeProps } from "@/components/Datetime"

type Props = DatetimeProps & {
    title: string
    description: string
    href: string
}
export default function PostCard(props: Props) {
    return (
        <li>
            <Link
                to={props.href}
                className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
            >
                <h1>{props.title}</h1>
            </Link>
            <Datetime pubDatetime={props.pubDatetime} modDatetime={props.modDatetime} />
            <p>{props.description}</p>
        </li>
    )
}
