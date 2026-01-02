
export enum UserRole {
  PRODUCTEUR = 'producteur',
  ACHETEUR = 'acheteur',
  LOGISTIQUE = 'logistique'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  avatar: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  role: UserRole;
  contentImage: string;
  description: string;
  productType: 'Fruits' | 'Légumes' | 'Céréales' | 'Élevage';
  quantity: string;
  location: string;
  likes: number;
}
