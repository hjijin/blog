---
layout: post
title: "Factory Girl构造模拟测试数据"
category: ror
tags: rails
comments: true
---

Factory Girl 是专门用来构造模拟测试数据的，第一次使用还是在学习[ruby on rails tutorial](http://ruby.railstutorial.org/)。  
<!--more-->
生成大量数据可以用association来解决对象间的关联，sequence来解决生成大量测试数据的问题。  

添加 **Factory Girl**

### Gemfile  
{% highlight ruby %}
group :test do   
  gem 'factory_girl_rails', '1.4.0' 
end 
{% endhighlight %}

可以修改spec_helper.rb，禁用Fixture,修改如下
{% highlight ruby %}
# /spec/spec_helper.rb 
# config.fixture_path = "#{::Rails.root}/spec/fixtures" 
{% endhighlight %}

#### Factory Girl使用原则

	1.每个model都定义一个factory。
	2.如果model比较少就把所有的factory定义放到一个文件spec/factories.rb中。

如果model比较多且复制，则每上model在spec/factories/目录下单独建立一个文件[model_name]s.rb

#### 在rspec中三种常见写法

	user = Factory(:user)	#相当于new+save! 
	user = Factory.create(:user)	#同上，是全写 
	user = Factory.build(:user, :username => 'rob')	#只有new没有save 


如在rails tutorial 中的使用方式：

{% highlight ruby %}
# spec/factories.rb 
Factory.define :user do |user|
  user.name      "Michael Hartl"
  user.email     "mhartl@example.com" 
  user.password  "foobar"
  user.password_confirmation  "foobar"
end

Factory.sequence :email do |n|
  "person-#{n}@example.com"
end

Factory.define :micropost do |micropost|
  micropost.content  "Foo bar"
  micropost.association :user
end
{% endhighlight %}

#### 在Rspec中的调用方法
{% highlight ruby %}
post = Factory(:post) 
{% endhighlight %}

#### 其实上面代码相当于：
{% highlight ruby %}
user = User.new 
user.email = "test@example.com" 
user.save! 
post = Post.new 
post.title = "Hello" 
post.user = user post.save! 
{% endhighlight %}

*更多请参考*：[factory_girl](https://github.com/thoughtbot/factory_girl)
