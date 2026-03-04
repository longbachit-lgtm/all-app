export interface AppData {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  accessLink: string;
  purchaseDate: string;
  licenseType: 'Lifetime' | 'Subscription' | 'Free';
  isOwned: boolean;
}

export const CATEGORIES = [
  { value: 'image-gen', label: 'Image Gen' },
  { value: 'text-gen', label: 'Text Gen' },
  { value: 'video-gen', label: 'Video Gen' },
  { value: 'audio-gen', label: 'Audio Gen' },
];
