export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const QUERY_KEY = {
  lps: "lps",
  lpDetail: "lpDetail",
  comments: "comments",
  //lpDetail은 LP 상세정보를 조회하는 쿼리의 키로 사용된다.
  //이 키를 사용하여 React Query에서 해당 쿼리를 식별하고 관리한다.
  //예를 들어, LP 상세정보를 가져오는 쿼리를 사용할 때, 이 키를 사용하여 쿼리를 식별하고 캐시할 수 있다.
  //이 키를 사용하여 쿼리를 무효화하거나 새로 고칠 수 있다.
};
