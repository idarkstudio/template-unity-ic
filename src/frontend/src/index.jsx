import "./styles/connect2ic.css";

import { canisterIds, canisters } from "./utils/canisters.js";

import App from "./App";
import { Connect2ICProvider } from "@connect2ic/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";


const client = createClient({
  canisters,
  providers: defaultProviders,
  globalProviderConfig: {
    whitelist: canisterIds,
    appName: "",
    host: "https://ecajd-kiaaa-aaaam-ab7jq-cai.icp0.io/",
    dev: false,
    autoConnect: false,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
