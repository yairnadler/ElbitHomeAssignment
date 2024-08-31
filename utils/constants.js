export const PORT = 8080;
export const BASE_URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5`;

export const DEFAULT_LIMIT = 300;

// _id: record positive index
// CHOPER: flight Code
// CHFLTN: flight number
// CHOPERD: airline company
// CHSTOL: estimated departure time
// CHPTOL: real departure time
// CHAORD: gate
// CHLOC1: short version destination Airport
// CHLOC1D: full name destination airport
// CHLOC1TH: city Hebrew - name
// CHLOC1T: city English- name
// CHLOC1CH: country Hebrew - name
// CHLOCCT: country English - name
// CHTERM: TLV Terminal
// CHCINT: TLV check-in counter - if empty inbound flights else outbound flight
// CHCKZN: TLV check in zone - if empty inbound flights else outbound flight
// CHRMINE: status in English
// CHRMINH: status in Hebrew

export const ID = "_id";

export const FLIGHT_CODE = "CHOPER";
export const FLIGHT_NUMBER = "CHFLTN";

export const AIRLN_COMP = "CHOPERD";

export const EST_DEP_TIME = "CHSTOL";
export const DEP_TIME = "CHPTOL";
export const GATE = "CHAORD";

export const DEST_AIRPORT_SHORT = "CHLOC1";
export const DEST_AIRPORT_FULL = "CHLOC1D";

export const CITY_HEB = "CHLOC1TH";
export const CITY_ENG = "CHLOC1T";

export const COUNTRY_HEB = "CHLOC1CH";
export const COUNTRY_ENG = "CHLOCCT";

export const TLV_TERMINAL = "CHTERM";
export const TLV_CHECK_IN_COUNTER = "CHCINT";
export const TLV_CHECK_IN_ZONE = "CHCKZN";

export const STATUS_HEB = "CHRMINH";
export const STATUS_ENG = "CHRMINE";