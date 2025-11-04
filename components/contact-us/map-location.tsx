export function MapLocation() {
    return (
        <div className="bg-card border-2 border-border p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-semibold text-secondary">Our Location</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Our Location</h2>
            <div className="aspect-video overflow-hidden rounded-lg border-2 border-border shadow-inner hover:shadow-lg transition-all duration-300">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3323.3835487799256!2d73.05058167569698!3d33.595351473332556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM1JzQzLjMiTiA3M8KwMDMnMTEuNCJF!5e0!3m2!1sen!2s!4v1762235165294!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                ></iframe>
            </div>
        </div>
    );
}