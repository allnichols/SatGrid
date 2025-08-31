export type SatelliteMeta = {
      satellite_id: number;
      timestamp: string;
      latitude: number;
      longitude: number;
      altitude_km: number;
      velocity_kms: number | undefined;
      object_name: string;
      norad_cat_id: string;
      sub_category: string;
      category: string;
      inclination: number;
      ra_of_asc_node: number;
      eccentricity: number;
      arg_of_pericenter: number;
      mean_anomaly: number;
      mean_motion: number;
  };