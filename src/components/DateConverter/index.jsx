const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateConverter = (dategiven) => {
  const K = new Date(dategiven);

  const date = dategiven.slice(8, 10);
  const month = Months[parseInt(dategiven.slice(5, 7)) - 1];

  const hr = dategiven.slice(11, 13);

  const mins = dategiven.slice(14, 16);

  const ampm = hr > 12 ? "PM" : "AM";

  return `${date} ${month}, ${hr % 12}:${mins} ${ampm}`;
};

export default DateConverter;
