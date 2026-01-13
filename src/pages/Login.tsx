import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Globe, Info } from 'lucide-react';

const testUsernames = [
  'admin.test',
  'hse.test',
  'hr.test',
  'medic.test',
  'training.test',
  'safety.test',
  'equipment.test',
  'manager.test',
  'employee.test',
];

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleReset = () => {
    // Clear all localStorage
    localStorage.clear();
    // Logout to reset auth state
    logout();
    // Reload page to clear all state
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = (username || '').trim();
    
    // Demo mode: only username is required, password is ignored
    if (!trimmedUsername) {
      return;
    }

    setIsLoading(true);

    try {
      await login(trimmedUsername, password || '');
      // Always navigate - login always succeeds in demo mode
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      // Even on error, try to navigate in demo mode
      navigate('/dashboard', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        <Card className="shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <LogIn className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">{t.login.systemName}</CardTitle>
            <CardDescription className="text-base">
              {t.login.welcomeText}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Demo Mode – Authentication Disabled</strong>
                <br />
                Use any of the test usernames listed below. Password field is optional.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {t.login.language}
              </Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'mk' | 'sq')}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="mk">Македонски</SelectItem>
                  <SelectItem value="sq">Shqip</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t.login.username}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter test username (e.g., admin.test)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
                <p className="text-xs text-muted-foreground">
                  Test usernames: {testUsernames.join(', ')}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.login.password} <span className="text-muted-foreground">(optional)</span></Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password (ignored in demo mode)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !username.trim()}
              >
                {isLoading ? t.login.loggingIn : t.login.loginButton}
              </Button>
            </form>

            <div className="pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs"
                onClick={handleReset}
              >
                🔄 Reset Cache & Clear Storage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

