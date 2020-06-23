import * as Analytics from "expo-firebase-analytics";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme, useUser } from "../../../contexts";

const AcademicCalendar = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    Analytics.logEvent("fileserver_page_view");
  }, []);
  return (
    <WebView
      source={{
        uri:
          user?.college == "JUET"
            ? "https://drive.google.com/viewerng/viewer?embedded=true&url=https://www.juet.ac.in/Download/JUET-ES19-20.pdf"
            : "https://drive.google.com/viewerng/viewer?embedded=true&url=http://www.jiit.ac.in/sites/default/files/AC%202019-20_200120.pdf",
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

export default AcademicCalendar;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
