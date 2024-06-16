export const convertTime = (isoTime: string | undefined): string => {
  if (!isoTime) {
    return '??:??';
  }
  const date = new Date(isoTime);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
