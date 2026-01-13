import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Language } from '@/i18n/translations';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sun, Moon, Palette, Globe, Bell, Shield, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'mk', label: 'Македонски', flag: '🇲🇰' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
];

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.settings.title}</h1>
        <p className="page-description">{t.settings.subtitle}</p>
      </div>

      {/* Language Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{t.settings.language}</h2>
            <p className="text-sm text-muted-foreground">{t.settings.languageDescription}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => setLanguage(option.code)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                language === option.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30 hover:bg-muted/50'
              )}
            >
              <span className="text-2xl">{option.flag}</span>
              <span className={cn('font-medium', language === option.code && 'text-primary')}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{t.settings.theme}</h2>
            <p className="text-sm text-muted-foreground">{t.settings.themeDescription}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'light', label: t.settings.themeLight, icon: Sun, preview: 'bg-white' },
            { id: 'dark', label: t.settings.themeDark, icon: Moon, preview: 'bg-slate-900' },
            { id: 'pastel', label: t.settings.themePastel, icon: Palette, preview: 'bg-blue-100' },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setTheme(option.id as 'light' | 'dark' | 'pastel')}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border-2 transition-all',
                  theme === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 hover:bg-muted/50'
                )}
              >
                <div className={cn('w-8 h-8 rounded-lg shadow-sm border', option.preview)} />
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className={cn('font-medium', theme === option.id && 'text-primary')}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{t.settings.notifications}</h2>
            <p className="text-sm text-muted-foreground">{t.settings.notificationsDescription}</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { id: 'flight-alerts', label: t.settings.notificationOptions.flightAlerts, description: t.settings.notificationOptions.flightAlertsDesc, enabled: true },
            { id: 'system-alerts', label: t.settings.notificationOptions.systemAlerts, description: t.settings.notificationOptions.systemAlertsDesc, enabled: true },
            { id: 'email-digest', label: t.settings.notificationOptions.emailDigest, description: t.settings.notificationOptions.emailDigestDesc, enabled: false },
            { id: 'sound', label: t.settings.notificationOptions.sound, description: t.settings.notificationOptions.soundDesc, enabled: false },
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between">
              <div>
                <Label htmlFor={notification.id} className="font-medium cursor-pointer">
                  {notification.label}
                </Label>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <Switch id={notification.id} defaultChecked={notification.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">{t.settings.security}</h2>
            <p className="text-sm text-muted-foreground">{t.settings.securityDescription}</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { id: '2fa', label: t.settings.securityOptions.twoFactor, description: t.settings.securityOptions.twoFactorDesc, enabled: true },
            { id: 'session', label: t.settings.securityOptions.sessionTimeout, description: t.settings.securityOptions.sessionTimeoutDesc, enabled: true },
            { id: 'login-alerts', label: t.settings.securityOptions.loginAlerts, description: t.settings.securityOptions.loginAlertsDesc, enabled: false },
          ].map((security) => (
            <div key={security.id} className="flex items-center justify-between">
              <div>
                <Label htmlFor={security.id} className="font-medium cursor-pointer">
                  {security.label}
                </Label>
                <p className="text-sm text-muted-foreground">{security.description}</p>
              </div>
              <Switch id={security.id} defaultChecked={security.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          {t.common.save}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
