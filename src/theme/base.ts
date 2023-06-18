import { Theme } from '@mui/material';
import { LightTheme } from './schemes/LightTheme';

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  LightTheme,
};