import React from "react";
// import * as Sentry from "@sentry/browser";
import { Text, Dimensions, View } from "react-native";
const { width, height } = Dimensions.get("window");
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "", errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
    alert(JSON.stringify(error));
    alert(JSON.stringify(errorInfo));
    // Sentry.withScope(scope => {
    //   Object.keys(errorInfo).forEach(key => {
    //     scope.setExtra(key, errorInfo[key]);
    //   });
    //   Sentry.captureException(error);
    // });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            backgroundColor: "white",
            width,
            height,
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
            className="mt-5 text-center"
          >
            Something went wrong. Try reloading the app. send me the alert SS at
            +91-9958470889 / dhamasunny98@gmail.com
          </Text>
          <Text>{JSON.stringify(this.state.error)}</Text>
          <Text>{JSON.stringify(this.state.errorInfo)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
