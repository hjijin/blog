今天在我的centos7.2开发环境安装git2.x时候遇到了各种问题，还好一一解决，为方便大家，这里列出遇到的问题和解决办法，yum默认安装的git1.8版本的，公司git服务器在windows搭建的，使用1.8的git一直提示认证失败。网管说得更新到2.x，于是于是就有了今天的问题。


安装
从github获取最新的release版本源码：

wget https://github.com/git/git/archive/v2.11.0.tar.gz
解压到当前目录
tar -zxvf  git-2.11.0 
编译执行make指令

1.报如下错误：

warning: expat.h: No such file or directory

解决办法：
yum install expat-devel

2.报如下错误：

http.h:6:23: 致命错误：curl/curl.h：没有那个文件或目录
 #include <curl/curl.h>

解决办法：
yum install libcurl-devel

3.报如下错误：
Can't locate ExtUtils/MakeMaker.pm in @INC (@INC contains: /usr/local/lib64/perl5 /usr/local/share/perl5 /usr/lib64/perl5/vendor_perl /usr/share/perl5/vendor_perl /usr/lib64/perl5 /usr/share/perl5 .) at Makefile.PL line 3.
BEGIN failed--compilation aborted at Makefile.PL line 3.
make[1]: ***  Error 2
make: ***  Error 2

解决办法：
yum install perl-ExtUtils-MakeMaker package

编译安装：

make

make install

大功告成：


编译git时报错： zlib.h: No such file or directory
cache.h:40:18: 致命错误：zlib.h：没有那个文件或目录
缺少 zlib的头文件， 开发包没装，
	yum install zlib （系统默认已经装上）
	yum install zlib-devel 

bin/sh:行1: docbook2x-texi: 未找到命令
即使安装了 yum install docbook2X 问题依然存在，原来需要：
sudo ln -s /usr/bin/db2x_docbook2texi /usr/bin/docbook2x-texig

fatal error: openssl/aes.h: No such file or directory
	sudo yum install openssl-devel

Git is a free and open source distributed version control system, that is designed to handle any project; from small to very large projects with speed, data integrity and efficiency.
In this tutorial, I’m going to show you how-to install Git on CentOS7, using Yum and from the source.

I’ll be using a 512 MB VPS from Digital Ocean. It’s only $5 per month and CentOS 7 is pre-installed!

Install Git Using Yum

First, we will make sure existing packages are up-to-date before we install Git:

sudo yum -y update
Next, we will install Git using Yum:

sudo yum install git
As always, we should confirm what we installed is actually installed. Check to see if Git is installed by running the following command:

git --version
You should see something like this:

git version 1.8.3.1
You are now done installing Git with Yum on CentOS 7.

Install Git From Source

In this part of the tutorial, I’m going to show you how-to install Git from source.

Again, we will firstly make sure existing packages are up-to-date:

sudo yum -y update
We will now install Git dependencies:

yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-ExtUtils-MakeMaker asciidoc xmlto
Next, we will download the current latest version of Git:

wget https://www.kernel.org/pub/software/scm/git/git-2.2.2.tar.gz
You can always get the latest version of Git here.

Now we’ll unpack the tar archive file:

tar -zxf git-2.2.2.tar.gz
Next we will change to the directory:

cd git-2.2.2
Remember, if you are using a different version of Git, you will need to change the 2.2.2 part of the above three (3) commands.

We will now generate the configure script:

make configure
If you get an error like so:

/bin/sh: autoconf: command not found
You will need to run the following command and then the make configure command:

sudo yum install autoconf
If you are successful, you will get GEN configure. Now we will create the Makefile:

./configure --prefix=/usr
If you get an error stating that no acceptable C compiler can be found. Run the following command and then run the above command:

yum groupinstall "Development tools"
We will now run the following command:

make all doc info
We will now compile the source code into a working program and install it:

sudo make install install-doc install-html install-info
You’re done!

Configure Git

After you’ve installed Git, we will setup Git:

git config --global user.name "Your Name"
You name should be replaced with your name.

git config --global user.email "you@example.com"
you@example.com should be replaced with your e-mail address.

Run the following command to check what you just set as your name and e-mail:

git config --list
You should see something like this (replaced with the info you’ve entered):

user.name=Your Name
user.email=you@example.com
A Quick Git Test

Let’s do a quick test by cloning a git repository:

git clone https://github.com/brandonhimpfen/HTML-Template
You’ve just cloned my awesome HTML Template git repository. HTML Template is a professional, SEO optimized, HTML5 ready front-end template.

link:
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
https://www.kernel.org/pub/software/scm/git/
http://www.himpfen.com/install-git-centos-7/
