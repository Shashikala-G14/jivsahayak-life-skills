import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import LandingPage from "./pages/LandingPage";
import LanguageSelection from "./pages/demo/LanguageSelection";
import PersonaSelection from "./pages/demo/PersonaSelection";
import Registration from "./pages/demo/Registration";
import Dashboard from "./pages/demo/Dashboard";
import ModuleDetail from "./pages/demo/ModuleDetail";
import SahayakAssistant from "./pages/demo/SahayakAssistant";
import Leaderboard from "./pages/demo/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/demo" element={<LanguageSelection />} />
            <Route path="/demo/persona" element={<PersonaSelection />} />
            <Route path="/demo/register" element={<Registration />} />
            <Route path="/demo/dashboard" element={<Dashboard />} />
            <Route path="/demo/module/:moduleId" element={<ModuleDetail />} />
            <Route path="/demo/assistant" element={<SahayakAssistant />} />
            <Route path="/demo/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
