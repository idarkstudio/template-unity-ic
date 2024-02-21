### Unity Build Configuration.
This README provides the necessary steps to configure the Unity build in our application. Follow these steps to ensure the configuration is done correctly.

## Step 1: Locate the app.jsx File.
The first step is to locate the app.jsx file in our project. This file is essential for configuring the application.

## Step 2: Configure the Unity Build URL.
Within the app.jsx file, we will find the variables responsible for fetching the Unity build. These variables can be configured to fetch the build from either a server or an asset canister. It is important to ensure that the URL directory is correct.

## Step 3: Ensure File Names Match.
It is essential that the file names of the Unity build match the location specified in the URL directory. This will ensure that the application can properly load the build.


![files names](image.png)
for example in this case, you should have a folder in your domain called Unity-build and then the names of the files should be the same than your code.

## step 4: Add your canisters Id in the proyect.

# A- First, you need to create your frontend canister because you require the canister ID before deployment:
 ```bash
 dfx canister create frontend --network ic 
  ``` 
```bash
dfx canister create users --network ic 
``` 
(make sure that your canisters names are the same)

This command will return something like this: "ecajd-kiaaa-aaaam-ab7jq-cai".Also this will generate a fil ".json" like this 
![canister_ids.json](image-1.png)
this file will be like this:
```json
{
  "frontend": {
    "ic": "ecajd-kiaaa-aaaam-ab7jq-cai"
  },
  "users":{
    "ic":"mqblk-2aaaa-aaaam-ab64a-cai"
  }
}

``` 
 Make sure to save your IDs.

# B- Insert your Frontend.
Go to the ![Index](../src/frontend/src/index.jsx) and change the Const Client with your id
```js 
const client = createClient({
  canisters,
  providers: defaultProviders,
  globalProviderConfig: {
    whitelist: canisterIds,
    appName: "",
    // host: "https://ecajd-kiaaa-aaaam-ab7jq-cai.icp0.io/",this would be mine 
    host: "https://.icp0.io/",// put your id in the middle of "https://" and ".icp0"
    dev: false,
    autoConnect: false,
  },
});
```
This will enable you to execute some POST methods on the Mainnet.

# C- Insert your DataBase.
Go to the ![canisters file](../src/frontend/src/utils/canisters.js).
``` bash
src
└── frontend
    └── src
        └── utils
            └── canisters.js
```
put your id of your canister users 
```js 
import idlUsers from "./idls/Users";

export const canisters = {
  db_users: { canisterId: "", idlFactory: idlUsers }// put your canister_id

};

export const canisterIds = [
  "" // put your canister_id
];

```
## Step 5: Deploy 
Make sure you are in the right repository "/template-unity-ic"
```bash
dfx deploy --network ic 
``` 