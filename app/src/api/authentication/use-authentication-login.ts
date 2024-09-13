import {AuthenticationInput, AuthenticationSchemaResponse, CACHE_KEYS, ENDPOINT} from "@/api/authentication";
import {useMutation} from "react-query";
import axiosInstance from "@/api/axios-instance";
import {queryClient} from "@/api/query-client";
import {AxiosError} from "axios";
import {useApiError} from "@/api/use-api-error";

export function useAuthenticationLogin() {
    const handleApiError = useApiError();
    return useMutation(
        async (payload: AuthenticationInput) => {
            const res = await axiosInstance.post(ENDPOINT + 'login', payload).then((response) => response.data);
            return AuthenticationSchemaResponse.parse(res) ?? null;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [CACHE_KEYS.authentication]}).then();
            },
            onError: (err: AxiosError) => {
                handleApiError(err, "Unable to authenticate");
            },
        }
    );
}