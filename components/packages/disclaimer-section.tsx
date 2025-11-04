import { ShieldAlert, Stamp, FileText } from 'lucide-react';

const generalDisclaimers = [
    "If 100% Payment will be paid, then company will take responsibility for any increase in prices.",
    "Packages are valid subject to availability.",
    "Subject to change will be paid by client other than above packages.",
    "Sent to embassy cases will subject to availability.",
];

const visaPolicies = [
    {
        title: "SEND TO EMBASSY",
        description: "In this case, visa clearance is done by the embassy.",
    },
    {
        title: "VISA NOT PRINTED",
        description: "In this case, the visa is not immediately cleared by the embassy, but it is issued in the system after a few days. Then, after the visa status shows 'Sent to Embassy,' it is sent to the embassy for visa clearance.",
    },
    {
        title: "VISA REJECTED",
        description: "In this case, the visa charges are non-refundable.",
    }
];

export function DisclaimerSection() {
    return (
        <section className="w-full bg-gradient-to-br from-card via-card to-muted/20 py-16 sm:py-24 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-secondary">Important Information</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
                        Important Disclaimers & Policies
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-card-foreground/70">
                        Please read the following information carefully before booking your package.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2">
                    {/* General Disclaimers Column */}
                    <div className="space-y-6 rounded-xl border-2 border-border bg-card/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h3 className="flex items-center gap-3 text-2xl font-semibold leading-7 text-card-foreground">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-600/10">
                                <ShieldAlert className="h-6 w-6 flex-shrink-0 text-amber-600" />
                            </div>
                            General Disclaimers
                        </h3>
                        <ul className="space-y-4">
                            {generalDisclaimers.map((disclaimer, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                                    <ShieldAlert className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
                                    <span className="text-card-foreground/80 leading-relaxed">{disclaimer}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visa Policy Column */}
                    <div className="space-y-6 rounded-xl border-2 border-border bg-card/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h3 className="flex items-center gap-3 text-2xl font-semibold leading-7 text-card-foreground">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600/10">
                                <FileText className="h-6 w-6 flex-shrink-0 text-blue-600" />
                            </div>
                            Visa Policy
                        </h3>
                        <ul className="space-y-4">
                            {visaPolicies.map((policy, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                                    <Stamp className="h-5 w-5 flex-shrink-0 text-blue-600 mt-0.5" />
                                    <p className="text-card-foreground/80 leading-relaxed"><strong className="font-bold text-card-foreground">{policy.title}:</strong> {policy.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}