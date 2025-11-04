import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

type ContactInfo = {
    email: string | null;
    contact_no: string | null;
    address: string | null;
    whatsapp_no: string | null;
};

export function ContactDetails({ contactInfo }: { contactInfo: ContactInfo | null }) {
    const whatsappLink = `https://wa.me/${contactInfo?.whatsapp_no}`;
    return (
        <div className="bg-card border-2 border-border p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-secondary">Contact Details</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Contact Details</h2>
            <div className="space-y-6">
                {contactInfo?.address && (
                    <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:translate-x-2">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                            <MapPin className="h-6 w-6 text-secondary flex-shrink-0" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Our Office</h3>
                            <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{contactInfo.address}</p>
                        </div>
                    </div>
                )}
                {contactInfo?.contact_no && (
                    <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:translate-x-2">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                            <Phone className="h-6 w-6 text-secondary flex-shrink-0" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Call Us</h3>
                            <a href={`tel:${contactInfo.contact_no}`} className="text-muted-foreground hover:text-secondary transition-colors duration-300">{contactInfo.contact_no}</a>
                        </div>
                    </div>
                )}
                {contactInfo?.email && (
                    <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:translate-x-2">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                            <Mail className="h-6 w-6 text-secondary flex-shrink-0" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">Email Us</h3>
                            <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-secondary transition-colors duration-300">{contactInfo.email}</a>
                        </div>
                    </div>
                )}
                {contactInfo?.whatsapp_no && (
                    <div className="group flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:translate-x-2">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300">
                            <WhatsAppIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground group-hover:text-green-600 transition-colors duration-300">WhatsApp</h3>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-600 transition-colors duration-300">{contactInfo.whatsapp_no}</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}