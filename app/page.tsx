import { TripExperience } from "@/components/TripExperience";
import { itineraryDays, tripStats } from "@/data/itinerary";

export default function Home() {
  return <TripExperience days={itineraryDays} stats={tripStats} />;
}
