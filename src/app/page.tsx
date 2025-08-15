'use client'
import { useGetSatellitePositionsQuery } from "@/services/api";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedId } from "@/lib/satelliteSlice";


export default function Home() {
  const { data } = useGetSatellitePositionsQuery();
  const selectedId = useSelector((state: any) => state.satellite.selectedId);
  const dispatch = useDispatch();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
    </div>
  );
}
