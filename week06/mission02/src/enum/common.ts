export enum PAGINATION_ORDER {
  "asc" = "asc",
  "desc" = "desc",
}

export type OrderType = keyof typeof PAGINATION_ORDER;
