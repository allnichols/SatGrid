import SearchBar from "@/components/header/search-bar";


export default function HeaderToolbar() {
    return (
        <div className="absolute top-4 md:left-4 z-10">
            <SearchBar />
        </div>
    )
}