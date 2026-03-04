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
  { value: 'image-gen', label: 'Tạo Ảnh' },
  { value: 'text-gen', label: 'Tạo Văn Bản' },
  { value: 'video-gen', label: 'Tạo Video' },
  { value: 'audio-gen', label: 'Tạo Âm Thanh' },
];
