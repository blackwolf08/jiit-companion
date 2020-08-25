import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { useDropDown, useUser } from '../../contexts';

export const UpdatesComponent = () => {
  const { user } = useUser();
  const { ref } = useDropDown();

  useEffect(() => {
    (async () => {
      // if (__DEV__) return;
      try {
        let { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          ref.current.alertWithType(
            'info',
            'Update Available',
            'Downloading update'
          );
          let { isNew } = await Updates.fetchUpdateAsync();
          if (isNew) {
            ref.current.alertWithType(
              'success',
              'Update Downloaded',
              'App will restart'
            );
            await Updates.reloadAsync();
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <></>;
};
