import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/auth-context";

export default function MainPages() {
    const {logout} = useAuth()
    return <>
        Logged In
        <Button onClick={() => logout()}>Log Out</Button>
    </>
}