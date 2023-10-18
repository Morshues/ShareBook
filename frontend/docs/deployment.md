# Deployment

---
## [Deploy on Ubuntu 22.04]

### 1. Update Linux System
```bash
sudo apt-get update
```

### 2. Install NodeJS
Follow instructions on [nodesource](https://github.com/nodesource/distributions#ubuntu-versions)

### 3. Clone Repository and Install Dependencies
```bash
git clone https://github.com/Morshues/ShareBook.git
cd ShareBook/frontend
npm install
```

### 4. Building

```bash
npm run build
```

If met the error of memory not enough problem, add swap the run `npm run build` again.
```bash
sudo dd if=/dev/zero of=/swapfile1 bs=2028 count=2048000
sudo mkswap /swapfile1
sudo swapon /swapfile1
```

### 5. Set Up Systemd for Client Application
#### a. Add sab-client service
```bash
vim /etc/systemd/system/sab-client.service
```
```ini
[Unit]
Description=Share Account Book Nodejs client Application
After=network.target

[Service]
Type=simple
User=sabuser
Environment=PATH=/usr/bin:/usr/local/bin
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/ShareAccountBook/ShareBook/frontend
SuccessExitStatus=143
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```
#### b. Add a new user
```bash
sudo useradd -M --shell /usr/sbin/nologin sabuser
```
#### c. Register, start, and check the client service
```bash
sudo systemctl daemon-reload
sudo systemctl enable sab-client
sudo systemctl start sab-client
```
check service status:
```bash
systemctl status sab-client.service
```

### 6. Setup NGINX for Client
We use `sab.morshues.com` as the sample domain
#### a. Edit nginx configuration
```bash
vim /etc/nginx/sites-available/sab-client.morshues.com
```
```nginx
server {
    listen       80;
    listen       443;
    server_name  sab.morshues.com;

    location / {
        proxy_pass         http://localhost:3000;
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
#### b. Link and restart NGINX for Client
```bash
sudo ln -s /etc/nginx/sites-available/sab-client.morshues.com /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

### 7. Install and Configure Certbot
We use `sab.morshues.com` as the sample domain
#### Install
```bash
sudo apt install certbot python3-certbot-nginx
```
#### Configure
```bash
sudo certbot --nginx -d sab.morshues.com
```

#### reload nginx
```bash
sudo systemctl reload nginx
```
