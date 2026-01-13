import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Language } from '@/i18n/translations';
import {
  Bell,
  Search,
  Sun,
  Moon,
  Palette,
  User,
  LogOut,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

const Topbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const themeIcons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    pastel: <Palette className="w-4 h-4" />,
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.common.search}
            className="pl-10 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="topbar-action flex items-center gap-2 px-3">
              <span className="text-lg">{languageFlags[language]}</span>
              <span className="text-sm font-medium hidden sm:inline">
                {languageLabels[language]}
              </span>
              <ChevronDown className="w-3 h-3" />
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

        {/* Theme Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="topbar-action">
              {themeIcons[theme]}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => setTheme('light')}
              className={cn(theme === 'light' && 'bg-muted')}
            >
              <Sun className="w-4 h-4 mr-2" />
              {t.settings.themeLight}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('dark')}
              className={cn(theme === 'dark' && 'bg-muted')}
            >
              <Moon className="w-4 h-4 mr-2" />
              {t.settings.themeDark}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('pastel')}
              className={cn(theme === 'pastel' && 'bg-muted')}
            >
              <Palette className="w-4 h-4 mr-2" />
              {t.settings.themePastel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <button className="topbar-action relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
            3
          </Badge>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Dragan Kostov</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                DK
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              {t.topbar.profile}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="w-4 h-4 mr-2" />
              {t.topbar.help}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {t.topbar.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
