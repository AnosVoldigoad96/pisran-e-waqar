# Pisran-e-Waqar Frontend

A modern, responsive frontend application for Pisran-e-Waqar, a trusted travel agency specializing in Umrah and Hajj packages. Built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Home Page**: Hero section, featured packages, flights, hotels, testimonials, and FAQs
- **Umrah Packages**: Browse and customize Umrah packages with detailed itineraries
- **Flight Booking**: Search and book flights to Makkah and Madinah
- **Hotel Booking**: Discover and book hotels in Makkah and Madinah
- **Contact Us**: Contact form with business hours and location map
- **About Us**: Company information, values, and team section
- **FAQ**: Frequently asked questions section
- **Privacy & Terms**: Legal pages for privacy policy and terms of service
- **WhatsApp Integration**: Direct WhatsApp contact button
- **reCAPTCHA**: Spam protection for contact forms
- **Responsive Design**: Mobile-first, fully responsive UI
- **SEO Optimized**: Dynamic metadata and SEO tags from Supabase

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database/Backend**: [Supabase](https://supabase.com/)
- **Form Handling**: React Server Actions
- **Date Picker**: [react-day-picker](https://react-day-picker.js.org/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) (via Next.js)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Supabase Account**: For database and backend services
- **Google reCAPTCHA**: Site key for form protection

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pisran-e-waqar-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

   You can find your Supabase credentials in your [Supabase Dashboard](https://app.supabase.com/) under Project Settings → API.

   For reCAPTCHA, get your site key from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
pisran-e-waqar-frontend/
├── app/                      # Next.js App Router pages
│   ├── about-us/            # About Us page
│   ├── contact-us/          # Contact Us page
│   ├── faq/                 # FAQ page
│   ├── flights/             # Flights page
│   ├── hotels/              # Hotels page
│   ├── packages/            # Packages page
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   ├── actions.ts           # Server actions
│   ├── components/          # App-specific components
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── about/              # About page components
│   ├── contact-us/         # Contact page components
│   ├── flights/            # Flight-related components
│   ├── hotels/             # Hotel-related components
│   ├── home/               # Home page components
│   ├── packages/           # Package-related components
│   ├── ui/                 # shadcn/ui components
│   └── ...
├── lib/                     # Utility functions
│   ├── supabase.ts         # Supabase client configuration
│   └── utils.ts            # Utility functions
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server (after build)
- `npm run lint` - Run ESLint to check for code issues

## 🗄️ Database Schema

This application uses Supabase as the backend. The main tables include:

- `packages` - Umrah/Hajj packages
- `flights` - Flight information
- `hotels` - Hotel listings
- `testimonials` - Customer testimonials
- `faqs` - Frequently asked questions
- `homepage_content` - Homepage content management
- `page_seo_data` - SEO metadata for pages
- `site_settings` - Site-wide settings (singleton table)

Ensure your Supabase database is properly set up with these tables before running the application.

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA site key | Yes |

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com/new)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js application can be deployed on any platform that supports Node.js:

- **Netlify**: Use the Next.js build preset
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Build a containerized version
- **Self-hosted**: Use `npm run build` and `npm run start`

## 📝 Key Features Implementation

### Server Actions
- Form submissions are handled using Next.js Server Actions
- Located in `app/actions.ts` and `app/flights/actions.ts`

### Data Fetching
- All data is fetched server-side using Supabase client
- Pages are dynamically rendered for optimal SEO

### Component Architecture
- Modular component structure
- Reusable UI components from shadcn/ui
- Page-specific components organized by feature

### Styling
- Tailwind CSS with custom theme configuration
- CSS variables for theming
- Responsive design with mobile-first approach

## 🔒 Security

- reCAPTCHA v3 integration for form protection
- Environment variables for sensitive data
- Server-side data fetching for security
- Supabase Row Level Security (RLS) policies recommended

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for Pisran-e-Waqar**
