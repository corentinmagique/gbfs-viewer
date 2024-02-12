interface rawGbfs {
    [key: string]: GbfsFeed
}

interface Gbfs {
    languages?: string[],
    feeds: Map<string, Map<string, string>>,
    systemInformations: SystemInformation,
    stationInformations: StationInformation,
    stationStatus: Map<string, GbfsStationStatus>,
    mapBounds: number[number[]]
}

interface GbfsFeed {
    feeds: GbfsFeedInfos[]
}

interface GbfsFeedInfos {
    name: string,
    url: string
}

export default Gbfs;
export {rawGbfs};