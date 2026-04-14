"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Wrench, Bike, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CONTACT_INFO } from '@/lib/constants';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const { user } = useUser();
  const db = useFirestore();

  const roleRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, 'roles_admin', user.uid);
  }, [db, user?.uid]);

  const { data: roleData } = useDoc(roleRef);
  const isSuperAdmin = roleData?.role === 'super_admin';

  const settingsRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, 'settings', 'general');
  }, [db]);
  const { data: settings } = useDoc(settingsRef);

  const logoImage = settings?.logo_url || PlaceHolderImages.find(img => img.id === 'logo')?.imageUrl || 'https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-1/593739152_830641063205263_2454045155820817139_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeHi_xsQHWcLkkyjcfB0YwM-7cEeyjqOIf_twR7KOo4h_9fRErvbchD1UMhUeW0Ot7O1yjKuwJWOw0Xog1DOidxd&_nc_ohc=pyFYQPBopocQ7kNvwEMrf_z&_nc_oc=AdqV8gDwDHCPDitRmaMC6OXYNDMwm-DANqtRp5wIXQTWZ_r27LnAWcXWu5m3yLog9UE&_nc_zt=24&_nc_ht=scontent.fktm1-1.fna&_nc_gid=3P3KoNK69sTEyeU8MYPUbw&_nc_ss=7a32e&oh=00_AfyDzbJGks-2tVK1w3AOR3qaQQU5ynIMRJUxRCtnizVYQ&oe=69C701C1';
  const businessName = settings?.business_name || CONTACT_INFO.businessName;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Services', href: '/services' },
    { name: 'Sell Bike', href: '/sell' },
    { name: 'Exchange', href: '/exchange' },
  ];

  const adminLinks = [
    { name: 'Inventory', href: '/admin/dashboard' },
    { name: 'Leads', href: '/admin/inquiries' },
    ...(isSuperAdmin ? [
      { name: 'Roles', href: '/admin/roles', icon: <Users className="w-4 h-4" /> },
      { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> }
    ] : [])
  ];

  const links = isAdminPage ? adminLinks : navLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-full group-hover:rotate-6 transition-transform duration-300 shadow-md border overflow-hidden flex items-center justify-center relative">
              <Image 
                src={logoImage} 
                alt="Logo" 
                fill
                priority={true}
                className="object-cover"
                data-ai-hint="business logo"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-2xl tracking-tighter leading-none text-primary uppercase whitespace-nowrap">
                {businessName}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                  pathname === link.href ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-200 mx-2" />
            
            <div className="flex items-center gap-3">
              {isAdminPage ? (
                <div className="flex items-center gap-3">
                  {isSuperAdmin && <Badge className="bg-primary/10 text-primary border-primary/20">SUPER ADMIN</Badge>}
                  <Button variant="outline" className="font-bold gap-2 rounded-full" asChild>
                    <Link href="/"><Bike className="w-4 h-4" /> View Site</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" className="font-bold text-primary gap-2" asChild>
                    <Link href="/book-service"><Wrench className="w-4 h-4" /> Book Service</Link>
                  </Button>
                  <Button className="font-bold rounded-full px-6 shadow-lg shadow-primary/20" asChild>
                    <Link href="/inventory">Browse Bikes</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-foreground/80 hover:bg-gray-50 hover:text-primary transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {!isAdminPage && (
              <Link
                href="/book-service"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-primary hover:bg-primary/5 transition-all flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Wrench className="w-4 h-4" /> Book Appointment
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
