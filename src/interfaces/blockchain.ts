export interface IBlockchain {
  id: number;
  name: string;
  logo: string;
  currency: string;
  scan_url: string;
  rpc_url: string;
  created_at?: string;
  updated_at?: string;
}
