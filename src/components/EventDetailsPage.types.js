// Event Props Interface (TypeScript types for reference)
// If using TypeScript, create this as EventDetailsPage.types.ts

export interface EventCoordinates {
  lat: number;
  lng: number;
}

export interface EventProps {
  id: number;
  title: string;
  category: string;
  banner: string;
  description: string;
  location: string;
  city: string;
  country: string;
  coordinates: EventCoordinates;
  deadline: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  registrationLink: string;
  organizer: string;
  eligibility: string;
  fee: string;
  prizes: string;
  contact: string;
  website: string;
  tags: string[];
  color: string;
}

// Example usage in parent component:
/*
import EventDetailsPage from './components/EventDetailsPage';

const sampleEvent = {
  id: 1,
  title: 'International Science Olympiad 2024',
  category: 'Olympiad',
  banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
  description: 'Join the most prestigious science competition...',
  location: 'Singapore Science Centre',
  city: 'Singapore',
  country: 'Singapore',
  coordinates: { lat: 1.3334, lng: 103.7371 },
  deadline: 'December 15, 2024',
  registrationDeadline: '2024-12-15',
  startDate: 'January 20, 2025',
  endDate: 'January 25, 2025',
  registrationLink: 'https://example.com/register',
  organizer: 'International Science Foundation',
  eligibility: 'Students aged 15-18',
  fee: 'Free',
  prizes: '$100,000 in total prizes',
  contact: 'info@scienceolympiad.org',
  website: 'https://scienceolympiad.org',
  tags: ['Science', 'Competition', 'International', 'STEM'],
  color: 'bg-blue-500',
};

<EventDetailsPage event={sampleEvent} />
*/
