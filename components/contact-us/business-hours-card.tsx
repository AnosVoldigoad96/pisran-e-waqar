import { Clock } from "lucide-react";

export function BusinessHoursCard() {
    return (
        <div className="bg-card border-2 border-border p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-secondary">Business Hours</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6 flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/10 mr-3">
                    <Clock className="h-6 w-6 text-secondary" />
                </div>
                Business Hours
            </h2>
            <div className="space-y-4">
                <div className="group p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                    <p className="flex justify-between items-center">
                        <span className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Monday - Saturday</span> 
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">9:00 AM - 5:00 PM</span>
                    </p>
                </div>
                <div className="group p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300">
                    <p className="flex justify-between items-center">
                        <span className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Sunday</span> 
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Closed</span>
                    </p>
                </div>
            </div>
        </div>
    );
}