// import * as React from "react";
// import {
//   addDays,
//   isSameDay,
//   isBefore,
//   startOfMonth,
//   endOfMonth,
// } from "date-fns";

// interface CalendarProps {
//   selectedDates: Date[];
//   onSelect: (dates: Date[]) => void;
//   maxSelections?: number;
// }

// export default function Calendar({
//   selectedDates = [],
//   onSelect,
//   maxSelections = 3,
// }: CalendarProps) {
//   const today = new Date();
//   const monthStart = startOfMonth(today);
//   const monthEnd = endOfMonth(today);

//   const days: Date[] = [];
//   for (let d = monthStart; d <= monthEnd; d = addDays(d, 1)) {
//     days.push(d);
//   }

//   const toggleDate = (day: Date) => {
//     if (isBefore(day, today)) return;

//     const exists = selectedDates.some((d) => isSameDay(d, day));
//     let updated: Date[];

//     if (exists) {
//       updated = selectedDates.filter((d) => !isSameDay(d, day));
//     } else {
//       if (selectedDates.length >= maxSelections) return;
//       updated = [...selectedDates, day];
//     }

//     onSelect(updated);
//   };

//   return (
//     <div className="grid grid-cols-7 gap-2 p-4 bg-muted rounded-xl">
//       {days.map((day, idx) => {
//         const disabled = isBefore(day, today);
//         const selected = selectedDates.some((d) => isSameDay(d, day));

//         return (
//           <button
//             key={idx}
//             onClick={() => toggleDate(day)}
//             disabled={disabled}
//             className={`p-2 rounded-lg text-sm border
// ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-accent"}
// ${selected ? "bg-primary text-primary-foreground" : ""}
// `}
//           >
//             {day.getDate()}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
import * as React from "react";
import {
  addDays,
  isSameDay,
  isBefore,
  startOfMonth,
  endOfMonth,
} from "date-fns";

interface CalendarProps {
  selectedDates: Date[];
  onSelect: (dates: Date[]) => void;
  maxSelections?: number;
}

export default function Calendar({
  selectedDates = [],
  onSelect,
  maxSelections = 3,
}: CalendarProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const days: Date[] = [];
  for (let d = monthStart; d <= monthEnd; d = addDays(d, 1)) {
    days.push(d);
  }

  const toggleDate = (day: Date) => {
    if (isBefore(day, today)) return;

    const exists = selectedDates.some((d) => isSameDay(d, day));
    let updated: Date[];

    if (exists) {
      updated = selectedDates.filter((d) => !isSameDay(d, day));
    } else {
      if (selectedDates.length >= maxSelections) return;
      updated = [...selectedDates, day];
    }

    onSelect(updated);
  };

  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      {days.map((day, idx) => {
        const disabled = isBefore(day, today);
        const selected = selectedDates.some((d) => isSameDay(d, day));

        return (
          <button
            key={idx}
            onClick={() => toggleDate(day)}
            disabled={disabled}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ease-out border-2 
            ${
              disabled
                ? "opacity-30 cursor-not-allowed text-gray-400 border-transparent"
                : selected
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md cursor-pointer"
            }
            `}
          >
            {day.getDate()}
          </button>
        );
      })}
    </div>
  );
}
