export const ENDPOINT_USER = '/profiles/me';
export const ENDPOINT = '/profiles/';

export const CACHE_KEYS = {
    PROFILE_ME: "PROFILE_ME",
    PROFILES: "PROFILES",
};

export * from './types';
export * from './use-create-profile';
export * from './use-me-profile.ts';
export * from './use-put-profile.ts';
export * from './use-get-profiles.ts';