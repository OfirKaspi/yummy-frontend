import MainNav from "@/components/navigation/MainNav"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="p-5 space-y-5 relative">
            <MainNav />
            {children}
        </div>
    )
}

export default Layout
