import {ProfilesOptions, ProfilesSchemaResponse} from "@/api/profile/types.ts";
import {useQuery} from "react-query";
import {CACHE_KEYS, ENDPOINT} from "@/api/profile/index.ts";
import axiosInstance from "@/api/axios-instance.ts";

export const useGetProfiles = ({params}: ProfilesOptions) => {
    return useQuery({
        queryKey: [CACHE_KEYS.PROFILES,params],
        queryFn: async () => {
            const res = await axiosInstance
                .get(ENDPOINT, {
                    params: {...params},
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                })
                .then((response) => response.data);
            console.log(res);
            return ProfilesSchemaResponse.parse(res);
        }
    });
};