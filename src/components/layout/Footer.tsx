
"use client"

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  const db = useFirestore();
  const settingsRef = useMemoFirebase(() => {
    if (!db) return null;
    return doc(db, 'settings', 'general');
  }, [db]);
  const { data: settings } = useDoc(settingsRef);

  const logoImage = settings?.logo_url || CONTACT_INFO.logoUrl;
  const businessName = settings?.business_name || CONTACT_INFO.businessName;
  const contactPhone = settings?.contact_phone || CONTACT_INFO.phone;
  const contactEmail = settings?.contact_email || CONTACT_INFO.email;
  const address = settings?.address || CONTACT_INFO.address;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}`;

  return (
    <footer className="bg-primary text-white pt-12 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-white rounded-full group-hover:rotate-6 transition-transform overflow-hidden flex items-center justify-center relative border-2 border-white/20">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col space-y-0.5">
              <span className="text-[7px] font-black tracking-[0.4em] text-white/60 leading-none uppercase">
                Hamro
              </span>
              <span className="font-headline font-black text-xl tracking-tight leading-none text-white uppercase whitespace-nowrap">
                G&G AUTO
              </span>
              <span className="text-[7px] font-bold tracking-[0.2em] text-white/40 leading-none uppercase">
                Enterprises
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/70 leading-relaxed">
            Reliable second-hand bikes and scooters showroom in {address.split(',')[0]}. 
            We offer sales, exchange, and servicing for all major brands.
          </p>
          <div className="flex gap-4">
            <a 
              href={CONTACT_INFO.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              title="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/inventory" className="hover:text-white transition-colors">All Inventory</Link></li>
            <li><Link href="/sell" className="hover:text-white transition-colors">Sell Your Bike</Link></li>
            <li><Link href="/exchange" className="hover:text-white transition-colors">Exchange Offers</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition-colors">Staff Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="hover:text-white cursor-default">Used Bike Sales</li>
            <li className="hover:text-white cursor-default">Second Hand Scooters</li>
            <li className="hover:text-white cursor-default">Easy Exchange Facility</li>
            <li className="hover:text-white cursor-default">Insurance Transfer</li>
            <li className="hover:text-white cursor-default">Workshop Services</li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white/40" />
              <a 
                href={CONTACT_INFO.mapsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {address}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-white/40" />
              <a href={`tel:${contactPhone}`} className="hover:text-white transition-colors font-bold">{contactPhone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-white/40" />
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} {businessName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
