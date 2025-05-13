export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  author?: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LPResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: LP;
}

export interface LPSResponse {
  status: boolean;
  message: string;
  statudCode: number;
  data: {
    data: LP[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LPComments {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    data: Comment[];
    nextCursor: number;
    hasNext: boolean;
  };
}
