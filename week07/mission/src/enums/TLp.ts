export const PAGINATION_ORDER = {
    asc: "asc",
    desc: "desc",
  } as const;
  
  export type PAGINATION_ORDER = keyof typeof PAGINATION_ORDER;