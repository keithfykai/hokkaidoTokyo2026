"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type UIEvent as ReactUIEvent } from "react";
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

const getTravelTip = (day: ItineraryDay) => {
  switch (day.day) {
    case 1:
      return "After landing, use Daimaru Sapporo as your first easy reset: it is a good place to stock up on road-trip snacks, outdoor gear, and anything you forgot to pack.";
    case 2:
      return "Asahikawa is all about timing the ramen and sake stops around the drive, so plan to keep the afternoon flexible for the brewery museum and a relaxed AEON Mall finish.";
    case 3:
      return "Farm Tomita and the Blue Pond are the headline stops here, but the real win is ending with Furano yakiniku after you have had time to breathe in the lavender season.";
    case 4:
      return "Give yourself a little extra daylight for Hell Valley, then settle into Noboribetsu with coffee and a slow wander so the onsen town feels like part of the trip, not just a sleep stop.";
    case 5:
      return "Lake Toya is the best place to break up the long drive south, and Lake Hill Farm is a smart dessert stop before you roll into Hakodate for the evening.";
    case 6:
      return "Use Goryokaku and the red brick warehouses as your daytime anchor, then save Mount Hakodate for clear evening light so the city view feels worth the climb.";
    case 7:
      return "This is a big road day, so treat Otaru Canal as the reward: ramen at lunch, then shopping and an evening walk once you have checked in and recovered from the drive.";
    case 8:
      return "Sapporo works best as a snack-and-shopping circuit, so pace the matcha, ramen street, and Tanukikoji stops around the car return and keep late ramen as an optional bonus.";
    case 9:
      return "Odori Park makes a calm start, but the useful tip is to keep room for Sapporo Beer Museum and Book Off browsing so the day still feels local after the ramen stop.";
    case 10:
      return "On arrival in Tokyo, keep Ikebukuro simple: check in, explore the station area, and make the Pokémon Store your first real neighborhood stop after the flight.";
    case 11:
      return "Gotemba Premium Outlets is the main outing, so plan the Ginza evening as a softer end to the day with Montbell and dinner after the bus ride back.";
    case 12:
      return "Asakusa and Kappabashi are strongest when you linger, because the temple streets and kitchenware shops are the best places to shop slowly before Shinjuku.";
    case 13:
      return "Omotesando to Shibuya is a good walking day, and Cat Street works best if you leave enough energy for browsing around Miyashita Park before dinner.";
    case 14:
      return "Kamakura is the day to keep plans loose and enjoy the company trip vibe; the best move is to focus on the day trip itself instead of overpacking the schedule.";
    case 15:
      return "Leave a cushion for checkout and the airport bus, because the cleanest departure day is the one where breakfast, luggage, and transit all stay calm and unhurried.";
    default:
      return day.summary;
  }
};

function DirectionsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="map-button__icon">
      <path fill="#34a853" d="M8.5 3 3 6.2v13.9L8.5 17V3Z" />
      <path fill="#4285f4" d="M15.5 6.1 8.5 3v14l7 3.1v-14Z" />
      <path fill="#fbbc04" d="m21 7.8-5.5-2.9v14L21 21V7.8Z" />
      <path fill="#ea4335" d="M12 6.2a4.3 4.3 0 0 0-4.3 4.3c0 3.2 4.3 8.8 4.3 8.8s4.3-5.6 4.3-8.8A4.3 4.3 0 0 0 12 6.2Zm0 6.3a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    </svg>
  );
}

export function TripExperience({ days, stats }: TripExperienceProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dayTabsRef = useRef<HTMLElement>(null);
  const hasSetInitialDay = useRef(false);
  const isDraggingTabsRef = useRef(false);
  const didDragTabsRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [isDayTabsDragging, setIsDayTabsDragging] = useState(false);

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

  const handleDayTabsPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    const tabs = dayTabsRef.current;

    if (!tabs) {
      return;
    }

    didDragTabsRef.current = false;
    isDraggingTabsRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = tabs.scrollLeft;
  };

  const handleDayTabsPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.buttons === 0) {
      return;
    }

    const tabs = dayTabsRef.current;

    if (!tabs) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;

    if (!isDraggingTabsRef.current && Math.abs(deltaX) > 8) {
      isDraggingTabsRef.current = true;
      didDragTabsRef.current = true;
      setIsDayTabsDragging(true);
      tabs.setPointerCapture(event.pointerId);
    }

    if (!isDraggingTabsRef.current) {
      return;
    }

    tabs.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    event.preventDefault();
  };

  const finishDayTabsDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const tabs = dayTabsRef.current;

    if (tabs && tabs.hasPointerCapture(event.pointerId)) {
      tabs.releasePointerCapture(event.pointerId);
    }

    isDraggingTabsRef.current = false;
    setIsDayTabsDragging(false);
  };

  const handleDayTabsClickCapture = (event: ReactPointerEvent<HTMLElement>) => {
    if (!didDragTabsRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    didDragTabsRef.current = false;
  };

  const handleCarouselScroll = (event: ReactUIEvent<HTMLDivElement>) => {
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
            <Stat label="Tokyo" value={`${tokyoDays} days`} />
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
          <p>Ikebukuro base days for outlets, Ginza, Asakusa, Shinjuku, Shibuya, and Kamakura.</p>
        </article>
      </section>

      <section className="itinerary-shell" aria-label="Daily itinerary">
        <div className="section-heading">
          <p className="eyebrow">Daily Itinerary</p>
          {/* <h2>{phase.phase === "before" ? "Preview the full route" : "Swipe through the trip"}</h2> */}
        </div>

        <nav
          ref={dayTabsRef}
          className={`day-tabs${isDayTabsDragging ? " is-dragging" : ""}`}
          aria-label="Choose itinerary day"
          onClickCapture={handleDayTabsClickCapture}
          onPointerDown={handleDayTabsPointerDown}
          onPointerMove={handleDayTabsPointerMove}
          onPointerUp={finishDayTabsDrag}
          onPointerCancel={finishDayTabsDrag}
        >
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

              <div className="tokyo-placeholder">
                <span>Travel tip</span>
                {getTravelTip(day)}
              </div>

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
                          <DirectionsIcon />
                          <span>Directions</span>
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
