type HeaderProps = {
    text: string
    isActive: boolean
    handleClick: () => void
}

const HeaderLink = ({ text, isActive , handleClick }: HeaderProps) => {
    return (
        <li className={`nav-link text-white link ${isActive ? "active" : ""}`} onClick={handleClick}>
            <p className="mb-0">{text}</p>
        </li>
    )
}

export default HeaderLink
