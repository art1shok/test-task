export const selectTicketsInfo = ({ flights }) =>
  Object.keys(flights.ticketsInfo).length > 0 ? flights.ticketsInfo : { tickets: [] };
