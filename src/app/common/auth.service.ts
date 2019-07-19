export class AuthService {
  private isLogged = false;
  login() {
    this.isLogged = true;

  }
  logout() {
    this.isLogged = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
