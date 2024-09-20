import {queryClient} from "./query-client";

export const clearAllCache = (CACHE_KEYS: { [key: string]: string }) => {
    Object.keys(CACHE_KEYS).forEach(function (key) {
        queryClient.invalidateQueries({queryKey: [CACHE_KEYS[key]]}).then();
    });
};
