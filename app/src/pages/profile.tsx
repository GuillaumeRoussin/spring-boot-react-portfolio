import {useMeContext} from "@/pages/header";
import {ProfileForm} from "@/forms/profile-form.tsx";

export function Profile() {
    const me = useMeContext();
    console.log(me);
    return <><ProfileForm/></>
}