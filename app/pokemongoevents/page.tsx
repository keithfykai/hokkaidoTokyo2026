import Image from "next/image";
import Link from "next/link";
import { PokemonEventCards } from "@/components/PokemonEventCards";
import { getPokemonEventsForDate, pokemonGoEvents } from "@/data/pokemonGoEvents";

const calendarStart = new Date("2026-06-01T00:00:00+09:00");
const calendarEnd = new Date("2026-08-31T00:00:00+09:00");

const toDateString = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

const buildMonth = (year: number, month: number) => {
  const first = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const leadingBlanks = first.getUTCDay();
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(Date.UTC(year, month, index + 1));
    return toDateString(date);
  });

  return {
    title: new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "Asia/Tokyo" }).format(first),
    days: [...Array.from({ length: leadingBlanks }, () => null), ...days],
  };
};

const months = [
  buildMonth(2026, 5),
  buildMonth(2026, 6),
  buildMonth(2026, 7),
];

export default function PokemonGoEventsPage() {
  return (
    <main className="pokemon-page">
      <section className="pokemon-page-hero">
        <Link href="/" className="back-link">
          ← Back to itinerary
        </Link>
        <div>
          <p className="eyebrow">Pokemon Go Schedule</p>
          <h1>
            <Image src="/pokeball.svg" alt="" width={48} height={48} />
            Raid Calendar
          </h1>
          <p>
            A visual view of every Pokémon Go event from the attached schedule, covering{" "}
            {toDateString(calendarStart)} through {toDateString(calendarEnd)}.
          </p>
        </div>
      </section>

      <section className="calendar-panel" aria-label="Pokemon Go calendar">
        {months.map((month) => (
          <article className="month-card" key={month.title}>
            <h2>{month.title}</h2>
            <div className="calendar-weekdays" aria-hidden="true">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="calendar-grid">
              {month.days.map((date, index) => {
                const events = date ? getPokemonEventsForDate(date) : [];
                return (
                  <div className={`calendar-day ${events.length ? "calendar-day--active" : ""}`} key={date ?? `${month.title}-${index}`}>
                    {date && (
                      <>
                        <strong>{Number(date.slice(-2))}</strong>
                        {events.slice(0, 3).map((event) => (
                          <span key={event.id}>{event.title}</span>
                        ))}
                        {events.length > 3 && <em>+{events.length - 3} more</em>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      <section className="pokemon-events-list" aria-label="All Pokemon Go events">
        <div className="section-heading">
          <p className="eyebrow">All Events</p>
          <h2>Schedule Details</h2>
        </div>
        <PokemonEventCards events={pokemonGoEvents} />
      </section>
    </main>
  );
}
