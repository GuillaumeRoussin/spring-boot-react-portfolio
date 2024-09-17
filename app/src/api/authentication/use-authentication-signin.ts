import {SigninInput, SigninSchemaResponse, ENDPOINT} from "@/api/authentication";
import {useMutation} from "react-query";
import axiosInstance from "@/api/axios-instance";
import {AxiosError} from "axios";
import {useApiError} from "@/api/use-api-error";
import {useAuth} from "@/contexts/auth-context";

export function useAuthenticationSignin() {
    const handleApiError = useApiError();
    const {login} = useAuth();
    return useMutation(
        async (payload: SigninInput) => {
            const res = await axiosInstance.post(ENDPOINT + 'signin', payload).then((response) => response.data);
            const parsedResponse = SigninSchemaResponse.parse(res);
            if (parsedResponse) {
                localStorage.setItem('authToken', parsedResponse.token);
                localStorage.setItem('tokenExpiry', String(Date.now() + parsedResponse.expiresIn));
                login();
            }

            return parsedResponse ?? null;
        },
        {
            onError: (err: AxiosError) => {
                handleApiError(err, "Unable to authenticate");
            },
        }
    );
}