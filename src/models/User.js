class User {
  constructor(data = {}) {
    this.userId = null;
    this.username = null;
    this.profileImageUrl = null;
    Object.assign(this, data);
  }
}

export default User;
