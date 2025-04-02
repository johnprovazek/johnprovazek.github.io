// Code adapted from useLocalStorage hook developed by uidotdev.
//
// https://usehooks.com/uselocalstorage
// https://github.com/uidotdev/usehooks
//
// This hook pulls my github repo data from Firebase and stores it in localStorage.
// This hook also uses an epoch date to control how often to make calls to Firebase to update localStorage data.

import * as React from "react";
import { daysToMs } from "../lib/utils.js";
import { DAYS_REFRESH_LIMIT } from "../lib/constants.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase.js";

const dispatchStorageEvent = (key, newValue) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const getItem = (key) => {
  return window.localStorage.getItem(key);
};

const subscribe = (callback) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  throw Error("useFirebaseLocalStorageRepos is a client-only hook");
};

const initialValue = [];

export default function useFirebaseLocalStorageRepos(key) {
  const getSnapshot = () => getItem(key);

  const store = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  React.useEffect(() => {
    const firebaseRequest = async () => {
      try {
        const docRef = doc(db, "portfolio", "data");
        const response = await getDoc(docRef);
        if (response.exists()) {
          let reposData = response.data()["repos"];
          setItem(key, {
            epoch: Date.now(),
            repos: reposData,
          });
        } else {
          console.error("Firebase document does not exist.");
        }
      } catch (fetchError) {
        console.error("Error when fetching data from Firebase:", fetchError);
      }
    };

    const itemString = getItem(key);
    if (itemString) {
      try {
        const item = JSON.parse(itemString);
        if (item && item.epoch && item.repos) {
          if (Date.now() - item.epoch > daysToMs(DAYS_REFRESH_LIMIT)) {
            firebaseRequest();
          }
        } else {
          firebaseRequest();
          console.error("localStorage item malformed:", itemString);
        }
      } catch (parseError) {
        firebaseRequest();
        console.error("Error parsing item from localStorage:", parseError);
      }
    } else {
      firebaseRequest();
    }
  }, [key]);

  return store ? JSON.parse(store).repos : initialValue;
}
