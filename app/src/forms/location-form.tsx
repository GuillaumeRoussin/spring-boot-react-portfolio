import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {LocationDetailsInput, LocationDetailsSchemaInput} from "@/api/locations";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DialogFooter} from "@/components/ui/dialog.tsx";
import {useLocationsStateManager} from "@/contexts/locations-context.tsx";

export function LocationForm() {
    const {locations, setLocations, shapes, setShapes, setOpen, setId, id} = useLocationsStateManager();
    const form = useForm<LocationDetailsInput>({
        resolver: zodResolver(LocationDetailsSchemaInput),
        defaultValues: {
            description: "",
            name: ""
        },
    });


    function onSubmit(values: LocationDetailsInput) {
        const loc = locations.find((location) => location.id === id);
        const shape = shapes.find((shape) => shape.id === id);
        if (loc) {
            setLocations(locations.filter((location) => location.id !== id));
            setLocations((prevState) => ([...prevState, {
                lat: loc.lat,
                lng: loc.lng,
                id: loc.id,
                description: values.description,
                name: values.name
            }]))
        } else if (shape) {
            setShapes(shapes.filter((shape) => shape.id !== id));
            setShapes((prevState) => ([...prevState, {
                id: shape.id,
                shapeType: "polygon",
                coordinates: shape.coordinates,
                description: values.description,
                name: values.name,
            }]));
        }
        setOpen(false);
        setId(null);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-2 py-4">
                    <div className="grid grid-cols-1 items-center gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder="Location of ..." {...field}/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="You can find ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}