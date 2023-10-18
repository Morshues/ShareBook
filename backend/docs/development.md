# Development

##  OAuth Setup
### Google
- Create a service on [Google Console](https://console.cloud.google.com/apis/) ([OAuth setup](https://developers.google.com/identity/protocols/oauth2/web-server))

- use `{rootPath}/login/oauth2/code/google` as redirect link

---

## Project setup
### token secret
To generate a token:
```bash
openssl rand -hex 64
```
Then put it to the `app.auth.tokenSecret` in `application.yaml`
