import MainNav from "@/components/navigation/MainNav"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="p-5 space-y-5 relative ">
            <MainNav />
            <main className="sm:max-w-4xl sm:mx-auto">
                {children}
            </main>
        </div>
    )
}

export default Layout
