import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Hero from "@/components/layout/Hero"

type Props = {
    children: React.ReactNode
    showHero: boolean
}

const LayoutDesktop = ({ children, showHero }: Props) => {
    return (
        < div className="flex flex-col min-h-screen" >
            <Header />
            {showHero && <Hero />}
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer />
        </div >

    )
}

export default LayoutDesktop