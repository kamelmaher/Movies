import { useFetch } from "../hooks/useFetch"
import { loadData } from "./MoviesContainer/MoviesContainer"
type RelatedProps = {
    url: string,

}
const Related = ({ url }: RelatedProps) => {
    console.log("Related URl:", url)
    const { related } = useFetch(url)
    return (
        <div className="mt-3">
            <h4>Related Movies</h4>
            {
                related.length > 0 ?
                    <div className="row">
                        {
                            loadData(related)
                        }
                    </div>
                    : <p className="text-danger">No Related Movies</p>
            }
        </div >
    )
}

export default Related
