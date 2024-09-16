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
import {AuthenticationInput, AuthenticationSchemaInput, useAuthenticationLogin} from "@/api/authentication";
import {useNavigate} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle";

export function LoginForm() {
    const authLogin = useAuthenticationLogin();
    const navigate = useNavigate();
    const form = useForm<AuthenticationInput>({
        resolver: zodResolver(AuthenticationSchemaInput),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: AuthenticationInput) {
        authLogin.mutate(values, {
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
                        <CardTitle className="text-2xl">Login</CardTitle>
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
                        </form>
                    </Form>
                </CardContent></Card>
        </div>
    )
}