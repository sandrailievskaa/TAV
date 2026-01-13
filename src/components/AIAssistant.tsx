import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const lang = language;

    // Navigation questions
    if (lowerQuestion.includes('како') && lowerQuestion.includes('креирам') && lowerQuestion.includes('вработен')) {
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

    if (lowerQuestion.includes('медицински') && (lowerQuestion.includes('истек') || lowerQuestion.includes('expir'))) {
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

    if (lowerQuestion.includes('обуки') || lowerQuestion.includes('trainings')) {
      return lang === 'mk'
        ? 'Модулот "Управување со обуки" ви овозможува:\n- Да следите обуки на вработени\n- Да генерирате сертификати\n- Да поставувате аларми за истек\n- Read & Sign функционалност за инструкции\n- Извештаи по вработен, тип и период'
        : lang === 'sq'
        ? 'Moduli "Menaxhimi i Trajnimeve" ju lejon:\n- Të ndiqni trajnimet e punonjësve\n- Të gjeneroni certifikata\n- Të vendosni alarme për skadim\n- Funksionaliteti Read & Sign për udhëzime\n- Raporte sipas punonjësit, llojit dhe periudhës'
        : 'The "Training Management" module allows you:\n- Track employee trainings\n- Generate certificates\n- Set expiration alarms\n- Read & Sign functionality for instructions\n- Reports by employee, type and period';
    }

    if (lowerQuestion.includes('роли') || lowerQuestion.includes('roles') || lowerQuestion.includes('дозволи')) {
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

    // Default response
    return lang === 'mk'
      ? 'Извинете, не сум сигурен како да одговорам на тоа прашање. Можете да ме прашате за:\n- Како да креирате нов вработен\n- Каде се извештаите\n- Како да проверите истек на медицински прегледи\n- Што е AFR/ASR\n- Управување со обуки\n- Роли и дозволи\n- Dashboard функционалности'
      : lang === 'sq'
      ? 'Më vjen keq, nuk jam i sigurt se si t\'u përgjigjem asaj pyetjeje. Mund të më pyesni për:\n- Si të krijoni një punonjës të ri\n- Ku janë raportet\n- Si të kontrolloni skadimin e ekzaminimeve mjekësore\n- Çfarë është AFR/ASR\n- Menaxhimi i trajnimeve\n- Rolet dhe lejet\n- Funksionalitetet e Dashboard'
      : 'Sorry, I\'m not sure how to answer that question. You can ask me about:\n- How to create a new employee\n- Where reports are\n- How to check medical exam expiration\n- What is AFR/ASR\n- Training management\n- Roles and permissions\n- Dashboard functionalities';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
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
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">
                {language === 'mk' ? 'AI Асистент' : language === 'sq' ? 'Asistent AI' : 'AI Assistant'}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg px-4 py-2 max-w-[80%]',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString(language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-muted">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <CardContent className="pt-4 border-t border-border">
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
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
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

