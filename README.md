
### Project Setup Instructions
This README provides the necessary steps to set up the project. Follow these instructions to ensure the configuration is done correctly for the entire project.

- [How to configure the reeading of NFTs](./Docs/NftReader.md)
- [Docs about ic enviromment ](./Docs/IcDocs.md)

## Step 1: Configure Unity Build Settings

### A. Locate the app.jsx File
The first subtask is to locate the [`app.jsx`](./src/frontend/src/App.jsx) file in our project. This file is essential for configuring the application.
```bash 
src
└── frontend
    └── src
        └── App.jsx
```

### B. Configure the Unity Build URL
Within the `app.jsx` file, locate the variables responsible for fetching the Unity build. These variables can be configured to fetch the build from either a server or an asset canister. It is important to ensure that the URL directory is correct.
```js
const URL = ""; // Unity files URL

const unityOptions = {
  loaderUrl: URL + "/.js",
  dataUrl: URL + "/.data",
  frameworkUrl: URL + "/.framework.js",
  codeUrl: URL + "/.wasm",
  productName: "sdk_test",
  productVersion: "0.0.1",
  companyName: "test-sdk",
};
```
### C. Ensure File Names Match
It is essential that the file names of the Unity build match the location specified in the URL directory. This will ensure that the application can properly load the build.

![files names](/Docs/image.png)
For example, in this case, you should have a folder in your domain called "Unity-build" and then the names of the files should match those in your code.


## step 2: Add your canisters Id in the proyect.

### A- First, you need to create your frontend canister because you require the canister ID before deployment:
 ```bash
 dfx canister create frontend --network ic 
  ``` 
```bash
dfx canister create users --network ic 
``` 
(make sure that your canisters names are the same)

This command will return something like this: "ecajd-kiaaa-aaaam-ab7jq-cai".Also this will generate a fil ".json" like this 
"canister_ids.json"
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

### B- Insert your Frontend.
Go to the [Index](../src/frontend/src/index.jsx) and change the Const Client with your id
```js 
const client = createClient({
  canisters,
  providers: defaultProviders,
  globalProviderConfig: {
    whitelist: canisterIds,
    appName: "",
    // host: "https://ecajd-kiaaa-aaaam-ab7jq-cai.icp0.io/", // this would be mine 
    host: "https://"YOUR_CANISTER_ID".icp0.io/",// put your id in the middle of "https://" and ".icp0"
    dev: false,
    autoConnect: false,
  },
});
```
This will enable you to execute some POST methods on the Mainnet.

### C- Insert your DataBase.
Go to the [canisters file](../src/frontend/src/utils/canisters.js).
``` bash
src
└── frontend
    └── src
        └── utils
            └── canisters.js
```
Put your id of your canister users:
```js 
import idlUsers from "./idls/Users";

export const canisters = {
  db_users: { canisterId: "YOUR_CANISTER_ID", idlFactory: idlUsers }

};

export const canisterIds = [
  "YOUR_CANISTER_ID"
];

```
## Step 3: Deploy 
Make sure you are in the right repository "/template-unity-ic"
```bash
dfx deploy --network ic 
``` 

## Coming soon, the template will feature token reading capabilities and the option to change the name in the database.