interface ICreatePresentationSeatDTO {
  id?: string;
  presentationId: string;
  seatId: string;
  available: boolean;
  price: number;
}

export { ICreatePresentationSeatDTO };
