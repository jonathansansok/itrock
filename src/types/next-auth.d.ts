export {};
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;                 
      name: string;
      email: string;
      image?: string | null;
    };
  }


  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;            
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
  }
}
