---
slug: deploy-blog-with-acme
title: "博客部署: acme.sh + nginx"
draft: false
categories: ["ops", "nginx", "https", "OCSP"]
summary: "acme.sh + nginx 快速参考"
authors: [aweffr]
---

先配好DNS，本文以本站 aweffr.com 为例。

1. 安装

网络情况好的情况下
```bash
# 最新版
curl https://get.acme.sh | sh
```

网络不好时[acme.sh-2.9.0.tar.gz](./acme.sh-2.9.0.tar.gz)
```bash
tar zxvf acme.sh-2.9.0.tar.gz && cd acme.sh-2.9.0 && ./acme.sh --install
```

安装好后acme的程序和后续配置，证书都在`~/.acme.sh`

安装nginx
```bash
sudo apt install nginx-full
```

创建用于nginx访问let's encrypt challenge的目录
```bash
mkdir -p /var/www/le_root/.well-known/acme-challenge
chown -R root:www-data /var/www/le_root
```

创建文件 `/etc/nginx/includes/letsencrypt-webroot`
```nginx
# /etc/nginx/includes/letsencrypt-webroot

location /.well-known/acme-challenge/ {
    alias /var/www/le_root/.well-known/acme-challenge/;
}
```

然后 `vim /etc/nginx/sites-enabled/default`

```nginx
# /etc/nginx/sites-enabled/default

server {
    listen 80;
    server_name aweffr.com;

    # ....

    # Let's Encrypt webroot
    include includes/letsencrypt-webroot;
}
```

重启 nginx 生效 `systemctl reload nginx.service`

然后签发证书

```bash
acme.sh --issue -d aweffr.com -d www.aweffr.com -d git.aweffr.com -d api.aweffr.com -d blog.aweffr.com --ecc -w /var/www/le_root --keylength ec-256

# ...
# [Fri 01 Jan 2021 12:51:46 AM CST] Cert success.
# ...
# [Fri 01 Jan 2021 12:51:46 AM CST] Your cert is in  /root/.acme.sh/aweffr.com_ecc/aweffr.com.cer
# [Fri 01 Jan 2021 12:51:46 AM CST] Your cert key is in  /root/.acme.sh/aweffr.com_ecc/aweffr.com.key
# [Fri 01 Jan 2021 12:51:46 AM CST] The intermediate CA cert is in  /root/.acme.sh/aweffr.com_ecc/ca.cer
# [Fri 01 Jan 2021 12:51:46 AM CST] And the full chain certs is there:  /root/.acme.sh/aweffr.com_ecc/fullchain.cer
```
实际签发就是 aweffr.com 一张证书，里面dns记录包含 aweffr.com, www.aweffr.com, git.aweffr.com, api.aweffr.com, blog.aweffr.com。

然后告诉acme.sh如何install这个cert，它就会定时拷贝文件到/etc/nginx目录, 并自动reload nginx。
```bash
mkdir -p /etc/nginx/certs/aweffr.com
acme.sh --install-cert --ecc -d aweffr.com --cert-file /etc/nginx/certs/aweffr.com/cert --key-file /etc/nginx/certs/aweffr.com/key --fullchain-file /etc/nginx/certs/aweffr.com/fullchain --reloadcmd "systemctl reload nginx.service"
```

生成 dbparam:
```bash
openssl dhparam -dsaparam -out /etc/nginx/certs/aweffr.com/dhparam.pem 2048
```

具体nginx的ssl配置可以参考 [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=nginx&config=intermediate&openssl=1.1.1d&guideline=5.6)

最后往nginx的site里添加ssl配置
```nginx
server {
  ...
  listen 443 ssl http2;

  ssl_certificate         certs/aweffr.com/fullchain;
  ssl_certificate_key     certs/aweffr.com/key;
  ssl_trusted_certificate certs/aweffr.com/fullchain;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers off;

  ssl_session_timeout 1d;
  ssl_session_cache shared:MozSSL:10m;  # about 40000 sessions
  ssl_session_tickets off;

  # HSTS (ngx_http_headers_module is required) (63072000 seconds)
  add_header Strict-Transport-Security "max-age=63072000" always;

  # DHE密码器的Diffie-Hellman参数
  ssl_dhparam certs/aweffr.com/dhparam.pem;

  # OCSP Stapling
  ssl_stapling           on;
  ssl_stapling_verify    on;
  resolver               1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
  resolver_timeout       3s;

  ...
}
```

执行
```bash
openssl s_client -connect aweffr.com:443 -status -tlsextdebug < /dev/null 2>&1 | grep -i "OCSP response"
```
显示
```
OCSP response:
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
```
说明 OCSP 已开启。

参考链接
1. [https://www.rmedgar.com/blog/using-acme-sh-with-nginx](https://www.rmedgar.com/blog/using-acme-sh-with-nginx)
2. [从无法开启 OCSP Stapling 说起](https://imququ.com/post/why-can-not-turn-on-ocsp-stapling.html)

