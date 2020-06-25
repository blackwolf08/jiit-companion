import React, { useEffect } from "react";
import { useDropDown, useUser } from "../../contexts";
import * as Updates from "expo-updates";

export const UpdatesComponent = () => {
  const { user } = useUser();
  const { ref } = useDropDown();

  useEffect(() => {
    (async () => {
      try {
        let { isAvailable } = Updates.checkForUpdateAsync();
        if (isAvailable) {
          ref.current.alertWithType(
            "info",
            "Update Available",
            "Downloading update"
          );
          let { isNew } = Updates.fetchUpdateAsync();
          if (isNew) {
            ref.current.alertWithType(
              "success",
              "Update Downloaded",
              "App will restart"
            );
            await Updates.reloadAsync();
          }
        }
      } catch (err) {}
    })();
  }, []);

  return <></>;
};
