import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, X, Send, Sparkles, Zap, HelpCircle, BookOpen, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const AIAssistant: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'mk'
        ? 'Здраво! Јас сум вашиот AI асистент. Како можам да ви помогнам со системот?'
        : language === 'sq'
        ? 'Përshëndetje! Unë jam asistenti juaj AI. Si mund t\'ju ndihmoj me sistemin?'
        : 'Hello! I am your AI assistant. How can I help you with the system?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Quick action suggestions - адаптирано за сите јазици
  const quickActions = [
    { 
      icon: BookOpen, 
      text: language === 'mk' ? 'Како да креирам вработен?' : language === 'sq' ? 'Si të krijoj punonjës?' : 'How to create employee?', 
      action: language === 'mk' ? 'како да креирам вработен' : language === 'sq' ? 'si të krijoj punonjës' : 'how to create employee'
    },
    { 
      icon: TrendingUp, 
      text: language === 'mk' ? 'Што е AFR/ASR?' : language === 'sq' ? 'Çfarë është AFR/ASR?' : 'What is AFR/ASR?', 
      action: 'afr asr' // исто за сите јазици
    },
    { 
      icon: AlertCircle, 
      text: language === 'mk' ? 'Аларми за истек' : language === 'sq' ? 'Alarme skadimi' : 'Expiration alerts', 
      action: language === 'mk' ? 'медицински истек' : language === 'sq' ? 'ekzaminime mjekësore skadim' : 'medical exam expiration'
    },
    { 
      icon: Settings, 
      text: language === 'mk' ? 'Роли и дозволи' : language === 'sq' ? 'Rolet dhe lejet' : 'Roles and permissions', 
      action: language === 'mk' ? 'роли' : language === 'sq' ? 'rolet' : 'roles'
    },
  ];

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const lang = language;

    // Navigation questions - прилагодено за сите јазици
    if ((lowerQuestion.includes('како') && lowerQuestion.includes('креирам') && lowerQuestion.includes('вработен')) ||
        (lowerQuestion.includes('how') && lowerQuestion.includes('create') && lowerQuestion.includes('employee')) ||
        (lowerQuestion.includes('si') && lowerQuestion.includes('krijoj') && lowerQuestion.includes('punonjës'))) {
      return lang === 'mk'
        ? 'За да креирате нов вработен:\n1. Одете во модулот "Вработени"\n2. Кликнете на копчето "Додади нов"\n3. Пополнете ги потребните полиња\n4. Зачувајте го профилот'
        : lang === 'sq'
        ? 'Për të krijuar një punonjës të ri:\n1. Shkoni te moduli "Regjistri i Punonjësve"\n2. Klikoni butonin "Shto të ri"\n3. Plotësoni fushat e nevojshme\n4. Ruani profilin'
        : 'To create a new employee:\n1. Go to the "Employee Registry" module\n2. Click the "Add New" button\n3. Fill in the required fields\n4. Save the profile';
    }

    if (lowerQuestion.includes('извештаи') || lowerQuestion.includes('reports')) {
      return lang === 'mk'
        ? 'Извештаите се наоѓаат во модулот "Извештаи и аналитика" во главното мени. Таму можете да генерирате извештаи за обуки, медицински прегледи, ЗО, опрема и инциденти.'
        : lang === 'sq'
        ? 'Raportet gjenden në modulin "Raportet dhe Analitika" në menynë kryesore. Aty mund të gjeneroni raporte për trajnime, ekzaminime mjekësore, PPE, pajisje dhe incidente.'
        : 'Reports are located in the "Reports & Analytics" module in the main menu. There you can generate reports for trainings, medical exams, PPE, equipment, and incidents.';
    }

    if ((lowerQuestion.includes('медицински') && (lowerQuestion.includes('истек') || lowerQuestion.includes('expir'))) ||
        (lowerQuestion.includes('medical') && (lowerQuestion.includes('expir') || lowerQuestion.includes('expir'))) ||
        (lowerQuestion.includes('ekzaminime') && (lowerQuestion.includes('skadim') || lowerQuestion.includes('skaduar')))) {
      return lang === 'mk'
        ? 'За да проверите истек на медицински прегледи:\n1. Одете во "Медицински прегледи"\n2. Погледнете ги алармите на врвот на страницата\n3. Филтрирајте по статус "Истек" или "Истекува наскоро"\n4. Dashboard-от исто така прикажува аларми за истек'
        : lang === 'sq'
        ? 'Për të kontrolluar skadimin e ekzaminimeve mjekësore:\n1. Shkoni te "Ekzaminet Mjekësore"\n2. Shikoni alarmet në krye të faqes\n3. Filtroni sipas statusit "Skaduar" ose "Duke skaduar së shpejti"\n4. Dashboard gjithashtu shfaq alarme për skadim'
        : 'To check medical exam expiration:\n1. Go to "Medical Examinations"\n2. Check the alerts at the top of the page\n3. Filter by status "Expired" or "Expiring Soon"\n4. The Dashboard also shows expiration alerts';
    }

    if (lowerQuestion.includes('afr') || lowerQuestion.includes('asr')) {
      return lang === 'mk'
        ? 'AFR (Accident Frequency Rate) и ASR (Accident Severity Rate) се метрики за безбедност:\n\nAFR = (Број на повреди × 1,000,000) / Вкупно работни часови\nASR = (Вкупно изгубени денови × 1,000,000) / Вкупно работни часови\n\nМожете да ги пресметате во модулот "Повреди и инциденти" со клик на копчето "AFR / ASR".'
        : lang === 'sq'
        ? 'AFR (Shkalla e Frekuencës së Aksidenteve) dhe ASR (Shkalla e Rëndësisë së Aksidenteve) janë metrika sigurie:\n\nAFR = (Numri i lëndimeve × 1,000,000) / Orët totale të punës\nASR = (Ditët totale të humbura × 1,000,000) / Orët totale të punës\n\nMund t\'i llogaritni në modulin "Lëndimet dhe Incidentet" duke klikuar butonin "AFR / ASR".'
        : 'AFR (Accident Frequency Rate) and ASR (Accident Severity Rate) are safety metrics:\n\nAFR = (Number of injuries × 1,000,000) / Total work hours\nASR = (Total lost days × 1,000,000) / Total work hours\n\nYou can calculate them in the "Injuries & Incidents" module by clicking the "AFR / ASR" button.';
    }

    if (lowerQuestion.includes('обуки') || lowerQuestion.includes('trainings') || lowerQuestion.includes('trajnime')) {
      return lang === 'mk'
        ? 'Модулот "Управување со обуки" ви овозможува:\n- Да следите обуки на вработени\n- Да генерирате сертификати\n- Да поставувате аларми за истек\n- Read & Sign функционалност за инструкции\n- Извештаи по вработен, тип и период'
        : lang === 'sq'
        ? 'Moduli "Menaxhimi i Trajnimeve" ju lejon:\n- Të ndiqni trajnimet e punonjësve\n- Të gjeneroni certifikata\n- Të vendosni alarme për skadim\n- Funksionaliteti Read & Sign për udhëzime\n- Raporte sipas punonjësit, llojit dhe periudhës'
        : 'The "Training Management" module allows you:\n- Track employee trainings\n- Generate certificates\n- Set expiration alarms\n- Read & Sign functionality for instructions\n- Reports by employee, type and period';
    }

    if (lowerQuestion.includes('роли') || lowerQuestion.includes('roles') || lowerQuestion.includes('дозволи') || 
        lowerQuestion.includes('rolet') || lowerQuestion.includes('lejet') || lowerQuestion.includes('permissions')) {
      return lang === 'mk'
        ? 'Системот користи Role-Based Access Control (RBAC). Главните улоги се:\n- System Administrator (целосен пристап)\n- HSE Administrator (БЗР и инциденти)\n- HR Manager (вработени)\n- Medical Officer (медицински прегледи)\n- Training Coordinator (обуки)\n- Safety Officer (инциденти)\n- Equipment Manager (ЗО и опрема)\n- Management (read-only)\n- Employee (self-service)'
        : lang === 'sq'
        ? 'Sistemi përdor Role-Based Access Control (RBAC). Rolet kryesore janë:\n- System Administrator (qasje e plotë)\n- HSE Administrator (BZR dhe incidente)\n- HR Manager (punonjës)\n- Medical Officer (ekzaminime mjekësore)\n- Training Coordinator (trajnime)\n- Safety Officer (incidente)\n- Equipment Manager (PPE dhe pajisje)\n- Management (vetëm lexim)\n- Employee (self-service)'
        : 'The system uses Role-Based Access Control (RBAC). Main roles are:\n- System Administrator (full access)\n- HSE Administrator (HSE and incidents)\n- HR Manager (employees)\n- Medical Officer (medical exams)\n- Training Coordinator (trainings)\n- Safety Officer (incidents)\n- Equipment Manager (PPE and equipment)\n- Management (read-only)\n- Employee (self-service)';
    }

    if (lowerQuestion.includes('dashboard') || lowerQuestion.includes('дашборд')) {
      return lang === 'mk'
        ? 'Dashboard-от прикажува:\n- Аларми за истек (обуки, медицински прегледи, ЗО, опрема)\n- Summary бројачи\n- Изгубени работни часови\n- Временски категории: утре, 30 дена, истек\n- Брз преглед на операции'
        : lang === 'sq'
        ? 'Dashboard shfaq:\n- Alarme për skadim (trajnime, ekzaminime mjekësore, PPE, pajisje)\n- Numëruesit e përmbledhjes\n- Orët e humbura të punës\n- Kategoritë kohore: nesër, 30 ditë, skaduar\n- Pamje e shpejtë e operacioneve'
        : 'The Dashboard shows:\n- Expiration alerts (trainings, medical exams, PPE, equipment)\n- Summary counters\n- Lost work hours\n- Time categories: tomorrow, 30 days, expired\n- Quick overview of operations';
    }

    // New responses
    if (lowerQuestion.includes('здраво') || lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('përshëndetje')) {
      return lang === 'mk'
        ? 'Здраво! Добредојдовте! Јас сум вашиот AI асистент и сум тука да ви помогнам со системот. Можете да ме прашате за било што! 😊'
        : lang === 'sq'
        ? 'Përshëndetje! Mirë se vini! Unë jam asistenti juaj AI dhe jam këtu për t\'ju ndihmuar me sistemin. Mund të më pyesni për çdo gjë! 😊'
        : 'Hello! Welcome! I am your AI assistant and I\'m here to help you with the system. You can ask me anything! 😊';
    }

    if (lowerQuestion.includes('помош') || lowerQuestion.includes('help') || lowerQuestion.includes('ndihmë')) {
      return lang === 'mk'
        ? 'Секако! Еве некои работи за кои можам да ви помогнам:\n\n📋 Управување со вработени\n📊 Извештаи и аналитика\n🏥 Медицински прегледи\n🎓 Обуки и сертификати\n⚠️ Инциденти и повреди\n🔐 Роли и дозволи\n📈 Dashboard и метрики\n\nПрашајте ме за било која од овие теми!'
        : lang === 'sq'
        ? 'Sigurisht! Ja disa gjëra për të cilat mund t\'ju ndihmoj:\n\n📋 Menaxhimi i punonjësve\n📊 Raportet dhe analitika\n🏥 Ekzaminimet mjekësore\n🎓 Trajnimet dhe certifikatat\n⚠️ Incidentet dhe lëndimet\n🔐 Rolet dhe lejet\n📈 Dashboard dhe metrikat\n\nMë pyesni për çdo nga këto tema!'
        : 'Of course! Here are some things I can help you with:\n\n📋 Employee management\n📊 Reports and analytics\n🏥 Medical examinations\n🎓 Trainings and certificates\n⚠️ Incidents and injuries\n🔐 Roles and permissions\n📈 Dashboard and metrics\n\nAsk me about any of these topics!';
    }

    if (lowerQuestion.includes('календар') || lowerQuestion.includes('calendar') || lowerQuestion.includes('kalendar')) {
      return lang === 'mk'
        ? 'Календарот на Dashboard-от прикажува:\n- Настани за обуки\n- Медицински прегледи\n- Инспекции на возила\n- Приоритети според истек\n\nМожете да кликнете на датум за да видите детали за настаните на тој ден.'
        : lang === 'sq'
        ? 'Kalendari në Dashboard shfaq:\n- Eventet për trajnime\n- Ekzaminimet mjekësore\n- Inspeksionet e automjeteve\n- Prioritetet sipas skadimit\n\nMund të klikoni në një datë për të parë detajet e eventeve në atë ditë.'
        : 'The calendar on the Dashboard shows:\n- Training events\n- Medical examinations\n- Vehicle inspections\n- Priorities based on expiration\n\nYou can click on a date to see details of events on that day.';
    }

    if (lowerQuestion.includes('инцидент') || lowerQuestion.includes('incident') || lowerQuestion.includes('lëndim') ||
        lowerQuestion.includes('повреда') || lowerQuestion.includes('injury')) {
      return lang === 'mk'
        ? 'За да регистрирате инцидент:\n1. Одете во "Повреди и инциденти"\n2. Кликнете "Додади нов"\n3. Изберете тип (повреда, инцидент, near miss)\n4. Пополнете ги деталите\n5. Зачувајте\n\nСистемот автоматски ќе пресмета AFR/ASR метрики.'
        : lang === 'sq'
        ? 'Për të regjistruar një incident:\n1. Shkoni te "Lëndimet dhe Incidentet"\n2. Klikoni "Shto të ri"\n3. Zgjidhni llojin (lëndim, incident, near miss)\n4. Plotësoni detajet\n5. Ruani\n\nSistemi automatikisht do të llogarisë metrikat AFR/ASR.'
        : 'To register an incident:\n1. Go to "Injuries & Incidents"\n2. Click "Add New"\n3. Select type (injury, incident, near miss)\n4. Fill in the details\n5. Save\n\nThe system will automatically calculate AFR/ASR metrics.';
    }

    if (lowerQuestion.includes('зо') || lowerQuestion.includes('ppe') || lowerQuestion.includes('oprema') || 
        lowerQuestion.includes('equipment') || lowerQuestion.includes('pajisje')) {
      return lang === 'mk'
        ? 'Управување со ЗО и опрема:\n- Следење на истек на ЗО\n- Доделување на вработени\n- Аларми за истек\n- Извештаи за опрема\n\nМожете да ги најдете во модулот "Администрација" → "ЗО" или "Опрема".'
        : lang === 'sq'
        ? 'Menaxhimi i PPE dhe pajisjeve:\n- Ndiqja e skadimit të PPE\n- Caktimi i punonjësve\n- Alarme për skadim\n- Raporte për pajisjet\n\nMund t\'i gjeni në modulin "Administrimi" → "PPE" ose "Pajisjet".'
        : 'PPE and equipment management:\n- Tracking PPE expiration\n- Assignment to employees\n- Expiration alerts\n- Equipment reports\n\nYou can find them in the "Administration" module → "PPE" or "Equipment".';
    }

    return lang === 'mk'
      ? 'Извинете, не сум сигурен како да одговорам на тоа прашање. Можете да ме прашате за:\n\n✅ Како да креирате нов вработен\n✅ Каде се извештаите\n✅ Како да проверите истек на медицински прегледи\n✅ Што е AFR/ASR\n✅ Управување со обуки\n✅ Роли и дозволи\n✅ Dashboard функционалности\n✅ Календар и настани\n✅ Инциденти и повреди\n✅ ЗО и опрема\n\nИли едноставно напишете "помош" за да видите сите опции! 😊'
      : lang === 'sq'
      ? 'Më vjen keq, nuk jam i sigurt se si t\'u përgjigjem asaj pyetjeje. Mund të më pyesni për:\n\n✅ Si të krijoni një punonjës të ri\n✅ Ku janë raportet\n✅ Si të kontrolloni skadimin e ekzaminimeve mjekësore\n✅ Çfarë është AFR/ASR\n✅ Menaxhimi i trajnimeve\n✅ Rolet dhe lejet\n✅ Funksionalitetet e Dashboard\n✅ Kalendari dhe eventet\n✅ Incidentet dhe lëndimet\n✅ PPE dhe pajisjet\n\nOse thjesht shkruani "ndihmë" për të parë të gjitha opsionet! 😊'
      : 'Sorry, I\'m not sure how to answer that question. You can ask me about:\n\n✅ How to create a new employee\n✅ Where reports are\n✅ How to check medical exam expiration\n✅ What is AFR/ASR\n✅ Training management\n✅ Roles and permissions\n✅ Dashboard functionalities\n✅ Calendar and events\n✅ Incidents and injuries\n✅ PPE and equipment\n\nOr simply type "help" to see all options! 😊';
  };

  // Simulate typing animation
  useEffect(() => {
    if (isTyping && typingText) {
      const fullText = typingText;
      let currentIndex = 0;
      
      // Add empty message first
      const tempId = Date.now().toString();
      setMessages((prev) => [...prev, {
        id: tempId,
        role: 'assistant' as const,
        content: '',
        timestamp: new Date(),
        isTyping: true,
      }]);

      const typeInterval = setInterval(() => {
        currentIndex += 2; // Speed up typing
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.id === tempId) {
            lastMessage.content = fullText.substring(0, currentIndex);
            if (currentIndex >= fullText.length) {
              lastMessage.isTyping = false;
              clearInterval(typeInterval);
              setIsTyping(false);
              setTypingText('');
            }
          }
          return newMessages;
        });
      }, 15); // Typing speed

      return () => {
        clearInterval(typeInterval);
      };
    }
  }, [typingText]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const response = getResponse(question);
      setTypingText(response);
    }, 500);
  };

  const handleQuickAction = (action: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: action,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(action);
      setTypingText(response);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 group"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-ping opacity-75" />
          <Bot className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-primary/20 rounded-xl shadow-2xl z-50 flex flex-col animate-slide-in-right">
          <CardHeader className="pb-3 border-b-2 border-border/50 flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {language === 'mk' ? 'AI Асистент' : language === 'sq' ? 'Asistent AI' : 'AI Assistant'}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {language === 'mk' ? 'Тука за да ви помогнам' : language === 'sq' ? 'Këtu për t\'ju ndihmuar' : 'Here to help you'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-3 border-b border-border/50 bg-gradient-to-r from-muted/30 to-muted/10">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                {language === 'mk' ? 'Брзи акции:' : language === 'sq' ? 'Veprime të shpejta:' : 'Quick actions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-background to-background/80 border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-xs font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <Icon className="w-3 h-3" />
                      <span className="text-[10px]">{action.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3 animate-fade-in',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-xl px-4 py-2.5 max-w-[80%] shadow-sm transition-all duration-200',
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-md'
                        : 'bg-gradient-to-br from-muted to-muted/80 border border-border/50 hover:shadow-md'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1.5">
                      {message.timestamp.toLocaleTimeString(language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-primary-foreground shadow-md">
                        <Sparkles className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && !typingText && (
                <div className="flex gap-3 justify-start animate-fade-in">
                  <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-br from-muted to-muted/80 rounded-xl px-4 py-3 border border-border/50 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <CardContent className="pt-4 border-t-2 border-border/50 bg-gradient-to-r from-muted/20 to-muted/10">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === 'mk'
                    ? 'Прашајте нешто за системот...'
                    : language === 'sq'
                    ? 'Pyetni diçka për sistemin...'
                    : 'Ask something about the system...'
                }
                className="flex-1 border-2 focus:border-primary/50"
              />
              <Button 
                onClick={handleSend} 
                size="icon"
                className="bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

