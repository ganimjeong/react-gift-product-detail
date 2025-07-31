import axios from './axiosInstance';

//CategorySection
export interface Category {
  themeId: number;
  name: string;
  image: string;
}

export const fetchThemeList = async () => {
  const res = await axios.get<{ data: Category[] }>('/themes');
  return res.data;
};

//ThemeHero
export const fetchThemeInfo = async (themeId: string) => {
  const res = await axios.get(`/themes/${themeId}/info`);
  return res.data;
};
