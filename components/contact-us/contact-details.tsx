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
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Contact Details</h2>
            <div className="space-y-4">
                {contactInfo?.address && (
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">Our Office</h3>
                            <p className="text-muted-foreground">{contactInfo.address}</p>
                        </div>
                    </div>
                )}
                {contactInfo?.contact_no && (
                    <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">Call Us</h3>
                            <a href={`tel:${contactInfo.contact_no}`} className="text-muted-foreground hover:text-primary">{contactInfo.contact_no}</a>
                        </div>
                    </div>
                )}
                {contactInfo?.email && (
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">Email Us</h3>
                            <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary">{contactInfo.email}</a>
                        </div>
                    </div>
                )}
                {contactInfo?.whatsapp_no && (
                    <div className="flex items-start gap-4">
                        <WhatsAppIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold">WhatsApp</h3>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">{contactInfo.whatsapp_no}</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}