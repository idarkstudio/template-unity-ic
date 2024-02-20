import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Bool "mo:base/Bool";

actor {
    type User = {
        principalId : Principal;
        alias : Text;
        urlImage : Text;
    };

    stable var arrUsers : [(Principal, User)] = [];
    private let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

    public shared ({ caller }) func findOrCreateUser(principalId : Principal) : async User {
        switch (users.get(principalId)) {
            case (null) {
                let id = users.size();
                let newUser : User = {
                    principalId = principalId;
                    alias = "player" # Nat.toText(id);
                    urlImage = "https://s2.coinmarketcap.com/static/img/coins/200x200/8916.png";
                };
                users.put(principalId, newUser);
                return newUser;
            };
            case (?res) return res;
        };
    };

    public func SetAlias(principalId:Principal, newAlias: Text) : async Result.Result<Bool, Text> {
        switch (users.get(principalId)) {
            case (null) return #err("User doesn't exist.");
            case (?user) {
                for(_user in users.vals()) {
                    if(_user.alias == newAlias){
                        return #ok(false);
                    }
                };
                let newUser : User ={
                    principalId = user.principalId;
                    alias = newAlias;
                    urlImage = user.urlImage;
                };
                users.put(principalId,newUser);
                return #ok(true);
            }
        };
    
    };
  

    public func createUser(principalId : Principal) : async Result.Result<User, Text> {
        switch (users.get(principalId)) {
            case (null) {
                let id = users.size();
                let newUser : User = {
                    principalId = principalId;
                    alias = "player" # Nat.toText(id);
                    urlImage = "https://s2.coinmarketcap.com/static/img/coins/200x200/8916.png";
                };
                users.put(principalId, newUser);
                return #ok(newUser);
            };
            case (?_) return #err("User already exist.");
        };
    };

    public query func getUser(principalId : Principal) : async Result.Result<User, Text> {
        switch (users.get(principalId)) {
            case (null) return #err("User doesn't exist.");
            case (?user) return #ok(user);
        };
    };

    public query func getUserByAlias(alias : Text) : async Result.Result<User, Text> {
        for (user in users.vals()) {
            if (user.alias == alias) return #ok(user);
        };

        return #err("The user doesn't exist.");
    };

    public query func totalUsers() : async Nat {
        return users.size();
    };

    //get all user
    public query func getAllUsers() : async [User] {
        let buffUsers = Buffer.Buffer<User>(1);
        for (msg in users.vals()) {
            buffUsers.add(msg);
        };
        return Buffer.toArray<User>(buffUsers);
    };
    // --- SYSTEM FUNCTIONS ---
    system func preupgrade() {
        arrUsers := Iter.toArray(users.entries());
    };

    system func postupgrade() {
        for ((key, val) in arrUsers.vals()) {
            users.put(key, val);
        };
    };
};
