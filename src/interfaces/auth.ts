export interface AppUser {
    id: string;
    name: string | null;
    email: string | null;
    image?: string | null;
  }
  
  export interface AppJWT {
    uid?: string; 
  }