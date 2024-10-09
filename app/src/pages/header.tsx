import {
    CircleUser,
    Menu,
    Mountain,
} from "lucide-react"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link, Outlet, useNavigate, useLocation, useOutletContext} from "react-router-dom";
import {useAuth} from "@/contexts/auth-context.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useMe, UserMeResponse} from "@/api/user";

export function useMeContext() {
    return useOutletContext<UserMeResponse>();
}

export function Header() {
    const {logout} = useAuth();
    const {data} = useMe();
    const navigate = useNavigate();
    const location = useLocation();
    if (data) {
        return (
            <div className="flex min-h-screen w-full flex-col">
                <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                    <nav
                        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            <Mountain className="h-6 w-6"/>
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            to="/location"
                            className={`transition-colors hover:text-foreground ${
                                location.pathname === "/location" ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                            Location
                        </Link>
                        <Link
                            to="/proposals"
                            className={`transition-colors hover:text-foreground ${
                                location.pathname === "/proposals" ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                            Proposals
                        </Link>
                        {
                            data.authorities.some(auth => auth.authority === "ROLE_ADMIN") ? <Link
                                to="/profiles"
                                className={`transition-colors hover:text-foreground ${
                                    location.pathname === "/profiles" ? "text-foreground" : "text-muted-foreground"
                                }`}
                            >
                                Profiles
                            </Link> : null
                        }
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    to="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Mountain className="h-6 w-6"/>
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link to="#" className="hover:text-foreground">
                                    Location
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <div className="ml-auto flex-1 sm:flex-initial">
                            <div className="relative">
                                <ModeToggle/>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5"/>
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex min-h-screen w-full">
                    <Outlet context={data}/>
                </main>
            </div>
        )
    }
}

