import { useFetch } from "../hooks/useFetch"
import { loadData } from "./MoviesContainer/MoviesContainer"
type RelatedProps = {
    url: string,
}
const Related = ({ url }: RelatedProps) => {
    const { related, isLoading } = useFetch(url)
    return (
        <div className="mt-3">
            <h4>Related Movies</h4>
            <div className="row ">
                {
                    !isLoading &&
                    loadData(related)
                }
            </div>
        </div>
    )
}

export default Related
