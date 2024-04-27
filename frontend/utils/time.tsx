import moment from "moment";

export const relativeTime = (datetime: Date) => {
  const startDate = moment(datetime);
  const elapsedDuration = moment.duration(moment().diff(startDate));
  const elapsedMinutes = Math.floor(elapsedDuration.asMinutes());
  const elapsedHours = Math.floor(elapsedDuration.asHours());
  if (elapsedMinutes < 60) return `${elapsedMinutes}m`;
  if (elapsedHours < 24) return `${elapsedHours}h`;
  return `${Math.floor(elapsedDuration.asDays())}d`;
};