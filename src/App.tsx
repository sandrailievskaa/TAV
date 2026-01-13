import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import Trainings from "./pages/Trainings";
import MedicalExams from "./pages/MedicalExams";
import Incidents from "./pages/Incidents";
import Equipment from "./pages/Equipment";
import Reports from "./pages/Reports";
import Organization from "./pages/Organization";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                <Route path="/employees" element={<MainLayout><Employees /></MainLayout>} />
                <Route path="/trainings" element={<MainLayout><Trainings /></MainLayout>} />
                <Route path="/medical" element={<MainLayout><MedicalExams /></MainLayout>} />
                <Route path="/incidents" element={<MainLayout><Incidents /></MainLayout>} />
                <Route path="/equipment" element={<MainLayout><Equipment /></MainLayout>} />
                <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
                <Route path="/organization" element={<MainLayout><Organization /></MainLayout>} />
                <Route path="/documents" element={<MainLayout><Documents /></MainLayout>} />
                <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
                <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
                <Route path="/logs" element={<MainLayout><Logs /></MainLayout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
