const SWRKeys = {
  user: (userId: number) => `/api/user/${userId}`,
  userLinks: (userId: number) => `api/links/${userId}`,
};

export default SWRKeys;
