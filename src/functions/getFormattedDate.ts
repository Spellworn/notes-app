import { formatDistanceToNow } from "date-fns";

export const getFormattedDate = (date: string) => {
  const timePeriod = formatDistanceToNow(date);

  return `${timePeriod} ago`;
};
