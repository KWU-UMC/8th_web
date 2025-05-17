export type Tag ={
    id:number;
    name:string;
}

export type Likes ={
    id:number;
    userId:number;
    lpId:number;
}

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = {
  data: Lp[];
};

export type LpDetail = Lp & {
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type CreateLpsDto = {
  title: string;
  content: string;
  thumbnail: string|null;
  tags: string[];
  published: boolean;
}

export type UpdateLpsDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}