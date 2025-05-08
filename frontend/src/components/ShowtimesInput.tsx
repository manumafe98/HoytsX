import { DateShowtime } from "@/types/dateShowtime.type";
import { Showtime } from "@/types/showtime.type";

interface ShowtimesInputProps {
  showtimes: DateShowtime[];
  onDayChange: (dayIndex: number, value: string) => void;
  onShowtimeChange: (
    dayIndex: number,
    showtimeIndex: number,
    field: keyof Showtime,
    value: string,
  ) => void;
  onAddShowtime: (dayIndex: number) => void;
  onRemoveShowtime: (dayIndex: number, showtimeIndex: number) => void;
  onAddDay: () => void;
}

export const ShowtimesInput = ({
  showtimes,
  onDayChange,
  onShowtimeChange,
  onAddShowtime,
  onRemoveShowtime,
  onAddDay,
}: ShowtimesInputProps) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-[75%]">
      <label className="text-xl font-semibold mb-1 text-primary">
        Showtimes
      </label>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {showtimes.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  value={day.date}
                  onChange={(e) => onDayChange(dayIndex, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:primary"
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {day.showtimes.map((showtime, showtimeIndex) => (
              <div
                key={showtimeIndex}
                className="p-3 mb-3 bg-white rounded border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={showtime.time}
                      onChange={(e) =>
                        onShowtimeChange(
                          dayIndex,
                          showtimeIndex,
                          "time",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost (tokens)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={showtime.cost}
                      onChange={(e) =>
                        onShowtimeChange(
                          dayIndex,
                          showtimeIndex,
                          "cost",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Tickets
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={showtime.maxTickets}
                      onChange={(e) =>
                        onShowtimeChange(
                          dayIndex,
                          showtimeIndex,
                          "maxTickets",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:primary"
                    />
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onRemoveShowtime(dayIndex, showtimeIndex)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Remove Showtime
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => onAddShowtime(dayIndex)}
                className="mt-3 bg-primary text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
              >
                + Add Another Showtime
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onAddDay}
          className="mt-3 bg-primary text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
        >
          + Add Another Day
        </button>
      </div>
    </div>
  );
};
