import {AxiosError} from "axios";
import {useToast} from "@/hooks/use-toast"

type ApiErrorMessage = { detail: string };

export function useApiError() {
    const {toast} = useToast();

    return (err: AxiosError, customMessage?: string) => {
        const message = err?.response?.data
            ? (err.response.data as ApiErrorMessage).detail ?? customMessage
            : customMessage ?? "There was a problem with your request.";
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: message,
        })
    };
}