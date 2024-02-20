import { Principal } from "@dfinity/principal";
import { principalToAccountIdentifier } from "@dfinity/nns";

export const p = (principal) => Principal.fromText(principal);

export const currentRegion = (latitude, longitude) => {
  if (latitude >= -56 && latitude <= -20 && longitude >= -120 && longitude <= -35) {
    return "South America";
  } else if (latitude >= 24 && latitude <= 83 && longitude >= -168 && longitude <= -34) {
    return "North America";
  } else if (latitude >= 24 && latitude <= 45 && longitude >= -35 && longitude <= 65) {
    return "Europe";
  } else if (latitude >= -42 && latitude <= -10 && longitude >= 113 && longitude <= 153) {
    return "Australia";
  } else if (latitude >= 24 && latitude <= 45 && longitude >= 135 && longitude <= 155) {
    return "Tokio";
  } else return "Other";
};

export const findOrCreateUser = async (db_users, principal) => {
  console.log({ db_users, principal });
  try {
    const find = await db_users.getUser(p(principal));
    if (find.ok){

      return find.ok.alias;
    } 
      

    const create = await db_users.createUser(p(principal));
    if (create.ok) {
      console.log(create.ok);
      return create.ok.alias
      
    } 

  } catch (err) {
    console.log("findOrCreateUser error:", err);
  }
};

export const principalToAccount = (principal) => principalToAccountIdentifier(p(principal));
