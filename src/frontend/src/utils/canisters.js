// import idlHallowEnd from "./idls/HallowEnd";
import idlMarketplace from "./idls/Marketplace";
import idlUsers from "./idls/Users";
import idlYumi from "./idls/Yumi";

export const canisters = {
  db_users: { canisterId: "v4xh6-viaaa-aaaap-qbboq-cai", idlFactory: idlUsers },
  baby_dragon: { canisterId: "v3wbk-yqaaa-aaaap-qbboa-cai", idlFactory: idlMarketplace },
  genesis: { canisterId: "5btbh-2aaaa-aaaap-aaqga-cai", idlFactory: idlYumi },
  purple_legion: { canisterId: "fvsni-daaaa-aaaah-adlzq-cai", idlFactory: idlYumi },
  // hallow_end: { canisterId: "srggp-uqaaa-aaaag-qaxua-cai", idlFactory: idlHallowEnd },

  // dark: { canisterId: "", idlFactory: idlYumi },
};

export const canisterIds = [
  "v4xh6-viaaa-aaaap-qbboq-cai", // db_users
  "v3wbk-yqaaa-aaaap-qbboa-cai", // baby dragon nft
  "5btbh-2aaaa-aaaap-aaqga-cai", // genesis nft
  "fvsni-daaaa-aaaah-adlzq-cai", // purple legion nft
  // "srggp-uqaaa-aaaag-qaxua-cai", // hallow end nft
  // "", // dark infinity nft
];
