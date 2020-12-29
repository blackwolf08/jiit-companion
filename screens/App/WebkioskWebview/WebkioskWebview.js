import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { InterstitialAdComponent } from "../../../components";
import { useUser } from "../../../contexts";

const WebkioskWebview = () => {
  const { user } = useUser();
  const INJECTED_JAVASCRIPT = `
                              (function() {
                                let enrll = document.getElementById('MemberCode')
                                let cap = document.getElementById('txtcap')
                                let date = document.getElementById('DATE1')
                                let password = document.getElementById('Password101117')
                                if(${user.college} == "JUET"){
                                  password = document.getElementById('Password')
                                }
                                enrll.value = "${user.enrollmentNumber}"
                                date.value = "${user.dateOfBirth}"
                                password.value = "${user.password}"
                                if(${user.college} == "128"){
                                  var inst = document.getElementsByName("InstCode")
                                  inst[0].selectedIndex = 2
                                }
                                let captcha = document.querySelector('s')
                                cap.value = captcha.innerText
                                let btn = document.getElementById('BTNSubmit')
                                btn.click();
                              })();
                              `;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <WebView
        source={{
          uri:
            user.college == "JUET"
              ? "https://webkiosk.juet.ac.in"
              : "https://webkiosk.jiit.ac.in",
        }}
        thirdPartyCookiesEnabled={true}
        mixedContentMode={"compatibility"}
        onMessage={(msg) => {
          console.log(msg);
        }}
        style={{
          flex: 1,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
      <InterstitialAdComponent show />
    </View>
  );
};

export default WebkioskWebview;

const styles = StyleSheet.create({});
