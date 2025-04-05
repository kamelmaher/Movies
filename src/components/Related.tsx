import { loadData } from "../hooks/loadData"
import { useFetch } from "../hooks/useFetch"
import { MovieType } from "../types/MovieType"
import Loading from "./Loading"
type RelatedProps = {
    url: string,

}
const Related = ({ url }: RelatedProps) => {
    const related = useFetch<MovieType[]>(url, {}, (data) => {
        if (url.includes("person")) return data.cast
        else return data.results
    })
    if (related.isLoading) return <Loading />
    if (related.error) return <h1>Error</h1>
    return (
        <div className="mt-3">
            <h4>Related Movies</h4>
            <div className="row">
                {
                    loadData(related.data)
                }
            </div>
        </div >
    )
}

export default Related
