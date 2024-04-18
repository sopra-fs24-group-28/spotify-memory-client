class User {
  constructor(data = {}) {
    this.userId = null;
    this.username = null;
    this.profileImageUrl = "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"; // TODO: placeholder image, remove later
    Object.assign(this, data);
  }
}

export default User;
