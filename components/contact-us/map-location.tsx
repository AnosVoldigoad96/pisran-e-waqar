export function MapLocation() {
    return (
        <div className="bg-background p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">Our Location</h2>
            <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.978863098995!2d74.3263178752739!3d31.41485905108262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906a32d843a9d%3A0x2473f323b241566c!2sPisran-e-Waqar%20Travel%20%26%20Tours!5e0!3m2!1sen!2s!4v1730571383824!5m2!1sen!2s"
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