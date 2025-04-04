const Loading = () => {
    return (
        <div className="m-auto d-flex justify-content-center align-items-center" style={{ width: "fit-content", height: "80vh" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading
