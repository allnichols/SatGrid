export type SatellitePosition = {
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
  };