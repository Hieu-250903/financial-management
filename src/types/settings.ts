import type { ReactNode } from 'react';

export type SettingsSection = 'profile' | 'notifications' | 'financial' | 'appearance' | 'data' | 'about';

export interface NotifPref {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  enabled: boolean;
}
