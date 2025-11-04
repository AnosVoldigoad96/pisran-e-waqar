import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { PlaneTakeoff, PlaneLanding, Plane } from "lucide-react";
import { format } from "date-fns";

// Define the structure of our data based on your SQL definitions
type FlightSegment = {
    from: string;
    to: string;
    flight_no: string;
};

type Itinerary = {
    id: number;
    itinerary_name: string | null;
    departure_date: string | null;
    return_date: string | null;
    flight_details: FlightSegment[] | null;
    airlines: {
        name: string;
        logo_url: string | null;
    } | null;
    airline_id: number | null; // We need this to fetch the airline
};

async function getItineraries(): Promise<Itinerary[]> {
    // Step 1: Fetch all itineraries
    const { data: itinerariesData, error: itinerariesError } = await supabase
        .from('itineraries')
        .select(`
            id,
            itinerary_name,
            departure_date,
            return_date,
            flight_details,
            airline_id
        `);

    if (itinerariesError) {
        console.error("Error fetching itineraries:", itinerariesError);
        return [];
    }

    // Step 2: For each itinerary, fetch its airline information
    const itinerariesWithAirlines = await Promise.all(
        itinerariesData.map(async (itinerary) => {
            let airlineInfo = null;
            if (itinerary.airline_id) {
                const { data: airlineData, error: airlineError } = await supabase
                    .from('airlines')
                    .select('name, logo_url')
                    .eq('id', itinerary.airline_id)
                    .single();
                if (!airlineError) {
                    airlineInfo = airlineData;
                }
            }
            return { ...itinerary, airlines: airlineInfo };
        })
    );

    return itinerariesWithAirlines as Itinerary[];
}

export async function FlightItineraries() {
    const itineraries = await getItineraries();
    const formatElegantDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            // Use date-fns for consistent formatting across server and client
            return format(date, "dd MMM ''yy");
        } catch (error) {
            return 'N/A';
        }
    };

    return (
        <section className="w-full py-12 sm:py-16">
            {/* This outer div handles the padding and centering */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-32">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Flight Itineraries
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        We partner with world-class airlines to ensure your comfort and safety.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
                        {itineraries.map((itinerary) => (
                            <div key={itinerary.id} className="flex flex-col gap-4 cursor-pointer rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between">
                                {/* Left Side: Airline Info */}
                                <div className="flex flex-shrink-0 items-center gap-4">
                                    {itinerary.airlines?.logo_url && (
                                        <Image src={itinerary.airlines.logo_url} alt={itinerary.airlines.name} width={40} height={40} className="h-10 w-10 rounded-full" />
                                    )}
                                    <div>
                                        <p className="font-bold">{itinerary.airlines?.name}</p>
                                        <p className="text-sm text-muted-foreground">{itinerary.itinerary_name}</p>
                                    </div>
                                </div>

                                {/* Right Side: Dates & Details */}
                                <div className="text-center text-sm sm:text-right">
                                    <p className="flex items-center justify-center gap-2 font-medium sm:justify-end"><PlaneTakeoff className="h-4 w-4 text-muted-foreground" /> {formatElegantDate(itinerary.departure_date)}</p>
                                    <p className="flex items-center justify-center gap-2 font-medium sm:justify-end"><PlaneLanding className="h-4 w-4 text-muted-foreground" /> {formatElegantDate(itinerary.return_date)}</p>
                                    {Array.isArray(itinerary.flight_details) && (
                                        <div className="mt-2 border-t pt-2">
                                            {itinerary.flight_details.map((segment, i) => (
                                                <div key={i} className="flex items-center justify-center gap-2 text-xs text-muted-foreground sm:justify-end">
                                                    <span>{segment.from}</span>
                                                    <Plane className="h-3 w-3" />
                                                    <span>{segment.to}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </section>
    );
}