import { api } from "./api";

import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/browser";

const LOGIN_OPTIONS_PATH = "/auth/webauthn/login/options";
const LOGIN_VERIFY_PATH = "/auth/webauthn/login/verify";
const REGISTRATION_OPTIONS_PATH = "/auth/webauthn/register/options";
const REGISTRATION_VERIFY_PATH = "/auth/webauthn/register/verify";

export async function beginPasskeyLogin() {
  const { data } = await api.post<{
    data: PublicKeyCredentialRequestOptionsJSON;
  }>(LOGIN_OPTIONS_PATH, {});

  return data.data;
}

export async function completePasskeyLogin(
  assertion: AuthenticationResponseJSON,
) {
  const { data } = await api.post(LOGIN_VERIFY_PATH, assertion);

  return data;
}

export async function beginPasskeyRegistration() {
  const { data } = await api.post<{
    data: PublicKeyCredentialCreationOptionsJSON;
  }>(REGISTRATION_OPTIONS_PATH, {});

  return data.data;
}

export async function completePasskeyRegistration(
  credential: RegistrationResponseJSON,
) {
  const { data } = await api.post(REGISTRATION_VERIFY_PATH, credential);

  return data;
}
