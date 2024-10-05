type Props = {
    children: React.ReactNode
}


const LayoutMobile = ({ children }: Props) => {
    return (
        <div className="p-5">
            {children}
        </div>
    )
}

export default LayoutMobile