class City {
  constructor(id, name, state, country, latitude, longitude) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

class HistoryService {
  constructor() {
    this.history = [];
  }
  getHistory() {
    return this.history;
  }
  addCity(city) {
    this.history.push(city);
  }
  deleteCity(id) {
    const index = this.history.findIndex((city) => city.id === id);
    if (index !== -1) {
      this.history.splice(index, 1); // Remove the city from the array
      return true;
    }
    return false; // City not found
  }
}

export { City };
export default new HistoryService();
