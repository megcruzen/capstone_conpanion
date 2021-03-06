import auth0 from 'auth0-js';
import { AUTH_CONFIG } from  './Auth0Variables';
import AppManager from './modules/AppManager';

class Auth {
  constructor() {

    this.auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'id_token',
        scope: 'openid email profile'
      });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  getInfo = () => {
    console.log(this.profile);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        // this.getInfo();
        this.getCurrentUser()
        .then(() => resolve());
        // resolve();
      });
    })
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const userId = sessionStorage.getItem("User");
      if (userId !== null) {
        resolve(userId);
      } else if (this.profile) {
          AppManager.checkForUser(this.profile.email)
            .then(response => response.json())
            .then(users => {
              if (users.length) {
                sessionStorage.setItem("User", users[0].id);
                // this.props.getAllData();
                resolve(users[0].id);
              } else {
                let newUser = {
                  "username": this.profile.nickname,
                  "email": this.profile.email,
                  "timestamp": new Date().getTime(),
                  "usertype": "cosplayer"
                };
                AppManager.postUser(newUser)
                  .then(user => user.json())
                  .then(user => {
                    sessionStorage.setItem("User", user.id);
                    resolve(user.id);
                  });
              }
            });
      }
    });
  }

  signOut() {
    // clear id token, profile, and expiration
    // clear session storage
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    sessionStorage.removeItem("userId");
  }
}

const auth0Client = new Auth();

export default auth0Client;