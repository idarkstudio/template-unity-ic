import idlUsers from "./idls/Users";
import IdlGenesis from "./idls/Genesis";

export const canisters = {
  db_users: { canisterId: "mqblk-2aaaa-aaaam-ab64a-cai", idlFactory: idlUsers },
  genesis: { canisterId: "5btbh-2aaaa-aaaap-aaqga-cai", idlFactory: IdlGenesis },

};

export const canisterIds = [
  "mqblk-2aaaa-aaaam-ab64a-cai", // db_users
  "5btbh-2aaaa-aaaap-aaqga-cai" // genesis collection

];
