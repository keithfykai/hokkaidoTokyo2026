import Image from "next/image";
import type { PokemonGoEvent } from "@/data/pokemonGoEvents";
import { formatPokemonEventDate, pokemonImage } from "@/data/pokemonGoEvents";

type PokemonEventCardsProps = {
  events: PokemonGoEvent[];
  emptyMessage?: string;
};

export function PokemonEventCards({ events, emptyMessage }: PokemonEventCardsProps) {
  if (events.length === 0) {
    return <p className="pokemon-empty">{emptyMessage ?? "No Pokémon Go events listed for this day."}</p>;
  }

  return (
    <div className="pokemon-events-grid">
      {events.map((event) => (
        <article className="pokemon-event-card" key={event.id}>
          <div className="pokemon-event-card__header">
            <span>{event.category}</span>
            <strong>
              {formatPokemonEventDate(event.startDate)}
              {event.endDate !== event.startDate ? ` – ${formatPokemonEventDate(event.endDate)}` : ""}
              {event.time ? ` · ${event.time}` : ""}
            </strong>
          </div>
          <h4>{event.title}</h4>
          <p>{event.summary}</p>

          <div className="pokemon-sprite-row" aria-label={`${event.title} featured Pokemon`}>
            {event.pokemon.map((pokemon) => (
              <div className="pokemon-sprite" key={`${event.id}-${pokemon.name}-${pokemon.detail ?? ""}`}>
                <Image
                  src={pokemonImage(pokemon.pokedexId)}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  sizes="54px"
                />
                <div>
                  <strong>{pokemon.name}</strong>
                  {pokemon.detail && <span>{pokemon.detail}</span>}
                  {pokemon.priority && <em>{pokemon.priority} Priority</em>}
                </div>
              </div>
            ))}
          </div>

          <ul className="pokemon-detail-list">
            {event.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
