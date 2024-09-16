import {createRoot} from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/api/query-client";
import {Toaster} from "@/components/ui/toaster"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {LoginForm} from "@/forms/login-form";
import {useAuth, AuthProvider} from "@/contexts/auth-context";
import PrivateRoute from "@/components/private-route";
import MainPages from "@/pages/main-pages";
import NotFound from "@/pages/not-found.tsx";


createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
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
                    <Route path="/" element={<LoginForm/>}/>
                    <Route element={<PrivateRoute isAuthenticated={useAuth().isAuthenticated}/>}>
                        <Route path="/dashboard" element={<MainPages/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
            <Toaster/>
        </>
    )
}