"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getEvents, getMassSchedules } from "@/lib/actions";

interface EventItem {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    isMass?: boolean;
}

interface MassScheduleItem {
    id: number;
    day_of_week: number;
    time: string;
    title: string;
    description: string;
    location: string;
}

// Generate mass events for the entire year based on database schedules
function generateMassEvents(massSchedules: MassScheduleItem[], year: number): EventItem[] {
    const massEvents: EventItem[] = [];
    let id = -1; // Negative IDs for mass events

    if (!massSchedules || massSchedules.length === 0) return [];

    const startDate = new Date(year, 0, 1); // Jan 1
    const endDate = new Date(year, 11, 31); // Dec 31

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        const massForDay = massSchedules.find(m => m.day_of_week === dayOfWeek);

        if (massForDay) {
            const [hours, minutes] = massForDay.time.split(':');
            const eventDate = new Date(d);
            eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            massEvents.push({
                id: id--,
                title: massForDay.title,
                description: massForDay.description || `Celebração Eucarística às ${massForDay.time}`,
                event_date: eventDate.toISOString(),
                location: massForDay.location || "Igreja Matriz",
                isMass: true,
            });
        }
    }

    return massEvents;
}

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<EventItem[]>([]);
    const [massSchedules, setMassSchedules] = useState<MassScheduleItem[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<EventItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const [eventsData, massData] = await Promise.all([
            getEvents(),
            getMassSchedules()
        ]);
        setEvents(eventsData || []);
        setMassSchedules(massData || []);
    }

    // Generate mass events for current and next year
    const massEvents = useMemo(() => {
        if (massSchedules.length === 0) return [];
        const currentYear = new Date().getFullYear();
        return [
            ...generateMassEvents(massSchedules, currentYear),
            ...generateMassEvents(massSchedules, currentYear + 1),
        ];
    }, [massSchedules]);

    // Combine database events with mass events
    const allEvents = useMemo(() => {
        return [...events, ...massEvents];
    }, [events, massEvents]);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDate = (day: number) => {
        const dateStr = new Date(year, month, day).toISOString().split('T')[0];
        return allEvents.filter(event => {
            const eventDate = new Date(event.event_date).toISOString().split('T')[0];
            return eventDate === dateStr;
        });
    };

    const handleDateClick = (day: number) => {
        const clickedDate = new Date(year, month, day);
        setSelectedDate(clickedDate);
        setSelectedEvents(getEventsForDate(day));
    };

    const closeModal = () => {
        setSelectedDate(null);
        setSelectedEvents([]);
    };

    // Generate calendar grid
    const calendarDays = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEvents = getEventsForDate(day);
        const hasEvents = dayEvents.length > 0;
        const massEvents = dayEvents.filter(e => e.isMass);
        const otherEvents = dayEvents.filter(e => !e.isMass);
        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

        calendarDays.push(
            <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square border border-gray-200 p-1 md:p-2 cursor-pointer hover:bg-accent transition-colors
                    ${isToday ? 'bg-primary/10 border-primary' : 'bg-white'}`}
            >
                <div className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-gray-700'}`}>
                    {day}
                </div>
                {hasEvents && (
                    <div className="mt-1 space-y-0.5">
                        {massEvents.slice(0, 2).map((mass, idx) => (
                            <div key={idx} className="text-[10px] md:text-xs bg-primary text-white px-1 py-0.5 rounded truncate">
                                {mass.title.length > 15 ? mass.title.substring(0, 15) + '...' : mass.title}
                            </div>
                        ))}
                        {massEvents.length > 2 && (
                            <div className="text-[10px] text-gray-500">+{massEvents.length - 2} missas</div>
                        )}
                        {otherEvents.slice(0, 2).map((event) => (
                            <div key={event.id} className="text-[10px] md:text-xs bg-secondary text-white px-1 py-0.5 rounded truncate">
                                {event.title}
                            </div>
                        ))}
                        {otherEvents.length > 2 && (
                            <div className="text-[10px] text-gray-500">+{otherEvents.length - 2} eventos</div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">
                        Eventos
                    </span>
                    <h2 className="text-3xl font-bold text-primary">Agenda Paroquial</h2>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Calendar Header */}
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-white/10 rounded-full transition"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <h3 className="text-xl font-bold">
                            {monthNames[month]} {year}
                        </h3>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-white/10 rounded-full transition"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="p-2 text-center text-xs md:text-sm font-bold text-gray-600">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7">
                        {calendarDays}
                    </div>

                    {/* Legend */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded"></div>
                            <span className="text-gray-600">Santa Missa</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-secondary rounded"></div>
                            <span className="text-gray-600">Eventos</span>
                        </div>
                    </div>
                </div>

                {/* Event Modal */}
                {selectedDate && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
                            <div className="sticky top-0 bg-primary text-white p-4 flex justify-between items-center">
                                <h3 className="text-lg font-bold">
                                    {selectedDate.toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </h3>
                                <button onClick={closeModal} className="p-1 hover:bg-white/10 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                {selectedEvents.length === 0 ? (
                                    <p className="text-gray-500 text-center">Nenhum evento nesta data.</p>
                                ) : (
                                    <>
                                        {/* Mass events first */}
                                        {selectedEvents.filter(e => e.isMass).map((event) => (
                                            <div key={event.id} className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r">
                                                <h4 className="font-bold text-primary text-lg">{event.title}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                <p className="text-xs text-gray-500 mt-2">📍 {event.location}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    🕐 {new Date(event.event_date).toLocaleTimeString('pt-BR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        ))}
                                        {/* Other events */}
                                        {selectedEvents.filter(e => !e.isMass).map((event) => (
                                            <div key={event.id} className="border-l-4 border-secondary pl-4 py-2">
                                                <h4 className="font-bold text-primary text-lg">{event.title}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                {event.location && (
                                                    <p className="text-xs text-gray-500 mt-2">📍 {event.location}</p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-1">
                                                    🕐 {new Date(event.event_date).toLocaleTimeString('pt-BR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
