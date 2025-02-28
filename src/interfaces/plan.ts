export interface IPlan {
  id: number;
  name: string;
  description: string;
  roi: number | null;
  referral: number | null;
  level: number | null;
  created_at?: string;
  updated_at?: string;
}
