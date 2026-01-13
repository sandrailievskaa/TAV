import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RBACProvider } from "@/contexts/RBACContext";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Passengers from "./pages/Passengers";
import Staff from "./pages/Staff";
import Employees from "./pages/Employees";
import MedicalExams from "./pages/MedicalExams";
import Trainings from "./pages/Trainings";
import Incidents from "./pages/Incidents";
import Vehicles from "./pages/Vehicles";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Logs from "./pages/Logs";
import Organization from "./pages/admin/Organization";
import Positions from "./pages/admin/Positions";
import Assets from "./pages/admin/Assets";
import PPE from "./pages/admin/PPE";
import Documents from "./pages/admin/Documents";
import CompanyAnalysis from "./pages/CompanyAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <RBACProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
              <Routes>
                <Route path="/login" element={<LoginRoute />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/flights" element={<Flights />} />
                          <Route path="/passengers" element={<Passengers />} />
                          <Route path="/staff" element={<Staff />} />
                          <Route path="/employees" element={<Employees />} />
                          <Route path="/medical-exams" element={<MedicalExams />} />
                          <Route path="/trainings" element={<Trainings />} />
                          <Route path="/incidents" element={<Incidents />} />
                          <Route path="/vehicles" element={<Vehicles />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/logs" element={<Logs />} />
                          <Route path="/admin/organization" element={<Organization />} />
                          <Route path="/admin/positions" element={<Positions />} />
                          <Route path="/admin/assets" element={<Assets />} />
                          <Route path="/admin/ppe" element={<PPE />} />
                          <Route path="/admin/documents" element={<Documents />} />
                          <Route path="/company-analysis" element={<CompanyAnalysis />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </RBACProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
