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

        const fetchingData = async () => {
            setLoading(true);
            const res = await fetchData<rawGbfs>(endpoint);
            setStatus(res.status);
            if (res.status >= 0 ) {
                const availableLanguages = Object.keys(res.data?.data!);
                if (availableLanguages !== null && availableLanguages.length > 0){
                    const feeds = new Map<string, Map<string, string>>();
                    availableLanguages.forEach((lang)=>{
                        feeds.set(lang, new Map<string, string>());
                        res.data?.data[lang].feeds.forEach((feed)=>{
                            feeds.get(lang)?.set(feed.name, feed.url);
                        })
                    });
                    setGbfs({data: feeds});
                }
            }
            setLoading(false);
        }

        fetchingData();
        
    }, [endpoint]);

    return {loading, status, gbfs};
}

export default useGbfs;