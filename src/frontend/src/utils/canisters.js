import idlUsers from "./idls/Users";
import idlYumi from "./idls/Yumi";

export const canisters = {
  db_users: { canisterId: "mqblk-2aaaa-aaaam-ab64a-cai", idlFactory: idlUsers },
  genesis: { canisterId: "5btbh-2aaaa-aaaap-aaqga-cai", idlFactory: idlYumi },

};

export const canisterIds = [
  "mqblk-2aaaa-aaaam-ab64a-cai", // db_users
  "5btbh-2aaaa-aaaap-aaqga-cai" // genesis collection

];
