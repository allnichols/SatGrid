export type TSatellite = {
    object_name: string;
    tle_line1: string;
    tle_line2: string;
    category: string;
    subcategory?: string;
};


export type SatelliteMeta = {
    id: number;
    object_id: string;
    object_name: string;
    norad_cat_id: number;
    tle_line1: string;
    tle_line2: string;
    category: string;
    sub_category: string;
    classification_type: string;
    epoch: string;
    element_set_no: number;
    inclination: number;
    ra_of_asc_node: number;
    eccentricity: number;
    arg_of_pericenter: number;
    mean_anomaly: number;
    mean_motion: number;
    mean_motion_dot: number;
    mean_motion_ddot: number;
    rev_at_epoch: number;
    ephemeris_type: number;
    bstar: number;
};
