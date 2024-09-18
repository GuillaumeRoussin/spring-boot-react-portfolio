import {useApiError} from "@/api/use-api-error.ts";
import {useToast} from "@/hooks/use-toast.ts";
import axiosInstance from "@/api/axios-instance.ts";
import {useMutation} from "react-query";
import {ProfileInput, ENDPOINT, ProfileSchemaResponse} from "@/api/profile";
import {AxiosError} from "axios";


export function useCreateProfile() {
    const handleApiError = useApiError();
    const {toast} = useToast();
    return useMutation(
        async (payload: ProfileInput) => {
            const res = await axiosInstance.post(ENDPOINT, payload, {headers: {Authorization: `Bearer ${localStorage.getItem("authToken")}`}}).then((response) => response.data);
            const parsedResponse = ProfileSchemaResponse.parse(res);

            return parsedResponse ?? null;
        },
        {
            onSuccess: (_) => {
                toast({title: "Profile successfully created"});
            },
            onError: (err: AxiosError) => {
                handleApiError(err, "Unable to create a profile");
            },
        }
    );
}