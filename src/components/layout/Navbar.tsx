
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Wrench, Bike, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFirestore, useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
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

  const logoImage = settings?.logo_url || CONTACT_INFO.logoUrl;

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
        <div className="flex justify-between h-24 items-center">
          <Link href="/" className="flex items-center gap-5 group">
            <div className="w-14 h-14 bg-white rounded-full group-hover:rotate-6 transition-transform duration-500 shadow-md border-2 border-primary/5 overflow-hidden flex items-center justify-center relative shrink-0">
              <img 
                src={logoImage} 
                alt="G&G Auto Logo" 
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground/60 leading-tight uppercase">
                Hamro
              </span>
              <span className="font-headline font-black text-2xl md:text-3xl tracking-normal leading-tight text-primary uppercase whitespace-nowrap">
                G&G AUTO
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/30 leading-tight uppercase">
                Enterprises
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
              className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
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
