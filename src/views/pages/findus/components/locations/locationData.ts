/**
 * @fileoverview Location data for Find Us section - Using centralized utilities
 */

import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

// Better laboratory and research icons
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

export interface LocationSectionData {
  id: string;
  title: string;
  titleKey?: string;
  address: string;
  addressKey?: string;
  phone?: string;
  phoneKey?: string;
  email?: string;
  emailKey?: string;
  icon: React.ComponentType<any>;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const LOCATION_SECTIONS: LocationSectionData[] = [
  {
    id: 'corporate-office',
    title: 'Corporate Office',
    titleKey: 'contact.locations.corporate-office.title',
    address: 'Keya Complex, 1st Floor, 254/1,11 Main, 3 Phase, Peenya Industrial Area, Bangalore- 560058, India',
    addressKey: 'contact.locations.corporate-office.address',
    phone: '+91 80505 16699',
    phoneKey: 'contact.locations.corporate-office.phone',
    email: 'info@radiantresearch.in',
    emailKey: 'contact.locations.corporate-office.email',
    icon: BusinessIcon,
    coordinates: {
      lat: 13.0228654,
      lng: 77.5207112
    }
  },
  {
    id: 'lab',
    title: 'Laboratory',
    titleKey: 'contact.locations.laboratory.title',
    address: 'Plot No:99, 8th Main Road, IIIrd Phase, Peenya Industrial Area, Bangalore – 560 058, India',
    addressKey: 'contact.locations.laboratory.address',
    phone: '+91 80505 16699',
    phoneKey: 'contact.locations.laboratory.phone',
    email: 'info@radiantresearch.in',
    emailKey: 'contact.locations.laboratory.email',
    icon: BiotechIcon,
    coordinates: {
      lat: 13.0228654,
      lng: 77.5207112
    }
  },
  {
    id: 'malaysia-office',
    title: 'Malaysia Office',
    titleKey: 'contact.locations.malaysia-office.title',
    address: 'N A-6/14, Arena Green Apartments, Bukit Jalil, Kuala Lumpur-57000, Malaysia',
    addressKey: 'contact.locations.malaysia-office.address',
    phone: '+60 149663689',
    phoneKey: 'contact.locations.malaysia-office.phone',
    email: 'info@radiantresearch.in',
    emailKey: 'contact.locations.malaysia-office.email',
    icon: PublicIcon,
    coordinates: {
      lat: 3.0738,
      lng: 101.689
    }
  }
];

/**
 * Utility functions for interactive actions
 */
export const locationActions = {
  openMap: (address: string, coordinates?: { lat: number; lng: number }) => {
    let mapUrl: string;
    if (coordinates) {
      mapUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    } else {
      const encodedAddress = encodeURIComponent(address);
      mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    }
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  },

  dialPhone: (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\s+/g, '');
    window.location.href = `tel:${cleanNumber}`;
  },

  sendEmail: (email: string, subject?: string) => {
    const emailSubject = subject || 'Inquiry from Website';
    const encodedSubject = encodeURIComponent(emailSubject);
    window.location.href = `mailto:${email}?subject=${encodedSubject}`;
  }
};

export const getLocationSections = (): LocationSectionData[] => {
  return LOCATION_SECTIONS;
};

// Export icons for use in components
export const LocationIcons = {
  Map: MapIcon,
  Phone: PhoneIcon,
  Email: EmailIcon,
  Location: LocationOnIcon,
  Business: BusinessIcon,
  HomeWork: HomeWorkIcon,
  Public: PublicIcon,
  Science: ScienceIcon,
  Biotech: BiotechIcon,
  Medical: MedicalServicesIcon,
  Health: HealthAndSafetyIcon,
  Precision: PrecisionManufacturingIcon,
  Hospital: LocalHospitalIcon
};

export type { LocationSectionData as LocationData };
