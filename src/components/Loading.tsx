type LoadingProps = {
    height?: string
}
const Loading = ({ height }: LoadingProps) => {
    return (
        <div className="m-auto d-flex justify-content-center align-items-center text-danger" style={{ width: "fit-content", height: `${height ? height : "80vh"}` }} >
            <div className="spinner-border" role="status">
                <span className="visually-hidden text-danger">Loading...</span>
            </div>
        </div >
    )
}

export default Loading
