import axios from './axiosInstance';

export const fetchThemeInfo = async (themeId: string) => {
  const res = await axios.get(`/themes/${themeId}/info`);
  return res.data;
};
