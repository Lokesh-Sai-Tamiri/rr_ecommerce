import { redirect } from 'next/navigation';

export default function FindUsPage() {
  redirect('/contact-us');
}

export const metadata = {
  title: 'Find Us - Radiant Research',
  description: 'Visit our office locations across India. Find contact information and directions to our offices in major cities.',
  keywords: 'office locations, contact, address, Radiant Research offices, India'
};
