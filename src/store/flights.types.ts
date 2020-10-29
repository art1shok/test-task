export interface Segment{
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number
}

export interface TicketData {
  price: number;
  carrier: string;
  segments: [
    Segment,
    Segment
  ]
}

export interface TicketsInfo {
  tickets: TicketData[],
  stop: boolean
}

export interface FlightsState {
  ticketsInfo: TicketsInfo,
  error: null | string
}

interface BaseAction {
  type: string
}

interface PayloadAction<T> extends BaseAction {
  payload: T;
}

export type GetSearchIdAction = BaseAction;
export type GetTicketsAction = PayloadAction<TicketsInfo>;
export type SetErrorAction = PayloadAction<string>;
export type FlightsActionTypes = GetSearchIdAction | GetTicketsAction | SetErrorAction;
