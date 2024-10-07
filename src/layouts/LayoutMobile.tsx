type Props = {
    children: React.ReactNode
}


const LayoutMobile = ({ children }: Props) => {
    return (
        <div className="p-5 relative">
            {children}
        </div>
    )
}

export default LayoutMobile