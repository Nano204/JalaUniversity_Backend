
class Reservation {
    destination: string | undefined;
    constructor(private from: Date, private toOrDestination: Date | string) {}
    setDestination(destination: string) {
      this.destination = destination;
    }
  }
  
  type Reserve = {
    (from: Date, to: Date, destination: string): Reservation;
    (from: Date, destination: string): Reservation;
  };
  
  const reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
  ) => {
    const newReservation = new Reservation(from, toOrDestination);
    if (destination) newReservation.setDestination(destination);
    return newReservation;
  };
  
  console.log(reserve(new Date(), new Date(), "String"));
  console.log(reserve(new Date(), "String"));
  