import { atom } from "recoil";
import { createPersistedAtom } from "./recoilConfig";

export const adminAuthState = atom(createPersistedAtom("adminAuthState", {
  isAuthenticated: false,
}));

export const subAdminAuthState = atom(createPersistedAtom("subAdminAuthState", {
  isAuthenticated: false,
}));

export const adminResponseAtom = atom(createPersistedAtom("adminResponse", null));

export const subAdminResponseAtom = atom(createPersistedAtom("subAdminResponsekey", null));

export const adminForgotPasswordAtom = atom(createPersistedAtom("adminForgotPassword", null));

export const confirmPasswordAtom = atom(createPersistedAtom("confirmPassword", null));

export const otpVerifyAtom = atom(createPersistedAtom("verifyOtp", null));

export const subAdminAccessAtom = atom(createPersistedAtom("subAdminAccessKey", []));