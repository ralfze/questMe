var session = require('express-session');
var Keycloak = require('keycloak-connect');

let keycloak;

var keycloakConfig = {
    "realm": "questMe",
    "bearer-only": true,
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "external",
    "resource": "questMe-openid-rest-client",
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0,
    "realmPublicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjJ0JuoDkGIADZJDkQPoRYNJkCgqvx8t7W5qyfeZSjH1UeMQAsQlGjX0Ll98PVNJySeLHi1YONQuM1WY8Rg9rOAHfmw4nyU07SH6/hR584YkBKQ+qc+EAaQQ0GEOVl7AkCSjS9XbRotgV1XPAQ2E+LHVrm9DFnkQNFS79EVNv3UzUplFvEcUacNga6SF706PxgzZP46NwIFJox6PspBNTo0AWDV5itxTugFbtC4CcqAPeCljwRQHB9CmK2yXYerk5tw5Sj70G5FGStdUWcRQ6adm06rYi2wTePd/xmOTy9C4vQ+lPssDLtfRTkirEDoWFwk44E9LGhGBUE6V4rJKBeQIDAQAB"
};

function initKeycloak() {
    if (keycloak) {
        console.log("Returning existing Keycloak instance!");
        return keycloak;
    } else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({
            store: memoryStore,
            secret: 'any_key',
            resave: false,
            saveUninitialized: true
        }, keycloakConfig);
        return keycloak;
    }
}

module.exports = { initKeycloak };