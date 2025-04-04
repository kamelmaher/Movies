import { useFetch } from "../hooks/useFetch"
import Loading from "./Loading"
import { loadData } from "./MoviesContainer/MoviesContainer"
type RelatedProps = {
    url: string,
}
const Related = ({ url }: RelatedProps) => {
    const { related, isLoading } = useFetch(url)
    return (
        <div className="mt-3">
            <h4>Related Movies</h4>
            {
                !isLoading ?
                    related.length > 0 ?
                        <div className="row">
                            {
                                loadData(related)
                            }
                        </div>
                        : <p className="text-danger">No Related Movies</p>
                    : <Loading />
            }

        </div >
    )
}

export default Related
