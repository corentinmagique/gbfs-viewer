interface GBFSEntity<T> {
    last_updated: number,
    ttl: number,
    version: string,
    data: T
}

export default GBFSEntity;