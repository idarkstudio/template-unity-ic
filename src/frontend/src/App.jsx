import "./App.css";

import { ConnectDialog, useCanister, useConnect, useDialog } from "@connect2ic/react";
import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { currentRegion, findOrCreateUser } from "./utils/functions";
import { isMobile, isTablet } from "react-device-detect";

import Loader2 from "./components/Loader2";
import useNfts from "./hook/useNfts";

const URL = "https://play.realityofmadness.com/test-sdk";



const unityOptions = {
    loaderUrl: URL + "/sdk_test.loader.js",
  dataUrl: URL + "/sdk_test.data",
  frameworkUrl: URL + "/sdk_test.framework.js",
  codeUrl: URL + "/sdk_test.wasm",
  productName: "sdk_test",
  productVersion: "0.0.1",
  companyName: "test-sdk",
};

const App = () => {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext(unityOptions);
  const { open, isOpen } = useDialog();
  const [db_users] = useCanister("db_users", { mode: "anonymous" });
  const { isConnected, principal, disconnect } = useConnect({
    onConnect: () => findOrCreateUser(db_users, principal),
  });
  const { allNfts } = useNfts();
  const [initLogin, setInitLogin] = useState(false);
  const ref = useRef();

  const handleRequestFullscreen = () => ref.current?.requestFullscreen();
  const handleExitFullscreen = () => document.fullscreenElement && document.exitFullscreen();

  const handleRequestNFTs = async () => {
    const nfts = await allNfts(isConnected, principal);
    console.log({ nfts, isLoaded });
    sendMessage("LoginManager", "RequestNFT", JSON.stringify(nfts));
  };

  const handleLoginIc = async () => {
    handleExitFullscreen();
    setInitLogin(true);
    console.log("entra login");
    console.log({ isConnected, principal });
    isConnected && disconnect();
    open();
  };

  // listeners
   useEffect(() => {
    // login
     addEventListener("LoginIc", handleLoginIc);

    // request nfts
     addEventListener("GetNFT", handleRequestNFTs);

    return () => {
      removeEventListener("LoginIc", handleLoginIc);
      removeEventListener("GetNFT", handleRequestNFTs);
    };
  }, [addEventListener, isLoaded, principal]);

  // setters
  // useEffect(() => {
  //   if (isLoaded) {
  //     // set platform in game
  //     sendMessage("DontDestroyOnLoad", "CheckMobilePlatform", isMobile || isTablet ? 1 : 0);

  //     // set location in game
  //     // if (navigator.geolocation) {
  //     //   navigator.geolocation.getCurrentPosition(
  //     //     (position) => {
  //     //       const { latitude, longitude } = position.coords;
  //     //       const region = currentRegion(latitude, longitude);
  //     //       console.log({ region });
  //     //       sendMessage("locationManager", "RequestLocation", region);
  //     //     },
  //     //     (error) => console.error("Error al obtener la ubicación:", error.message)
  //     //   );
  //     // } else {
  //     //   console.error("La geolocalización no está disponible en este navegador.");
  //     // }
  //   }
  // }, [isLoaded]);

  // set principal in game
  useEffect(() => {
    console.log("prnicipal useEffect");
    if (isLoaded && isConnected && principal && initLogin) {
      console.log("envia principal");
      sendMessage("LoginManager", "GetPrincipal", principal);
      findOrCreateUser(db_users, principal);
    }
  }, [isLoaded, isConnected, principal]);

  useEffect(() => {
    if (isOpen) {
      const btnBitfinity = document.querySelector(".infinity-styles");
      const span = btnBitfinity?.querySelector(".button-label");
      span && (span.textContent = "Bitfinity Wallet");

      const btnAstrox = document.querySelector(".astrox-styles");
      const img = btnAstrox.querySelector(".img-styles");
      if (img) {
        img.style.backgroundColor = "#545454";
        img.style.borderRadius = "50px";
      }
    }
  }, [isOpen]);

  return (
    <main>
      {!isLoaded && <Loader2 loadingProgression={loadingProgression} />}

      {/* full screen */}
      {!document.fullscreenElement && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            position: "absolute",
          }}
          onClick={handleRequestFullscreen}
        ></div>
      )}
      <Unity
        ref={ref}
        unityProvider={unityProvider}
        style={{
          width: "100%",
          height: "100%",
          alignContent: "center",
          display: isLoaded ? "block" : "none",
        }}
      />

      <ConnectDialog />
    </main>
  );
};

export default App;
