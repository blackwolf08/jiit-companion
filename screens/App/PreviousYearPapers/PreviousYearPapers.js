import * as Analytics from "expo-firebase-analytics";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { useTheme } from "../../../contexts";

const PreviousYearPapers = () => {
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
          "https://drive.google.com/drive/folders/1tMsxOY1l_OgjaiU4i8jfOX8FVN10Aknl?usp=sharing",
      }}
      thirdPartyCookiesEnabled={true}
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

export default PreviousYearPapers;
