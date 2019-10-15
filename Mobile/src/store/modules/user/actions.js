export function updateProfileRequest(formData) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { formData },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
