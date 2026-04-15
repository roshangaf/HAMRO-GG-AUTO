
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyBottomBar } from '@/components/layout/StickyBottomBar';
import { Toaster } from '@/components/ui/toaster';
import { TransitionProvider } from '@/components/layout/TransitionProvider';
import { FirebaseClientProvider } from '@/firebase';

const LOGO_URL = 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-1/593739152_830641063205263_2454045155820817139_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeHi_xsQHWcLkkyjcfB0YwM-7cEeyjqOIf_twR7KOo4h_9fRErvbchD1UMhUeW0Ot7O1yjKuwJWOw0Xog1DOidxd&_nc_ohc=pyFYQPBopocQ7kNvwEMrf_z&_nc_oc=AdqV8gDwDHCPDitRmaMC6OXYNDMwm-DANqtRp5wIXQTWZ_r27LnAWcXWu5m3yLog9UE&_nc_zt=24&_nc_ht=scontent.fktm1-1.fna&_nc_gid=3P3KoNK69sTEyeU8MYPUbw&_nc_ss=7a32e&oh=00_AfyDzbJGks-2tVK1w3AOR3qaQQU5ynIMRJUxRCtnizVYQ&oe=69C701C1';
const HERO_URL = 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const metadata: Metadata = {
  title: 'Hamro G&G AUTO Enterprises - Best Second Hand Bikes in Kathmandu',
  description: 'G&G AUTO provides reliable, inspected, and fairly priced second-hand two-wheelers in Kathmandu, Nepal.',
  icons: {
    icon: [
      { url: LOGO_URL },
      { url: LOGO_URL, rel: 'shortcut icon' },
    ],
    apple: [
      { url: LOGO_URL },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://picsum.photos" />
        {/* Force instant loading of brand assets */}
        <link rel="preload" as="image" href={LOGO_URL} fetchPriority="high" />
        <link rel="preload" as="image" href={HERO_URL} fetchPriority="high" />
      </head>
      <body className="font-body antialiased min-h-screen">
        <FirebaseClientProvider>
          <Navbar />
          <TransitionProvider>
            <main className="flex-grow pb-16 md:pb-0">
              {children}
            </main>
          </TransitionProvider>
          <Footer />
          <StickyBottomBar />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
