import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080/auth',
          realm: 'questMe',
          clientId: 'questMe-openid-client',
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          checkLoginIframe: true,
          checkLoginIframeInterval: 25
        },
        loadUserProfileAtStartUp: true
      });
  }