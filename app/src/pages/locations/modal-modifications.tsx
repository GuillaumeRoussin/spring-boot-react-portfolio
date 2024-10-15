import {DialogHeader} from "@/components/ui/dialog.tsx";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";
import {useMap} from "react-leaflet";

export function ModalModifications({open}: { open: boolean }) {
    const map = useMap();
    return (
        <Dialog open={open}>
            <DialogContent className={"fixed inset-0 flex justify-center items-center"}>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <Button onClick={() => console.log(map.getCenter())}>Click here</Button>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}