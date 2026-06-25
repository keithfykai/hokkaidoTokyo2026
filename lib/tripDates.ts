import type { ItineraryDay } from "@/data/itinerary";

export const getTokyoDateString = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

export const getTripPhase = (now: Date, days: ItineraryDay[]) => {
  const today = getTokyoDateString(now);
  const firstDay = days[0];
  const lastDay = days[days.length - 1];
  const activeIndex = days.findIndex((day) => day.date === today);

  if (today < firstDay.date) {
    return { phase: "before" as const, activeIndex: 0 };
  }

  if (activeIndex >= 0) {
    return { phase: "during" as const, activeIndex };
  }

  if (today > lastDay.date) {
    return { phase: "after" as const, activeIndex: 0 };
  }

  const nextIndex = days.findIndex((day) => day.date > today);
  return { phase: "during" as const, activeIndex: Math.max(0, nextIndex - 1) };
};

export const getStartDateInTokyo = () => new Date("2026-06-27T15:00:00.000Z");
