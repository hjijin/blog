---
layout: post
title: "git删除master分支"
categories: git
comments: true
tag: ITtools
---

最近把 blog 换了个 theme，并且将 blog 项目移到了一个新的分支：gh-pages，在删除 master 分支时出现了状况。

<!--more-->

首先想到的是直接在终端使用命令删除：

    $ git branch -D master;//删除本地master分支
    $ git push origin :master;//删除远程master分支

发现删除不了，查了一下原因是本地处在 master 分支，在远程 master 为默认分支。

后来是这样解决的：

  1.本地切换到 gh-pages 分支。
    $ git checkout gh-pages

  2.在github上将 项目的 default 分支切换到 gh-pages 分支。具体操作是 进到项目，点击 settings，选择 Branches 后选择不是 master 的分支。

  ![github设置默认分支]({{ site.baseurl }}/upload/2016/0506/branch default.jpg)

  3.这个时候就可以使用以下命令删除了:

    git branch -D master;//删除本地master分支
    git push origin :master;//删除远程master分支

这样就完成删除了。
