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
        <section className="w-full bg-[#18181b] py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Important Disclaimers & Policies
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-400">
                        Please read the following information carefully before booking your package.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-2">
                    {/* General Disclaimers Column */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-2xl font-semibold leading-7 text-white">
                            <ShieldAlert className="h-6 w-6 flex-shrink-0 text-amber-600" /> General Disclaimers
                        </h3>
                        <ul className="space-y-4">
                            {generalDisclaimers.map((disclaimer, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <ShieldAlert className="h-5 w-5 flex-shrink-0 text-amber-600" />
                                    <span className="text-gray-300">{disclaimer}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visa Policy Column */}
                    <div className="space-y-6">
                        <h3 className="flex items-center gap-3 text-2xl font-semibold leading-7 text-white">
                            <FileText className="h-6 w-6 flex-shrink-0 text-blue-600" /> Visa Policy
                        </h3>
                        <ul className="space-y-4">
                            {visaPolicies.map((policy, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Stamp className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                    <p className="text-gray-300"><strong className="font-bold text-white">{policy.title}:</strong> {policy.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}