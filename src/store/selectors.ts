import {RootState} from "./index";

export const selectTicketsInfo = ({flights}: RootState) =>
  flights.ticketsInfo;
