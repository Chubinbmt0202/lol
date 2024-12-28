"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
const SchedulePage = () => {
  const events = [
    {
      id: 1,
      title: "Tiếng Anh cơ bản - B201",
      daysOfWeek: [1, 3, 5],
      startTime: "07:30",
      endTime: "09:00",
      backgroundColor: "#60a5fa",
      borderColor: "#3b82f6",
    },
    {
      id: 2,
      title: "IELTS Writing",
      daysOfWeek: [2, 4],
      startTime: "13:30",
      endTime: "15:00",
      backgroundColor: "#34d399",
      borderColor: "#10b981",
    },
    {
      id: 3,
      title: "Business English",
      daysOfWeek: [3, 5],
      startTime: "15:30",
      endTime: "17:00",
      backgroundColor: "#f472b6",
      borderColor: "#ec4899",
    },
    {
      id: 4,
      title: "TOEIC Preparation",
      daysOfWeek: [2, 4, 6],
      startTime: "09:30",
      endTime: "11:00",
      backgroundColor: "#a78bfa",
      borderColor: "#8b5cf6",
    },
    {
      id: 5,
      title: "English Conversation",
      daysOfWeek: [1, 3, 5],
      startTime: "17:30",
      endTime: "19:00",
      backgroundColor: "#fbbf24",
      borderColor: "#f59e0b",
    },
  ];

  return (
    <div className="container mx-auto px-3 md:px-6">
      <div className="card card-bordered">
        <div className="card-body p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <div>
              <h2 className="card-title text-xl md:text-2xl lg:text-3xl text-primary font-bold font-geist-sans">
                Lịch giảng dạy
              </h2>
              <p className="text-sm md:text-base text-base-content/70 mt-1 md:mt-2 font-geist-sans">
                Quản lý lịch dạy và thời khóa biểu các lớp học
              </p>
            </div>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            events={events as any}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek",
            }}
            eventContent={(eventInfo) => (
              <div className="p-2 md:p-3 rounded-lg hover:scale-[1.02] transition-all duration-200">
                <div className="flex items-center gap-2 md:gap-3">
                  <div>
                    <div className="font-medium text-white text-xs font-geist-sans">
                      {eventInfo.event.title}
                    </div>
                    <div className="text-white/90 text-[10px] md:text-xs font-geist-sans">
                      {eventInfo.event.extendedProps.teacher}
                    </div>
                    <div className="text-white/90 text-[10px] md:text-xs mt-0.5 md:mt-1 font-geist-mono">
                      {eventInfo.event.startStr.slice(11, 16)} -{" "}
                      {eventInfo.event.endStr.slice(11, 16)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            locale="vi"
            firstDay={1}
            height="auto"
            dayMaxEvents={3}
            eventDisplay="block"
            slotMinTime="07:00:00"
            slotMaxTime="21:00:00"
            buttonText={{
              today: "Hôm nay",
              month: "Tháng",
              week: "Tuần",
            }}
            dayHeaderFormat={{
              weekday: "long",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
