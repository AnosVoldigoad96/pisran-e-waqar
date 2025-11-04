export function MapLocation() {
    return (
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">Our Location</h2>
            <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3323.3835487799256!2d73.05058167569698!3d33.595351473332556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM1JzQzLjMiTiA3M8KwMDMnMTEuNCJF!5e0!3m2!1sen!2s!4v1762235165294!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}