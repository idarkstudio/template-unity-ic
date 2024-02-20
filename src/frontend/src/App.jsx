import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ConnectDialog, useCanister, useConnect, useDialog } from "@connect2ic/react";
import { isMobile, isTablet } from "react-device-detect";

import Loader2 from "./components/Loader2";
import useNfts from "./hook/useNfts";
import { currentRegion, findOrCreateUser } from "./utils/functions";

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
  const { isConnected, principal, disconnect } = useConnect({
    onConnect: () => findOrCreateUser(db_users, principal),
  });
  const { allNfts } = useNfts();
  const [db_users] = useCanister("db_users", { mode: "anonymous" });

  const [initLogin, setInitLogin] = useState(false);
  const ref = useRef();

  const handleRequestFullscreen = () => ref.current?.requestFullscreen();
  const handleExitFullscreen = () => document.fullscreenElement && document.exitFullscreen();

  const handleRequestNFTs = async () => {
    console.log("In handleRequestNFTs");
    const nfts = await allNfts(isConnected, principal);
    sendMessage("ICPrefab", "RequestNFT", JSON.stringify(nfts));
  };

  const handleLoginIc = async () => {
    handleExitFullscreen();
    setInitLogin(true);
    isConnected && disconnect();
    open();
  };

  // Event listeners
  useEffect(() => {
    addEventListener("LoginIc", handleLoginIc);
    addEventListener("GetNFT", handleRequestNFTs);

    return () => {
      removeEventListener("LoginIc", handleLoginIc);
      removeEventListener("GetNFT", handleRequestNFTs);
    };
  }, [addEventListener]);

  // Setter
  useEffect(() => {
    if (isLoaded) {
      sendMessage("ICPrefab", "IsMobileTrue", isMobile || isTablet ? 1 : 0);
    }
  }, [isLoaded]);

  // Set principal in game
  useEffect(() => {
    if (isLoaded && isConnected && principal && initLogin) {
      const User = {
        principal: principal.toString(),
        userName: null
      }

      try {
        const alias = findOrCreateUser(db_users, principal);
        User.userName = alias
      } catch (e) {
        console.log("Error in findOrCreateUser: " + e);
      } finally {
        sendMessage("ICPrefab", "GetPrincipal", JSON.stringify(User));
      }
    }
  }, [isLoaded, isConnected, principal]);

  // UI effects
  useEffect(() => {
    if (isOpen) {
      // Modify styles when the dialog is open
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
