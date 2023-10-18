# Deployment

---
## [Deploy on Ubuntu 22.04]

### 1. Update Linux System
```bash
sudo apt-get update
```

### 2. Install and Set Up PostgreSQL
#### a. Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib
```
#### b. Set Up Database and Users
```bash
sudo -u postgres psql
```
```postgresql
CREATE USER root superuser;
ALTER ROLE root WITH LOGIN;
CREATE USER shareacctbook PASSWORD '****';
CREATE DATABASE share_acct_book; 
GRANT ALL PRIVILEGES ON DATABASE share_acct_book TO shareacctbook;
```

### 3. Install Java 17
```bash
sudo apt install openjdk-17-jdk -y
```
check java version
```bash
java -version
```
Sample Result:
```
root@root:~# java -version
openjdk version "17.0.7" 2023-04-18
OpenJDK Runtime Environment (build 17.0.7+7-Ubuntu-0ubuntu118.04)
OpenJDK 64-Bit Server VM (build 17.0.7+7-Ubuntu-0ubuntu118.04, mixed mode, sharing)
```

### 4. Building the Application on local
```bash
gradle clean build
```

### 5. Transfer Build to the Server
```bash
scp  build/libs/ShareAccountBook-0.0.1-SNAPSHOT.jar root@{yourServerDomain}:/home/ShareAccountBook/sab.jar
```

### 6. Setup Systemd Service for the Application
We use `prod` as the sample environment. (Need to include the `application-prod.yaml` file while building on step 4)
#### a. Add sab-server service
```bash
vim /etc/systemd/system/sab-server.service
```
```ini
[Unit]
Description=Share Account Book Spring Boot Application
After=syslog.target

[Service]
User=sabuser
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod /home/ShareAccountBook/sab.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### b. Add a new user
```bash
sudo useradd -M --shell /usr/sbin/nologin sabuser
```
#### c. Register, start, and check the service
```bash
sudo systemctl daemon-reload
sudo systemctl enable sab-server
sudo systemctl start sab-server
```
check service status:
```bash
systemctl status sab-server.service
```
```
● sab-server.service - Share Account Book Spring Boot Application
     Loaded: loaded (/etc/systemd/system/sab-server.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-10-18 01:21:17 UTC; 4h 13min ago
   Main PID: 110581 (java)
      Tasks: 31 (limit: 1116)
     Memory: 333.6M
        CPU: 57.128s
     CGroup: /system.slice/sab-server.service
             └─110581 /usr/bin/java -jar -Dspring.profiles.active=prod /home/ShareAccountBook/sab.jar
```

### 7. Setup NGINX
We use `sab-server.morshues.com` as the sample domain
#### a. Edit nginx configuration
```bash
vim /etc/nginx/sites-available/sab-server.morshues.com
```
```nginx
server {
    listen       80;
    listen       443;
    server_name  sab-server.morshues.com;

    location / {
        proxy_pass         http://localhost:5566;
        proxy_redirect     off;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
  root   html;
  }
}
```
#### b. Link and restart NGINX
```bash
sudo ln -s /etc/nginx/sites-available/sab-server.morshues.com /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

### 8. Install and Configure Certbot
We use `sab-server.morshues.com` as the sample domain
#### Install
```bash
sudo apt install certbot python3-certbot-nginx
```
#### Configure
```bash
sudo certbot --nginx -d sab-server.morshues.com
```

#### reload nginx
```bash
sudo systemctl reload nginx
```

