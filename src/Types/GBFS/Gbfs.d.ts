interface rawGbfs {
    [key: string]: GbfsFeed
}

interface Gbfs {
    data: Map<string, Map<string, string>>
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