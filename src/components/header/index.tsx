import SearchBar from "@/components/header/search-bar";
import Toolbar from "@/components/header/toolbar";


export default function HeaderToolbar() {
    return (
        <div className="absolute top-4 left-4 z-10">
           <div className="bg-gray-900 bg-opacity-50 text-white p-2 rounded-md shadow-md">
                <SearchBar />

                <Toolbar />
           </div>
        </div>
        
    )
}