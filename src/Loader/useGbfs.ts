import React, {useEffect, useState} from "react"

import GBFSEntity from "../Types/GBFS/GBFSEntity";
import Gbfs, {rawGbfs} from "../Types/GBFS/Gbfs";

type Response<T> = {
    status: number,
    data?: GBFSEntity<T>
}

const fetchData = async <T> (endpoint: string) : Promise<Response<T>> => {
    if (!endpoint) return { status: -1};

    try {
        const response = await fetch(endpoint);
        const data: GBFSEntity<T> = await response.json();
        return {status: response.status, data: data}
    } catch (exception) {
        console.error(exception);
        return { status: -1};
    }

}

const useGbfs = (endpoint: string) => {
    const [gbfs, setGbfs] = useState<Gbfs | null>(null);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        const fetchGbfs = async () => {
            setLoading(true);
            const res = await fetchData<rawGbfs>(endpoint);
            setStatus(res.status);

            let feeds = new Map<string, Map<string, string>>();
            let availableLanguages: string[] = [];

            // Loading available languages 
            if (res.status >= 0 ) {
                availableLanguages = Object.keys(res.data?.data!);
                if (availableLanguages !== null && availableLanguages.length > 0){
                    availableLanguages.forEach((lang)=>{
                        feeds.set(lang, new Map<string, string>());
                        res.data?.data[lang].feeds.forEach((feed)=>{
                            feeds.get(lang)?.set(feed.name, feed.url);
                        })
                    });
                }
            }

            // Loading GBFS
            if (availableLanguages.length! > 0 && feeds.has(availableLanguages[0])) {
                const defaultFeed = feeds.get(availableLanguages[0]);

                let systemInformations: SystemInformation;
                let stationInformations: StationInformation;
                let stationStatus: Map<string, GbfsStationStatus>;

                let minLat = 500, minLon = 500, maxLat = -500, maxLon = -500;
                
                // system information
                if (defaultFeed?.has("system_information")) {
                    const siRes = await fetchData<SystemInformation>(defaultFeed.get("system_information")!);
                    systemInformations = siRes?.data?.data!;
                }

                // station information
                if (defaultFeed?.has("station_information")) {
                    const siRes = await fetchData<StationInformation>(defaultFeed.get("station_information")!);
                    siRes.data?.data.stations.forEach((st)=>{
                        if (st.lat < minLat) minLat = st.lat;
                        if (st.lat > maxLat) maxLat = st.lat;
                        if (st.lon < minLon) minLon = st.lon;
                        if (st.lat > maxLon) maxLon = st.lon;
                    });
                    if (defaultFeed?.has("station_status")) {
                        const sStatusRes = await fetchData<StationStatus>(defaultFeed.get("station_status")!);
                        if (sStatusRes.data?.data.stations.length! > 0){
                            const stationStatusMapping: Map<string, GbfsStationStatus> = new Map<string, GbfsStationStatus>();
                            sStatusRes.data?.data.stations.forEach((st)=>{
                                stationStatusMapping.set(st.station_id, st!);
                            })
                            stationStatus = stationStatusMapping!;
                        }
                    }
                    stationInformations = siRes?.data?.data!;
                }
                
                setGbfs({
                    languages: availableLanguages,
                    feeds: feeds,
                    systemInformations: systemInformations!,
                    stationInformations: stationInformations!,
                    stationStatus: stationStatus!,
                    mapBounds: [[minLat, minLon], [maxLat, maxLon]]
                });
            }

            setTimeout(()=>{
                setLoading(false);
            }, 500);
        }

        fetchGbfs();
        
    }, [endpoint]);

    return {loading, status, gbfs};
}

export default useGbfs;