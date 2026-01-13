import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedUsername = (username || '').trim();
      const trimmedPassword = (password || '').trim();
      
      if (!trimmedUsername || !trimmedPassword) {
        setError(t.login.invalidCredentials);
        setIsLoading(false);
        return;
      }

      const success = await login(trimmedUsername, trimmedPassword);
      if (success) {
        navigate('/');
      } else {
        setError(t.login.invalidCredentials);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t.login.loginError);
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
                  placeholder={t.login.usernamePlaceholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.login.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t.login.loggingIn : t.login.loginButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

