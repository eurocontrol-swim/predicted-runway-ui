import Airport from "@/models/Airport";

const AirportFactory = {
  fromServer(data) {
    return new Airport(data);
  },
};

export {
  AirportFactory,
};
