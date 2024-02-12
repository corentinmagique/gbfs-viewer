interface StationInformation {
    stations: GbfsStation[]
}

interface StationStatus {
    stations: GbfsStationStatus[]
}

interface GbfsStation {
    station_id: string,
    name: string,
    short_name:? string,
    lat: number,
    lon: number,
    address:? string,
    cross_street:? string,
    region_id:? string,
    post_code:? string,
    rental_method: any,
    is_virtual_station: ?boolean,
    station_area: ?object,
    capacity:? number,
    vehicle_capacity:? object,
    is_valet_station:? boolean
}

interface GbfsStationStatus {
    station_id: string,
    num_bikes_available: number,
    is_installed: boolean,
    is_renting: boolean,
    is_returning: boolean,
    last_reported: number,
    vehicle_docks_available:? GbfsVehicleAvailable[]
}

interface GbfsVehicleAvailable {
    vehicle_type_ids: string[],
    count: number
}

