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
        <section className="w-full py-12 sm:py-16 bg-gradient-to-b from-background via-background to-muted/30 relative overflow-hidden">
            {/* Decorative gradient circles */}
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Flight Itineraries</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Flight Itineraries
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        We partner with world-class airlines to ensure your comfort and safety.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {itineraries.map((itinerary, index) => (
                            <div 
                                key={itinerary.id} 
                                className="group flex flex-col gap-4 cursor-pointer rounded-xl border-2 border-border bg-card p-4 sm:p-6 text-card-foreground shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 hover:border-secondary/50 sm:flex-row sm:items-center sm:justify-between relative overflow-hidden"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-transparent to-accent/0 group-hover:from-secondary/5 group-hover:via-secondary/5 group-hover:to-accent/5 transition-all duration-500 rounded-xl" />
                                {/* Left Side: Airline Info */}
                                <div className="flex flex-shrink-0 items-center gap-4 relative z-10">
                                    {itinerary.airlines?.logo_url && (
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-secondary/20 group-hover:ring-secondary/50 transition-all duration-300 group-hover:scale-110">
                                            <Image src={itinerary.airlines.logo_url} alt={itinerary.airlines.name} width={48} height={48} className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold group-hover:text-secondary transition-colors duration-300">{itinerary.airlines?.name}</p>
                                        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{itinerary.itinerary_name}</p>
                                    </div>
                                </div>

                                {/* Right Side: Dates & Details */}
                                <div className="text-center text-sm sm:text-right relative z-10">
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