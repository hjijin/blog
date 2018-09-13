---
layout: post
title: "Use Let's Encrypt add HTTPS to your Website"
category: Linux
tags: IT技术
comments: true
---

今天我将公司的主站变成了 HTTPS 安全访问，不是因为网站被国内的电信运营商在访问时加入了一些弹窗广告，也不是 HTTP 的网站在搜索引擎中的 rank 会更低，只是因为给微信小程序提供的接口只支持 HTTPS，这没办法，顺便记录下我启用 HTTPS 的过程。
<!--more-->
### 一、背景知识

可能你需要了解一下：
> [1、http 和 https 有何区别？如何灵活使用？](https://www.zhihu.com/question/19577317)
>
> [2、SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
>
> [3、为什么要部署 https？](https://zhuanlan.zhihu.com/p/29022279)

### 二、生成 Let's Encrypt 证书

现在国内的很多云服务商也提供收费和免费的方案，我用的是 [Let’s Encrypt](https://letsencrypt.org/) 这个免费的解决方案。

>Let's Encrypt由互联网安全研究小组（缩写ISRG）提供服务。主要赞助商包括电子前哨基金会、Mozilla基金会、Akamai以及思科。2015年4月9日，ISRG与Linux基金会宣布合作。
>用以实现新的数字证书认证机构的协议被称为自动证书管理环境（ACME）。GitHub上有这一规范的草案，且提案的一个版本已作为一个Internet草案发布。
>Let's Encrypt宣称这一过程将十分简单、自动化并且免费。

以上介绍文字来自维基百科的 [Let’s Encrypt](https://zh.wikipedia.org/wiki/Let%27s_Encrypt) 词条。

Let's Encrypt 证书生成不需要手动进行，官方推荐 [certbot](https://certbot.eff.org/) 这套自动化工具来实现，所以只需要就可以轻松搞定：

#### 1. 下载安装 certbot (Let’s Encrypt项目的自动化工具)

直接打开 [certbot](https://certbot.eff.org/) 网站上，选择你的 Web Server 和 操作系统，就能看到对应的安装和配置教程。
比如，我选的 nginx 和 Ubuntu 16.04，然后下面就会展示一个安装教程网页。你就照着做一遍就好了。

##### 1.1 安装系统环境依赖
```bash
  $ sudo apt-get install software-properties-common
  $ sudo add-apt-repository ppa:certbot/certbot
  $ sudo apt-get update
  $ sudo apt-get install python-certbot-nginx
```
##### 1.2 然后，运行如下命令：
```bash
  $ sudo certbot --nginx
```
安装开始后会让你输入一个用于接受紧急更新和安全通知的邮箱，然后 certbot 会自动检查到你的 nginx.conf 下的配置，把你所有的虚拟站点都列出来，然后让你选择需要开启 https 的站点。你就简单的输入列表编号（用空格分开），然后，certbot 就帮你下载证书并更新 nginx.conf 了。

#### 2. 配置文件

在你的服务器找到 Nginx 的配置文件 **nginx.conf**，可以发现你的文件中的 server 配置可能多了如下的修改：
```bash
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```

```bash
  server {
    if ($host = example.com) {
      return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;

    server_name example.com;
    return 404; # managed by Certbot
  }
```
这里建议配置 http2,作用是启用 Nginx 的 [ngx_http_v2_module 模块](https://nginx.org/en/docs/http/ngx_http_v2_module.html)  支持 HTTP2，Nginx 版本需要高于 1.9.5。开启HTTP/2其实很简单，只需要在 nginx.conf 的 listen 443 ssl; 后面加上 http2 就可以：
```bash
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl http2; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```
然后重启 Nginx ：
```bash
  $ sudo service nginx restart
```
#### 三、自动化更新证书

Let's Encrypt 证书有效期是3个月，我们可以通过 certbot 来自动化续期。Linux 系统设置自动化的更新脚本，我用 crontab，使用 crontab -e 命令加入如下的定时作业：

```bash
# 每个月都强制更新一下
0 0 1 * * /usr/bin/certbot renew --force-renewal
5 0 1 * * /usr/sbin/service nginx restart
```
你也可以设置你想要的方式，如想了解更多关于 [crontab 定时任务](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html) 的用法可以点击查看。

**注意:**启用HTTPS后，你的网页中的所有的使用 `http://` 的方式的地方都要改成 `https://`

用专业在线工具测试你的服务器 SSL 安全性：[Qualys SSL Labs](https://www.ssllabs.com/ssltest/index.html) 提供了全面的 SSL 安全性测试，填写你的网站域名，给自己的 HTTPS 配置打个分。

ok, give me five!
