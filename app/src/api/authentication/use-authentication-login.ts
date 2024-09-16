import {AuthenticationInput, AuthenticationSchemaResponse, CACHE_KEYS, ENDPOINT} from "@/api/authentication";
import {useMutation} from "react-query";
import axiosInstance from "@/api/axios-instance";
import {queryClient} from "@/api/query-client";
import {AxiosError} from "axios";
import {useApiError} from "@/api/use-api-error";
import {useAuth} from "@/contexts/auth-context";

export function useAuthenticationLogin() {
    const handleApiError = useApiError();
    const {login} = useAuth();
    return useMutation(
        async (payload: AuthenticationInput) => {
            const res = await axiosInstance.post(ENDPOINT + 'login', payload).then((response) => response.data);
            const parsedResponse = AuthenticationSchemaResponse.parse(res);
            if (parsedResponse) {
                localStorage.setItem('authToken', parsedResponse.token);
                localStorage.setItem('tokenExpiry', String(Date.now() + parsedResponse.expiresIn));
                login();
            }

            return parsedResponse ?? null;
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