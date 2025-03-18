// TODO: Define a City class with name and id properties
// TODO: Complete the HistoryService class
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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
        console.log('in the addCity function');
        console.log(city);
        this.history.push(city);
        console.log(this.history);
    }
    deleteCity(id) {
        this.history = this.history.filter((city) => city.id !== id);
    }
}

/* const historyService = new HistoryService();
historyService.addCity(new City(city)); */
export { City };
export default new HistoryService();
