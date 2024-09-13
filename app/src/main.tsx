import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider";
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/api/query-client";
import {Toaster} from "@/components/ui/toaster"

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
            <App/>
            <Toaster/>
        </QueryClientProvider>
    </ThemeProvider>
)
