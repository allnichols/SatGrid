
type ResultProps = {
    results: Array<{ object_name: string, category?: string }>
}

export default function Results({ results }: ResultProps) {
    return (
        <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto max-h-60">
            {results.map(result => {
                return (
                    <li
                        key={result.object_name}
                        className="list-row flex hover:bg-base-300"
                    >
                        <div>
                            <div>{result.object_name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{result.category}</div>
                        </div>

                    </li>
                )
            })}
        </ul>
    )
}