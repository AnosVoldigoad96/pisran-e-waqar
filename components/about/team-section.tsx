import Image from "next/image";

type TeamMember = {
    id: number;
    name: string;
    role: string | null;
    imageUrl: string | null;
};

export function TeamSection({ teamMembers }: { teamMembers: TeamMember[] }) {
    return (
        <div className="w-full bg-[#18181b] py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet Our Dedicated Team</h2>
                    <p className="mt-6 text-lg leading-8 text-white/80">
                        The passionate individuals committed to making your spiritual journey memorable.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {teamMembers.map((person) => (
                        <div key={person.id} className="flex items-center gap-x-4 sm:gap-x-6 group sm:transition-transform sm:duration-300 sm:ease-in-out sm:hover:scale-105">
                            <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-full overflow-hidden ring-4 ring-primary/20">
                                {person.imageUrl && (
                                    <Image
                                        src={person.imageUrl}
                                        alt={person.name}
                                        fill
                                        sizes="(max-width: 640px) 80px, 96px"
                                        className="sm:grayscale sm:transition-all sm:duration-300 sm:ease-in-out sm:group-hover:scale-110 sm:group-hover:grayscale-0"
                                        style={{ objectFit: "cover" }}
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold leading-7 tracking-tight text-white">{person.name}</h3>
                                <p className="text-sm sm:text-base font-semibold leading-6 text-white/80">{person.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}