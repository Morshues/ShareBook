
export const SHARER_COLOR_NONE = 'gray-100';

export const SHARER_COLORS = [
  'amber-500',
  'rose-500',
  'teal-500',
  'violet-500',
  'lime-500',
  'sky-500',
];

export const SHARER_COLOR_SAFE_LIST = ([] as string[]).concat(...['bg-', 'ring-'].map(leadStr =>
  [...SHARER_COLORS, SHARER_COLOR_NONE].map(colorStr => leadStr + colorStr)
));
