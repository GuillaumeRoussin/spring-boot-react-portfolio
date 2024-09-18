import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {ClimbingType, ProfileInput, ProfileSchemaInput, useCreateProfile} from "@/api/profile";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Calendar} from "@/components/ui/calendar"
import {cn} from "@/lib/utils"
import {CalendarIcon} from "@radix-ui/react-icons"
import {format} from "date-fns"
import {Input} from "@/components/ui/input.tsx";

export function ProfileForm() {
    const createProfile = useCreateProfile();
    const form = useForm<ProfileInput>({
        resolver: zodResolver(ProfileSchemaInput),
        defaultValues: {
            description: "",
            maxRating: "",
            preferredClimbingType: undefined,
            profilePublic: false,
        },
    })

    function onSubmit(values: ProfileInput) {
        createProfile.mutate(values);
    }

    return <>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Profile</CardTitle>
                </div>
                <CardDescription>
                    Complete here the information about your profile
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="preferredClimbingType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Preferred climbing type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your prefered climbing type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ClimbingType).map((key) => (
                                                <SelectItem key={key} value={key}>{key}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxRating"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Maximum climbing rating</FormLabel>
                                    <Input placeholder="6a+" {...field}/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profilePublic"
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Is your profile public ?
                                        </FormLabel>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Create profile</Button>
                    </form>
                </Form>
            </CardContent></Card>
    </>
}