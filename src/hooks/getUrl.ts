/** @format */
export const getUrl = (type: string, options?: any[]) => {
  return `https://api.themoviedb.org/3/${type}?api_key=acecc2235b3b867602d49291bcc21926&${options?.map(
    (option) => {
      const [key, value] = Object.entries(option)[0];
      return `${key}=${value}`;
    }
  )}
  `;
};
