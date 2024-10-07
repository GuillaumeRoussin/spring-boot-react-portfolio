import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/api/query-client";
import {Toaster} from "@/components/ui/toaster"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {SigninForm} from "@/forms/signin-form.tsx";
import {useAuth, AuthProvider} from "@/contexts/auth-context";
import PrivateRoute from "@/components/private-route";
import {Header} from "@/pages/header.tsx";
import NotFound from "@/pages/not-found.tsx";
import {SignupForm} from "@/forms/signup-form.tsx";
import {Locations} from "@/pages/locations.tsx"
import {Home} from "@/pages/home";
import {Profile} from "@/pages/profile.tsx";
import {Proposals} from "@/pages/proposals.tsx";
import {ReactQueryDevtools} from "react-query/devtools";
import {Profiles} from "@/pages/profiles/profiles.tsx";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools/>
                <App/>
            </QueryClientProvider>
        </ThemeProvider>
    </AuthProvider>
)

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SigninForm/>}/>
                    <Route path="/signup" element={<SignupForm/>}/>
                    <Route element={<PrivateRoute isAuthenticated={useAuth().isAuthenticated}/>}>
                        <Route path="/" element={<Header/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/location" element={<Locations/>}/>
                            <Route path="/proposals" element={<Proposals/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/profiles" element={<Profiles/>}/>
                        </Route>
                        <Route path="/*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
            <Toaster/>
        </>
    )
}