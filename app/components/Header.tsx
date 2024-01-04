import { site } from "@/site"

export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className={"p-4 w-full flex justify-center"}>
                <div className={"w-[48rem] flex justify-between"}>
                    <h1 className={"text-2xl"}>{site.title}</h1>
                    <ul className={"flex gap-4"}>
                        <li>Posts</li>
                        <li>Categories</li>
                        <li>About</li>
                    </ul>
                </div>
            </header>
            <hr />
            <main className={"w-[48rem] m-auto"}>{children}</main>
        </>
    )
}
