import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Language } from '@/i18n/translations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const languageLabels: Record<Language, string> = {
  en: 'English',
  mk: 'Македонски',
  sq: 'Shqip',
};

const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  mk: '🇲🇰',
  sq: '🇦🇱',
};

// Background images for carousel - using placeholder gradients for demo
const backgroundImages = [
  'linear-gradient(135deg, hsl(215 25% 18% / 0.9), hsl(213 55% 25% / 0.85)), url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80")',
  'linear-gradient(135deg, hsl(215 25% 18% / 0.9), hsl(213 55% 25% / 0.85)), url("https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1920&q=80")',
  'linear-gradient(135deg, hsl(215 25% 18% / 0.9), hsl(213 55% 25% / 0.85)), url("https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920&q=80")',
  'linear-gradient(135deg, hsl(215 25% 18% / 0.9), hsl(213 55% 25% / 0.85)), url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80")',
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const [currentBg, setCurrentBg] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Background carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate to dashboard
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background with carousel */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-[2000ms] bg-cover bg-center',
              currentBg === index ? 'opacity-100' : 'opacity-0'
            )}
            style={{ backgroundImage: bg }}
          />
        ))}
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{t.login.title}</h1>
              <p className="text-lg text-white/80">{t.login.subtitle}</p>
            </div>
          </div>
          
          <p className="text-xl text-white/70 max-w-lg leading-relaxed">
            {t.login.welcome}
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 gap-6 max-w-lg">
            {[
              { icon: '🛡️', label: language === 'mk' ? 'Безбедност' : language === 'sq' ? 'Siguria' : 'Safety' },
              { icon: '📋', label: language === 'mk' ? 'Обуки' : language === 'sq' ? 'Trajnimet' : 'Training' },
              { icon: '🏥', label: language === 'mk' ? 'Здравје' : language === 'sq' ? 'Shëndeti' : 'Health' },
              { icon: '📊', label: language === 'mk' ? 'Аналитика' : language === 'sq' ? 'Analitika' : 'Analytics' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-16 flex gap-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                currentBg === index ? 'w-8 bg-white' : 'bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full lg:w-2/5 flex flex-col bg-background">
        {/* Language selector */}
        <div className="flex justify-end p-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                <span className="text-lg">{languageFlags[language]}</span>
                <span className="font-medium">{languageLabels[language]}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(language === lang && 'bg-muted')}
                >
                  <span className="mr-2">{languageFlags[lang]}</span>
                  {languageLabels[lang]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Login form */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{t.login.title}</h1>
                <p className="text-sm text-muted-foreground">{t.login.subtitle}</p>
              </div>
            </div>
            
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-semibold">{t.login.signIn}</h2>
              <p className="text-muted-foreground mt-1">
                {language === 'mk' ? 'Внесете ги вашите податоци за да продолжите' : 
                 language === 'sq' ? 'Shkruani të dhënat tuaja për të vazhduar' : 
                 'Enter your credentials to continue'}
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">{t.login.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t.login.passwordLabel}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.login.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    {t.login.rememberMe}
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  {t.login.forgotPassword}
                </button>
              </div>
              
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {language === 'mk' ? 'Се најавува...' : language === 'sq' ? 'Duke hyrë...' : 'Signing in...'}
                  </span>
                ) : (
                  t.login.signIn
                )}
              </Button>
            </form>
            
            {/* Demo credentials hint */}
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                {language === 'mk' ? '💡 Демо режим: Внесете било кои податоци за да се најавите' :
                 language === 'sq' ? '💡 Modaliteti demo: Shkruani çfarëdo të dhëna për të hyrë' :
                 '💡 Demo mode: Enter any credentials to log in'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 text-center text-xs text-muted-foreground">
          © 2026 TAV Macedonia · {language === 'mk' ? 'Сите права задржани' : language === 'sq' ? 'Të gjitha të drejtat e rezervuara' : 'All rights reserved'}
        </div>
      </div>
    </div>
  );
};

export default Login;
