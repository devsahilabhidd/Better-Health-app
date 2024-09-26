// export const PRIMARY = '#000000';
// export const SECONDARY = '#ffffff';

const light = false;
// const light = true;
export const DARK = '#000000';
export const LIGHT = '#ffffff';
// export const LIGHT_GREEN = '#66ffc2';
export const LIGHT_GREEN = '#00e68a';

export const PRIMARY = light ? LIGHT : DARK;
export const SECONDARY = light ? DARK : LIGHT;

export const BACKGROUND_COLOR = light ? '#e6ffe6' : '#14141f';

export const TERTIARY = '#38A169'; // green-700
