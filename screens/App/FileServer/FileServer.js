import * as Analytics from "expo-firebase-analytics";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../../../contexts";

const FileServer = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  useEffect(() => {
    Analytics.logEvent("fileserver_page_view");
  }, []);
  return (
    <WebView
      source={{
        uri:
          "https://drive.google.com/drive/folders/1WS7-34f0NxpIDRMzVjX9gOq8QYogl6HC?usp=sharing",
      }}
      thirdPartyCookiesEnabled={true}
      cacheEnabled
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      mixedContentMode={"compatibility"}
      style={{
        flex: 1,
      }}
      onLoadEnd={() => {}}
      onLoadStart={() => {}}
      onError={() => {}}
    />
  );
};

export default FileServer;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
