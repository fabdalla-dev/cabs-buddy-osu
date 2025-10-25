// // TypeScript
// const API_BASE = import.meta.env.VITE_API_BASE || "";

// export async function fetchRoutes() {
//   const res = await fetch(`${API_BASE}/routes`);
//   if (!res.ok) throw new Error("Failed to fetch routes");
//   return (await res.json()).data ?? [];
// }

// export async function fetchStopsForRoute(routeId: string) {
//   const res = await fetch(`${API_BASE}/routes/${routeId}/stops`);
//   if (!res.ok) throw new Error("Failed to fetch stops");
//   return (await res.json()).data?.stops ?? [];
// }

// export async function fetchArrivalsForStop(routeId: string, stopId: string) {
//   const res = await fetch(`${API_BASE}/routes/${routeId}/stops/${stopId}/arrivals`);
//   if (!res.ok) throw new Error("Failed to fetch arrivals");
//   return (await res.json()).data?.arrivals ?? [];
// }

// export async function fetchBuses() {
//   const res = await fetch(`${API_BASE}/buses`);
//   if (!res.ok) throw new Error("Failed to fetch buses");
//   return (await res.json()).data ?? [];
// }

// api wrapper might need working on it