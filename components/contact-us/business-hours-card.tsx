import { Clock } from "lucide-react";

export function BusinessHoursCard() {
    return (
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center"><Clock className="mr-3 h-6 w-6" /> Business Hours</h2>
            <div className="space-y-2 text-muted-foreground">
                <p className="flex justify-between"><span>Monday - Saturday</span> <span>9:00 AM - 5:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
            </div>
        </div>
    );
}