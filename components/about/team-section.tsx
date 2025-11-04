import Image from "next/image";

type TeamMember = {
    id: number;
    name: string;
    role: string | null;
    imageUrl: string | null;
};

export function TeamSection({ teamMembers }: { teamMembers: TeamMember[] }) {
    return (
        <div className="w-full bg-gradient-to-br from-card via-card to-muted/20 py-16 sm:py-24 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Our Team</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">Meet Our Dedicated Team</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4 mb-6" />
                    <p className="mt-6 text-lg leading-8 text-card-foreground/80">
                        The passionate individuals committed to making your spiritual journey memorable.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {teamMembers.map((person, index) => (
                        <div 
                            key={person.id} 
                            className="group flex items-center gap-x-4 sm:gap-x-6 p-4 rounded-xl border-2 border-border bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-secondary/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-secondary/50"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/50 transition-all duration-300">
                                {person.imageUrl ? (
                                    <Image
                                        src={person.imageUrl}
                                        alt={person.name}
                                        fill
                                        sizes="(max-width: 640px) 80px, 96px"
                                        className="grayscale transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:grayscale-0"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-secondary">{person.name.charAt(0)}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold leading-7 tracking-tight text-card-foreground group-hover:text-secondary transition-colors duration-300">{person.name}</h3>
                                <p className="text-sm sm:text-base font-medium leading-6 text-card-foreground/70 group-hover:text-card-foreground/90 transition-colors duration-300">{person.role || "Team Member"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}