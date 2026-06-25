"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ItineraryDay, ItineraryStop } from "@/data/itinerary";
import { getPokemonEventsForDate } from "@/data/pokemonGoEvents";
import { getStartDateInTokyo, getTripPhase } from "@/lib/tripDates";
import { PokemonEventCards } from "./PokemonEventCards";

type TripStats = {
  startDate: string;
  endDate: string;
  timezone: string;
  heroTitle: string;
  heroEyebrow: string;
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type TripExperienceProps = {
  days: ItineraryDay[];
  stats: TripStats;
};

const formatDisplayDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${date}T00:00:00+09:00`));

const getCountdown = (): Countdown | null => {
  const distance = getStartDateInTokyo().getTime() - Date.now();

  if (distance <= 0) {
    return null;
  }

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1_000),
  };
};

const stopIcon = (kind: ItineraryStop["kind"]) => {
  switch (kind) {
    case "food":
      return "🍜";
    case "hotel":
      return "🛏️";
    case "shopping":
      return "🛍️";
    case "sightseeing":
      return "📍";
    case "travel":
      return "🚗";
    default:
      return "✨";
  }
};

export function TripExperience({ days, stats }: TripExperienceProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasSetInitialDay = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  const phase = useMemo(() => {
    if (!mounted) {
      return { phase: "before" as const, activeIndex: 0 };
    }

    return getTripPhase(new Date(), days);
  }, [days, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const tick = () => setCountdown(getCountdown());
    tick();
    const timer = window.setInterval(tick, 1_000);

    return () => window.clearInterval(timer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || hasSetInitialDay.current) {
      return;
    }

    hasSetInitialDay.current = true;
    setActiveIndex(phase.activeIndex);
  }, [mounted, phase.activeIndex]);

  const selectDay = (index: number) => {
    setActiveIndex(index);

    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || "0");
    const step = carousel.clientWidth + (Number.isNaN(gap) ? 0 : gap);

    carousel.scrollTo({
      left: index * step,
      behavior: "smooth",
    });
  };

  const handleCarouselScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const styles = window.getComputedStyle(target);
    const gap = Number.parseFloat(styles.columnGap || "0");
    const step = target.clientWidth + (Number.isNaN(gap) ? 0 : gap);
    const index = Math.round(target.scrollLeft / step);

    if (index !== activeIndex && days[index]) {
      setActiveIndex(index);
    }
  };

  const hokkaidoDays = days.filter((day) => day.region === "Hokkaido").length;
  const tokyoDays = days.filter((day) => day.region === "Tokyo").length;
  const activeDay = days[activeIndex] ?? days[0];
  const showCountdown = mounted && phase.phase === "before" && countdown;

  return (
    <main>
      <section className="hero">
        <div className="hero__glow hero__glow--left" />
        <div className="hero__glow hero__glow--right" />
        <div className="hero__content">
          <p className="eyebrow">{stats.heroEyebrow}</p>
          <div className="hero-title-row">
            <h1>{stats.heroTitle}</h1>
            <Link href="/pokemongoevents" className="pokeball-link" aria-label="View Pokémon Go events calendar">
              <Image src="/pokeball.svg" alt="" width={72} height={72} />
            </Link>
          </div>
          <p className="hero__lede">
            Travel dashboard for the upcoming trip.
          </p>

          {showCountdown ? (
            <div className="countdown" aria-label="Countdown to trip start">
              <TimeBox label="Days" value={countdown.days} />
              <TimeBox label="Hours" value={countdown.hours} />
              <TimeBox label="Minutes" value={countdown.minutes} />
              <TimeBox label="Seconds" value={countdown.seconds} />
            </div>
          ) : (
            <div className="live-card">
              <span>{phase.phase === "after" ? "Trip archive" : "Today’s itinerary"}</span>
              <strong>
                Day {activeDay.day}: {activeDay.title}
              </strong>
              <p>{activeDay.summary}</p>
            </div>
          )}

          <div className="hero__stats" aria-label="Trip summary">
            <Stat label="Dates" value={`${formatDisplayDate(stats.startDate)} – ${formatDisplayDate(stats.endDate)}`} />
            <Stat label="Hokkaido" value={`${hokkaidoDays} days`} />
            <Stat label="Tokyo" value={`${tokyoDays} transfer day`} />
          </div>
        </div>
      </section>

      <section className="overview" aria-label="Trip sections">
        <article>
          <span>01</span>
          <h2>Hokkaido Road Trip</h2>
          <p>Daily route cards with hotel, food, sightseeing, shopping, and driving nodes.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Tokyo Experience</h2>
          <p>A polished placeholder for the Tokyo chapter, ready for the next itinerary draft.</p>
        </article>
      </section>

      <section className="itinerary-shell" aria-label="Daily itinerary">
        <div className="section-heading">
          <p className="eyebrow">Daily Itinerary</p>
          {/* <h2>{phase.phase === "before" ? "Preview the full route" : "Swipe through the trip"}</h2> */}
        </div>

        <nav className="day-tabs" aria-label="Choose itinerary day">
          {days.map((day, index) => (
            <button
              key={day.date}
              aria-current={index === activeIndex ? "page" : undefined}
              className={index === activeIndex ? "active" : ""}
              onClick={() => selectDay(index)}
              type="button"
            >
              Day {day.day}
            </button>
          ))}
        </nav>

        <div className="carousel" ref={carouselRef} onScroll={handleCarouselScroll}>
          {days.map((day) => (
            <article className="day-card" key={day.date}>
              <div className="day-card__header">
                <div>
                  <p className="day-card__date">
                    {day.weekday} · {formatDisplayDate(day.date)}
                  </p>
                  <h3>
                    Day {day.day}: {day.title}
                  </h3>
                  <p>{day.summary}</p>
                </div>
                <span className={`region-pill region-pill--${day.region.toLowerCase()}`}>
                  {day.region}
                </span>
              </div>

              {(day.drive || day.hotel) && (
                <div className="day-meta">
                  {day.drive && <span>🚙 {day.drive}</span>}
                  {day.hotel &&
                    (day.hotelMapUrl ? (
                      <a href={day.hotelMapUrl} target="_blank" rel="noreferrer">
                        🏨 {day.hotel}
                      </a>
                    ) : (
                      <span>🏨 {day.hotel}</span>
                    ))}
                </div>
              )}

              {day.region === "Tokyo" && (
                <div className="tokyo-placeholder">
                  <span>Tokyo chapter</span>
                  Add Shibuya nights, cafes, shopping, and food pilgrimages here when the plan
                  gets deliciously specific.
                </div>
              )}

              <ol className="timeline">
                {day.stops.map((stop) => (
                  <li key={`${day.date}-${stop.title}`} className="timeline__item">
                    <div className="timeline__node">{stopIcon(stop.kind)}</div>
                    <div className="timeline__content">
                      <div>
                        {stop.time && <span className="time">{stop.time}</span>}
                        <h4>{stop.title}</h4>
                        {stop.note && <p>{stop.note}</p>}
                      </div>
                      {stop.mapUrl && (
                        <a href={stop.mapUrl} target="_blank" rel="noreferrer" className="map-button">
                          Open Maps
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <section className="pokemon-day-section" aria-label={`Pokemon Go events for day ${day.day}`}>
                <div className="pokemon-section-heading">
                  <span className="pokemon-divider" />
                  <div>
                    <Image src="/pokeball.svg" alt="" width={38} height={38} />
                    <h4>Pokemon Go</h4>
                  </div>
                </div>
                <PokemonEventCards
                  events={getPokemonEventsForDate(day.date)}
                  emptyMessage="No Pokémon Go events from the attached schedule overlap this itinerary day."
                />
              </section>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="time-box">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
