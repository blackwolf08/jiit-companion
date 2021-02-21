import { useLinking } from "@react-navigation/native";
import * as Linking from "expo-linking";
export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/")],
    config: {
      login: {
        path: "/login",
      },
      Home: {
        path: "/home",
        screens: {
          timetable: {
            path: "/",
          },
          attendance: {
            path: "/",
          },
          cgpa: {
            path: "/",
          },
          fileserver: {
            path: "/",
          },
        },
      },
      Settings: {
        path: "/",
      },
    },
  });
}
