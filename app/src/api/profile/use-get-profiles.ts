import {ProfilesSchemaResponse} from "@/api/profile/types.ts";
import {useQuery} from "react-query";
import {CACHE_KEYS, ENDPOINT} from "@/api/profile/index.ts";
import axiosInstance from "@/api/axios-instance.ts";

export const useGetProfiles = () => {
    return useQuery({
        queryKey: [CACHE_KEYS.PROFILES],
        queryFn: async () => {
            const res = await axiosInstance
                .get(ENDPOINT, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                })
                .then((response) => response.data);
            return ProfilesSchemaResponse.parse(res);
        }
    });
};