class Lobby {
  constructor(data = {}) {
    this.GameParameters = data.GameParameters || {};
    this.users = data.users || [];
    this.state = data.state || {};
    this.host = data.host || null;
    // If there are more properties in data that should be directly assigned, consider iterating over them
  }
}

export default Lobby
