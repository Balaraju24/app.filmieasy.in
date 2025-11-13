import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ScheduleDashboard() {
  const completedDays = useMemo(() => [6, 7, 8, 9, 10, 17], []);
  const pendingDays = useMemo(() => [13, 14, 19, 20, 27], []);

  const [month, setMonth] = useState(new Date(2025, 0)); 

  const [schedules] = useState({
    summary: [
      { label: "Total Schedules", value: 125, color: "bg-blue-500" },
      { label: "Completed Schedules", value: 120, color: "bg-green-500" },
      { label: "Pending Schedules", value: 5, color: "bg-red-500" },
    ],
    upcoming: [
      {
        date: "Jan 10, 2025 – 10:00 – 11:00",
        title: "Scene 12",
        note: "Meeting with Friends",
      },
      {
        date: "Jan 11, 2025 – 09:00 – 10:30",
        title: "Scene 18",
        note: "Camera setup rehearsal",
      },
    ],
  });

  return (
    <div className="text-gray-100 p-5 rounded-lg space-y-6">
      <div className="lg:w-[85%] mx-auto justify-content-center flex">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
          {schedules.summary.map((item, i) => (
            <div
              key={i}
              className="relative bg-[#1a1a1a] rounded-md p-3 text-center"
            >
              <div
                className={`${item.color} absolute left-0 top-[17.5%] h-[65%] w-[4px] rounded-md`}
              ></div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-row gap-6">
        <div className="bg-[#1a1a1a] p-4 rounded-lg w-full lg:w-[30%]">
          <DayPicker
            month={month}
            onMonthChange={setMonth}
            weekStartsOn={1}
            modifiers={{
              completed: (day) => completedDays.includes(day.getDate()),
              pending: (day) => pendingDays.includes(day.getDate()),
            }}
            modifiersClassNames={{
              completed: "day-completed",
              pending: "day-pending",
            }}
            classNames={{
              caption: "text-gray-300 mb-2",
              head: "text-gray-400",
              cell: "relative",
              nav_button: "text-gray-300 hover:text-white transition-colors",
              nav_icon: "stroke-current",
              table: "mx-auto",
            }}
          />

          <style>{`
            .day-completed {
              position: relative;
            }
            .day-completed::after {
              content: "";
              position: absolute;
              bottom: 3px;
              left: 20%;
              right: 20%;
              height: 3px;
              border-radius: 2px;
              background-color: #22c55e; /* green */
            }
            .day-pending {
              position: relative;
            }
            .day-pending::after {
              content: "";
              position: absolute;
              bottom: 3px;
              left: 20%;
              right: 20%;
              height: 3px;
              border-radius: 2px;
              background-color: #f97316; /* orange */
            }
          `}</style>
        </div>

        <div className="p-5 rounded-lg w-full lg:w-[65%]">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid grid-cols-3 bg-transparent p-1 rounded-md">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 rounded-sm"
              >
                Upcoming Schedules
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#22c55e] data-[state=active]:text-white text-gray-300 rounded-sm"
              >
                Completed Schedules
              </TabsTrigger>
              <TabsTrigger
                value="missed"
                className="data-[state=active]:bg-[#ef4444] data-[state=active]:text-white text-gray-300 rounded-sm"
              >
                Missed Schedules
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4 space-y-3">
              {schedules.upcoming.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0e0e0e] rounded-lg p-3 flex items-start gap-3 hover:bg-[#262626] transition"
                >
                  <CalendarDays size={18} className="text-orange-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <p className="text-md font-normal">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="mt-4 text-gray-400">
              No completed schedules yet.
            </TabsContent>

            <TabsContent value="missed" className="mt-4 text-gray-400">
              No missed schedules.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}