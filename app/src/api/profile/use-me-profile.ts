import {useQuery} from "react-query";
import {CACHE_KEYS, ENDPOINT_USER, ProfileMeOptions, ProfileSchemaResponse} from "@/api/profile";
import axiosInstance from "@/api/axios-instance.ts";

export const useMeProfile = ({enabled}: ProfileMeOptions) => {
    return useQuery({
        queryKey: [CACHE_KEYS.PROFILE],
        queryFn: async () => {
            const res = await axiosInstance
                .get(ENDPOINT_USER, {
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                })
                .then((response) => response.data);
            return ProfileSchemaResponse.parse(res);
        }, enabled
    });
};