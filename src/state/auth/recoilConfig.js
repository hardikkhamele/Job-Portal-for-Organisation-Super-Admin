// import { recoilPersist } from "recoil-persist";

// const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

// export const sessionStoragePersist = recoilPersist({
//   key: 'session-persist',
//   storage: sessionStorage,
// });

// export const createPersistedAtom = (key, defaultValue) => ({
//   key,
//   default: defaultValue,
//   effects_UNSTABLE: [sessionStoragePersist.persistAtom],
// });





import { recoilPersist } from "recoil-persist";

// 👉 sessionStorage ki jagah localStorage use karo
const localStorage = typeof window !== 'undefined' 
  ? window.localStorage 
  : undefined;

export const localStoragePersist = recoilPersist({
  key: 'local-persist', // key naam change karna optional hai
  storage: localStorage,
});

export const createPersistedAtom = (key, defaultValue) => ({
  key,
  default: defaultValue,
  effects_UNSTABLE: [localStoragePersist.persistAtom],
});