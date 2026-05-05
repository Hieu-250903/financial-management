import { 
  Plane, Laptop, PiggyBank, Coffee, ShoppingBag, 
  Gamepad2, Car, Home, Smartphone, GraduationCap, 
  Heart, Gem, Gift, Music, Dumbbell, Utensils, Fuel, Wifi, Zap, type LucideIcon
} from 'lucide-react';

export const goalIcons: Record<string, { Icon: LucideIcon; label: string }> = {
  PiggyBank: { Icon: PiggyBank, label: 'Savings' },
  Laptop: { Icon: Laptop, label: 'Tech' },
  Plane: { Icon: Plane, label: 'Travel' },
  Car: { Icon: Car, label: 'Car' },
  Home: { Icon: Home, label: 'Home' },
  Smartphone: { Icon: Smartphone, label: 'Phone' },
  GraduationCap: { Icon: GraduationCap, label: 'Education' },
  Heart: { Icon: Heart, label: 'Health' },
  Gem: { Icon: Gem, label: 'Luxury' },
  Gift: { Icon: Gift, label: 'Gift' },
  Music: { Icon: Music, label: 'Music' },
  Dumbbell: { Icon: Dumbbell, label: 'Fitness' },
};

export const limitIcons: Record<string, { Icon: LucideIcon; label: string }> = {
  Coffee: { Icon: Coffee, label: 'Food' },
  ShoppingBag: { Icon: ShoppingBag, label: 'Shopping' },
  Gamepad2: { Icon: Gamepad2, label: 'Entertainment' },
  Car: { Icon: Car, label: 'Transport' },
  Utensils: { Icon: Utensils, label: 'Dining' },
  Fuel: { Icon: Fuel, label: 'Fuel' },
  Wifi: { Icon: Wifi, label: 'Internet' },
  Zap: { Icon: Zap, label: 'Utilities' },
  Heart: { Icon: Heart, label: 'Health' },
  GraduationCap: { Icon: GraduationCap, label: 'Education' },
};

export const goalColors = ['#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#3b82f6', '#ef4444', '#f97316'];
