import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SigninInput, SigninSchemaInput, useAuthenticationSignin} from "@/api/authentication";
import {useNavigate, Link} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle";

export function SigninForm() {
    const authSignin = useAuthenticationSignin();
    const navigate = useNavigate();
    const form = useForm<SigninInput>({
        resolver: zodResolver(SigninSchemaInput),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: SigninInput) {
        authSignin.mutate(values, {
            onSuccess: (_) => {
                navigate("/dashboard");
            }
        });
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Sign In</CardTitle>
                        <ModeToggle/>
                    </div>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" type="submit">Sign in</Button>
                            <div className="mt-4 text-center text-sm">
                                Don't have an account?{" "}
                                <Link to="/signup" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent></Card>
        </div>
    )
}