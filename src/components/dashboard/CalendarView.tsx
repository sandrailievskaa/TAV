import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Stethoscope, GraduationCap, Wrench, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CalendarEvent {
  id: string;
  type: 'medical' | 'training' | 'inspection';
  title: string;
  employeeName?: string;
  date: string;
  time?: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  daysToShow?: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, daysToShow = 14 }) => {
  const { language } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
    setSelectedEvents(dayEvents);
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const getEventCount = (date: Date): number => {
    return getEventsForDate(date).length;
  };

  const getHighestPriority = (date: Date): 'high' | 'medium' | 'low' | null => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length === 0) return null;
    
    if (dayEvents.some(e => e.priority === 'high')) return 'high';
    if (dayEvents.some(e => e.priority === 'medium')) return 'medium';
    return 'low';
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return Stethoscope;
      case 'training':
        return GraduationCap;
      case 'inspection':
        return Wrench;
      default:
        return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'medical':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700';
      case 'training':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700';
      case 'inspection':
        return 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    
    if (isToday(date)) {
      return language === 'mk' ? 'Денес' : language === 'sq' ? 'Sot' : 'Today';
    }
    if (isTomorrow(date)) {
      return language === 'mk' ? 'Утре' : language === 'sq' ? 'Nesër' : 'Tomorrow';
    }
    
    return format(date, 'MMM d', { locale: undefined });
  };

  const monthNames = {
    mk: ['Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни', 'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    sq: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const dayNames = {
    mk: ['Нед', 'Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб'],
    sq: ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  const currentMonthName = monthNames[language as keyof typeof monthNames]?.[currentMonth.getMonth()] || format(currentMonth, 'MMMM');
  const currentYear = currentMonth.getFullYear();
  const dayLabels = dayNames[language as keyof typeof dayNames] || dayNames.en;

  // Upcoming events (next 14 days)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    const endDate = addDays(today, daysToShow);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= endDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [events, daysToShow]);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {language === 'mk' ? 'Календар на настани' : language === 'sq' ? 'Kalendari i ngjarjeve' : 'Event Calendar'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentMonthName} {currentYear}
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayLabels.map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const eventCount = dayEvents.length;
                const priority = getHighestPriority(day);
                const isCurrentDay = isToday(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={cn(
                      'relative h-12 rounded-md border transition-all duration-200 hover:bg-muted/50',
                      !isCurrentMonth && 'opacity-40',
                      isCurrentDay && 'ring-2 ring-primary',
                      isSelected && 'bg-primary/10 border-primary',
                      eventCount > 0 && 'hover:shadow-md'
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-1">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isCurrentDay && 'text-primary font-bold',
                          isSelected && 'text-primary'
                        )}
                      >
                        {format(day, 'd')}
                      </span>
                      {eventCount > 0 && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {priority && (
                            <div
                              className={cn(
                                'w-1.5 h-1.5 rounded-full',
                                getPriorityColor(priority)
                              )}
                            />
                          )}
                          {eventCount > 1 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{eventCount - 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events List */}
          {upcomingEvents.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'mk' ? 'Претстојни настани' : language === 'sq' ? 'Ngjarjet e ardhshme' : 'Upcoming Events'}
              </h4>
              <div className="space-y-2">
                {upcomingEvents.map((event) => {
                  const Icon = getEventIcon(event.type);
                  const priority = getPriorityColor(event.priority);
                  
                  return (
                    <div
                      key={event.id}
                      onClick={() => {
                        const eventDate = new Date(event.date);
                        setCurrentMonth(startOfMonth(eventDate));
                        handleDateClick(eventDate);
                      }}
                      className={cn(
                        'flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-sm',
                        getEventColor(event.type)
                      )}
                    >
                      <div className={cn('p-1.5 rounded', getEventColor(event.type))}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-xs font-medium truncate">{event.title}</p>
                          <div className={cn('w-2 h-2 rounded-full shrink-0', priority)} />
                        </div>
                        {event.employeeName && (
                          <p className="text-[10px] text-muted-foreground truncate">{event.employeeName}</p>
                        )}
                        <p className="text-[10px] text-muted-foreground">{formatEventDate(event.date)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {upcomingEvents.length === 0 && (
            <div className="mt-6 pt-4 border-t border-border text-center py-4 text-muted-foreground text-sm">
              {language === 'mk' 
                ? 'Нема настани во наредните денови' 
                : language === 'sq' 
                ? 'Nuk ka ngjarje në ditët e ardhshme'
                : 'No upcoming events'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {selectedDate && (
                <>
                  {format(selectedDate, 'EEEE, MMMM d, yyyy', { locale: undefined })}
                  {isToday(selectedDate) && (
                    <Badge variant="outline" className="ml-2">
                      {language === 'mk' ? 'Денес' : language === 'sq' ? 'Sot' : 'Today'}
                    </Badge>
                  )}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {selectedEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {language === 'mk' 
                  ? 'Нема настани за овој датум' 
                  : language === 'sq' 
                  ? 'Nuk ka ngjarje për këtë datë'
                  : 'No events for this date'}
              </div>
            ) : (
              selectedEvents.map((event) => {
                const Icon = getEventIcon(event.type);
                const priority = getPriorityColor(event.priority);
                
                return (
                  <div
                    key={event.id}
                    className={cn(
                      'p-3 rounded-lg border',
                      getEventColor(event.type)
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2 rounded-lg', getEventColor(event.type))}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{event.title}</h4>
                          <div className="flex items-center gap-2">
                            <div className={cn('w-2.5 h-2.5 rounded-full', priority)} />
                            <Badge variant="outline" className="text-xs">
                              {event.priority === 'high' 
                                ? (language === 'mk' ? 'Високо' : language === 'sq' ? 'Lartë' : 'High')
                                : event.priority === 'medium'
                                ? (language === 'mk' ? 'Средно' : language === 'sq' ? 'Mesatare' : 'Medium')
                                : (language === 'mk' ? 'Ниско' : language === 'sq' ? 'Ulët' : 'Low')}
                            </Badge>
                          </div>
                        </div>
                        {event.employeeName && (
                          <p className="text-xs text-muted-foreground mb-1">{event.employeeName}</p>
                        )}
                        {event.time && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </p>
                        )}
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-2">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarView;


