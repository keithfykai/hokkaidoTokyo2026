export type TripRegion = "Hokkaido" | "Tokyo";

export type ItineraryStop = {
  title: string;
  note?: string;
  time?: string;
  mapUrl?: string;
  kind?: "food" | "hotel" | "shopping" | "sightseeing" | "travel" | "activity";
};

export type ItineraryDay = {
  day: number;
  date: string;
  weekday: string;
  title: string;
  region: TripRegion;
  summary: string;
  drive?: string;
  hotel?: string;
  hotelMapUrl?: string;
  stops: ItineraryStop[];
};

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const itineraryDays: ItineraryDay[] = [
  {
    day: 1,
    date: "2026-06-28",
    weekday: "Sunday",
    title: "Arrival to Hokkaido",
    region: "Hokkaido",
    summary: "Land in Sapporo, settle in, shop around Daimaru, and stock up for the road trip.",
    hotel: "Keio Prelia Hotel Sapporo",
    hotelMapUrl: "https://maps.app.goo.gl/RJoKtDcm9Fj9M6Bk6",
    stops: [
      {
        title: "New Chitose Airport",
        time: "9:00 AM",
        note: "Arrive, eat breakfast, shop, and have lunch at the airport.",
        mapUrl: mapsSearch("New Chitose Airport Hokkaido"),
        kind: "travel",
      },
      {
        title: "Keio Prelia Hotel Sapporo",
        note: "Take the train over to drop bags or check in.",
        mapUrl: "https://maps.app.goo.gl/RJoKtDcm9Fj9M6Bk6",
        kind: "hotel",
      },
      {
        title: "Daimaru Sapporo",
        note: "Freshen up, then shop. Notable stops: Montbell and Alpen.",
        mapUrl: "https://maps.app.goo.gl/VE3io9dd6pz6ckYz6",
        kind: "shopping",
      },
      {
        title: "Grocery or convenience store",
        note: "Pick up food and snacks for the road.",
        mapUrl: mapsSearch("convenience store near Daimaru Sapporo"),
        kind: "shopping",
      },
    ],
  },
  {
    day: 2,
    date: "2026-06-29",
    weekday: "Monday",
    title: "Pick Up Car + Asahikawa",
    region: "Hokkaido",
    summary: "Collect the cars, drive north to Asahikawa, then ramen, sake, shopping, and rest.",
    drive: "Sapporo → Asahikawa · about 2 hours",
    hotel: "Y’s Hotel Asahikawa",
    hotelMapUrl: "https://maps.app.goo.gl/3ErrZcTtnvRZKoZX9",
    stops: [
      {
        title: "Rental car pickup",
        time: "8:30 AM",
        note: "Fred, Hilary, Choonhwa, and Wen pick up the cars before returning to the hotel.",
        mapUrl: mapsSearch("car rental near Keio Prelia Hotel Sapporo"),
        kind: "travel",
      },
      {
        title: "Y’s Hotel Asahikawa",
        note: "Drive to Asahikawa and drop off luggage.",
        mapUrl: "https://maps.app.goo.gl/3ErrZcTtnvRZKoZX9",
        kind: "hotel",
      },
      {
        title: "Miso Ramen Yoshino Main Store",
        note: "Lunch stop.",
        mapUrl: "https://maps.app.goo.gl/qPmomFSAWCoiskCRA",
        kind: "food",
      },
      {
        title: "Asahikawa local stop",
        note: "Extra saved stop from the itinerary.",
        mapUrl: "https://maps.app.goo.gl/QrmW9tFtZEUUoMnA8",
        kind: "activity",
      },
      {
        title: "Otokoyama Sake Brewery Museum",
        note: "Sake tasting.",
        mapUrl: "https://maps.app.goo.gl/9Q5aVkK4pCEibz4n7",
        kind: "activity",
      },
      {
        title: "AEON Mall Asahikawa Station",
        note: "Shopping and dinner before heading back to rest.",
        mapUrl: mapsSearch("AEON Mall Asahikawa Station"),
        kind: "shopping",
      },
    ],
  },
  {
    day: 3,
    date: "2026-06-30",
    weekday: "Tuesday",
    title: "To Furano",
    region: "Hokkaido",
    summary: "Lavender fields, the Blue Pond, burgers, hotel check-in, and Furano yakiniku.",
    drive: "Asahikawa → Furano · scenic farm route",
    hotel: "Furano Natulux Hotel",
    hotelMapUrl: "https://maps.app.goo.gl/e8yWXpAsTD64gzt49",
    stops: [
      {
        title: "Farm Tomita",
        note: "Lavender and flower fields, lavender ice cream, souvenirs, and snacks.",
        mapUrl: "https://maps.app.goo.gl/Po5c3JB6THATxHXU8",
        kind: "sightseeing",
      },
      {
        title: "Shirogane Blue Pond",
        note: "Sightseeing stop, about 30 minutes from Farm Tomita.",
        mapUrl: "https://maps.app.goo.gl/2hdnJmGKpjrpjAeJ6",
        kind: "sightseeing",
      },
      {
        title: "Burger Joint",
        note: "Lunch and mini shopping nearby.",
        mapUrl: "https://maps.app.goo.gl/Qbf119QXp34Eg3h48",
        kind: "food",
      },
      {
        title: "Furano Natulux Hotel",
        note: "Check in and freshen up.",
        mapUrl: "https://maps.app.goo.gl/e8yWXpAsTD64gzt49",
        kind: "hotel",
      },
      {
        title: "Wagyu Yakiniku Nikudarake Furano",
        note: "Dinner. Reserve the day before.",
        mapUrl: "https://maps.app.goo.gl/tFYng7sEi7ppKMUz6",
        kind: "food",
      },
    ],
  },
  {
    day: 4,
    date: "2026-07-01",
    weekday: "Wednesday",
    title: "To Noboribetsu",
    region: "Hokkaido",
    summary: "Long drive south, Genghis Khan lunch, Hell Valley, onsen hotel, and cafe wandering.",
    drive: "Furano → Noboribetsu · about 3 hours",
    hotel: "Noboribetsu Grand Hotel",
    hotelMapUrl: "https://maps.app.goo.gl/ZwrdU4o7Mjw8rJU66",
    stops: [
      {
        title: "Suimi Hokkaido Genghis Khan",
        note: "Lunch after the drive.",
        mapUrl: "https://maps.app.goo.gl/N2sfw8tjyw4ptAMDA",
        kind: "food",
      },
      {
        title: "Jigokudani Hell Valley",
        note: "Sightseeing stop, about 15 minutes from lunch.",
        mapUrl: "https://maps.app.goo.gl/vPxne6VaimoTdZ6f9",
        kind: "sightseeing",
      },
      {
        title: "Noboribetsu Grand Hotel",
        note: "Check in.",
        mapUrl: "https://maps.app.goo.gl/ZwrdU4o7Mjw8rJU66",
        kind: "hotel",
      },
      {
        title: "adex BAKERY & CAFE",
        note: "Coffee nearby, then walk around for shopping.",
        mapUrl: "https://maps.app.goo.gl/qU7EWeZkbQVXQruo9",
        kind: "food",
      },
    ],
  },
  {
    day: 5,
    date: "2026-07-02",
    weekday: "Thursday",
    title: "To Hakodate",
    region: "Hokkaido",
    summary: "Lake Toya, soup curry, coffee, farm dessert, and a long roll into Hakodate.",
    drive: "Noboribetsu → Lake Toya → Hakodate",
    hotel: "Hotel Global View Hakodate",
    hotelMapUrl: "https://maps.app.goo.gl/MUFzNEE9QrLvMVye7",
    stops: [
      {
        title: "Lake Toya",
        note: "Walk around and enjoy the lakeside.",
        mapUrl: "https://maps.app.goo.gl/DLZs49HnBqwpkB1x5",
        kind: "sightseeing",
      },
      {
        title: "Soup Curry Mog Mog",
        note: "Lunch stop.",
        mapUrl: "https://maps.app.goo.gl/HYfvhMUHMjbf6gRq8",
        kind: "food",
      },
      {
        title: "Library and Cafe Blossom Coffee",
        note: "Walk around and grab coffee.",
        mapUrl: "https://maps.app.goo.gl/yJ2j2vHAxohsXf1r9",
        kind: "food",
      },
      {
        title: "Lake Hill Farm",
        note: "Blueberry picking and dessert.",
        mapUrl: "http://maps.app.goo.gl/tx1FSLyb7eLH6bc17",
        kind: "activity",
      },
      {
        title: "Hotel Global View Hakodate",
        note: "Check in, have dinner nearby, and rest.",
        mapUrl: "https://maps.app.goo.gl/MUFzNEE9QrLvMVye7",
        kind: "hotel",
      },
    ],
  },
  {
    day: 6,
    date: "2026-07-03",
    weekday: "Friday",
    title: "Hakodate Day 2",
    region: "Hokkaido",
    summary: "Parks, local snacks, red brick warehouses, and Mount Hakodate views.",
    hotel: "Hotel Global View Hakodate",
    hotelMapUrl: "https://maps.app.goo.gl/MUFzNEE9QrLvMVye7",
    stops: [
      {
        title: "Goryōkaku Park",
        note: "Flower-shaped fort park for a morning walk.",
        mapUrl: mapsSearch("Goryokaku Park Hakodate"),
        kind: "sightseeing",
      },
      {
        title: "Jagaimo Factory",
        note: "Local snack stop.",
        mapUrl: mapsSearch("Jagaimo Factory Hakodate"),
        kind: "activity",
      },
      {
        title: "Kanemori Red Brick Warehouse",
        note: "Shop and eat lunch.",
        mapUrl: mapsSearch("Kanemori Red Brick Warehouse Hakodate"),
        kind: "shopping",
      },
      {
        title: "Mount Hakodate",
        note: "Head up for city and bay views before dinner nearby.",
        mapUrl: mapsSearch("Mount Hakodate Ropeway"),
        kind: "sightseeing",
      },
    ],
  },
  {
    day: 7,
    date: "2026-07-04",
    weekday: "Saturday",
    title: "To Otaru",
    region: "Hokkaido",
    summary: "A big road-trip day to Otaru, canal wandering, shopping, and ramen.",
    drive: "Hakodate → Otaru · about 4 hours with pitstops",
    hotel: "Hotel Torifito Otaru Canal",
    hotelMapUrl: mapsSearch("Hotel Torifito Otaru Canal"),
    stops: [
      {
        title: "Ramen Shodai",
        note: "Lunch after the drive.",
        mapUrl: mapsSearch("Ramen Shodai Otaru"),
        kind: "food",
      },
      {
        title: "Hotel Torifito Otaru Canal",
        note: "Check in and freshen up.",
        mapUrl: mapsSearch("Hotel Torifito Otaru Canal"),
        kind: "hotel",
      },
      {
        title: "Otaru Canal",
        note: "Walk, shop, and have dinner nearby.",
        mapUrl: mapsSearch("Otaru Canal Hokkaido"),
        kind: "sightseeing",
      },
    ],
  },
  {
    day: 8,
    date: "2026-07-05",
    weekday: "Sunday",
    title: "To Sapporo",
    region: "Hokkaido",
    summary: "Short drive back to Sapporo for matcha, ramen, shopping, car return, and optional late ramen.",
    drive: "Otaru → Sapporo · about 40 minutes",
    stops: [
      {
        title: "D Matcha Kyoto Sapporo",
        note: "Matcha desserts and drinks.",
        mapUrl: mapsSearch("D Matcha Kyoto Sapporo"),
        kind: "food",
      },
      {
        title: "Sapporo Ramen Street",
        note: "Lunch.",
        mapUrl: mapsSearch("Sapporo Ramen Street"),
        kind: "food",
      },
      {
        title: "Tanukikoji Shopping Street",
        note: "Shopping stretch before returning the car.",
        mapUrl: mapsSearch("Tanukikoji Shopping Street Sapporo"),
        kind: "shopping",
      },
      {
        title: "Rental car return",
        time: "6:30 PM",
        note: "Return the car.",
        mapUrl: mapsSearch("car rental return Sapporo Station"),
        kind: "travel",
      },
      {
        title: "Isono Kazuo",
        note: "Optional late-night ramen, open roughly 10 PM–6 AM.",
        mapUrl: mapsSearch("Isono Kazuo Sapporo ramen"),
        kind: "food",
      },
    ],
  },
  {
    day: 9,
    date: "2026-07-06",
    weekday: "Monday",
    title: "Sapporo Day 2",
    region: "Hokkaido",
    summary: "Parks, butter corn ramen, Snow Peak, beer, books, and a final Sapporo dinner.",
    stops: [
      {
        title: "Odori Park",
        note: "Morning walk.",
        mapUrl: mapsSearch("Odori Park Sapporo"),
        kind: "sightseeing",
      },
      {
        title: "Mogura",
        note: "Butter corn ramen.",
        mapUrl: mapsSearch("Mogura butter corn ramen Sapporo"),
        kind: "food",
      },
      {
        title: "Snow Peak Sapporo",
        note: "Outdoor gear shopping.",
        mapUrl: "https://maps.app.goo.gl/VpAVH2CndnA2nQx66",
        kind: "shopping",
      },
      {
        title: "Sapporo Beer Museum",
        note: "Beer factory/museum visit.",
        mapUrl: mapsSearch("Sapporo Beer Museum"),
        kind: "activity",
      },
      {
        title: "Book Off Sapporo",
        note: "Book and media browsing.",
        mapUrl: mapsSearch("Book Off Sapporo"),
        kind: "shopping",
      },
    ],
  },
  {
    day: 10,
    date: "2026-07-07",
    weekday: "Tuesday",
    title: "To Tokyo",
    region: "Tokyo",
    summary: "Transfer from Sapporo to Tokyo. Tokyo details can be added when the next itinerary draft is ready.",
    stops: [
      {
        title: "New Chitose Airport",
        note: "Head to the airport for the Tokyo flight.",
        mapUrl: mapsSearch("New Chitose Airport"),
        kind: "travel",
      },
      {
        title: "Tokyo",
        note: "Arrival city.",
        mapUrl: mapsSearch("Tokyo Japan"),
        kind: "travel",
      },
    ],
  },
];

export const tripStats = {
  startDate: "2026-06-28",
  endDate: "2026-07-07",
  timezone: "Asia/Tokyo",
  heroTitle: "Hokkaido + Tokyo",
  heroEyebrow: "Japan Road Trip · Summer 2026",
};
