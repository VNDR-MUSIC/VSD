
export interface Account {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  walletAddress: string;
  vsdBalance: number;
  status: 'Active' | 'Suspended';
  joined: string;
  isAdmin?: boolean;
}
