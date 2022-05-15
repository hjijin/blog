---
layout: post
title: "Metaprogramming in Ruby"
category: Ruby
excerpt: 主要是看 Ruby Metaprogramming 这本书的时候做的笔记，以及自己的一些理解，记录下来希望对大家有所帮助.
tags: ruby
---

Ruby 是一门纯粹的面向对象语言，它魔幻而有趣的。而元编程（Metaprogramming）在 Ruby/Rails 中的应用也让我大开眼界，借着重新阅读这本书的机会，再次感受一次 Ruby 元编程的世界。

### 实例变量、方法、类
	
#### 对象的实例变量及方法

实例变量（Instance Variables）是当你使用它们时，才会被建立的对象。因此，即使是同一个类的实例，也可以有不同的实例变量。
从技术层面上来看，一个对象只存储了它的实例变量和其所属类的引用。因此，一个对象的实例变量仅存在于对象中，实例方法（Instance Methods）则存在于对象所属的类中。这也就是为什么同一个类的实例都共享类中的方法，却不能共享实例变量的原因了。

#### 重新认识类

- 类也是对象，所以能应用于对象的都可以运用于类。
- 和对象一样，类也有方法，对象的方法即是其所属类的实例方法。
- 所有的类有共同的祖先 Object 类（都是从 Object 类直接或间接继承而来），而 Object 类又继承自 BasicObject 类。
- 类名是常量（Constant）。

下面的代码有助于你理解这些信息：

```
# 对象的方法即为其所属类的实例方法
str = 'abc'
str.methods == str.class.instance_methods
#=> true

# 类的 "溯源"
klass = Class.new
klass.ancestors
#=> [#<Class:0x00007f88831a57d0>, Object, Kernel, BasicObject]

klass.class
#=> Class

klass.superclass
#=> Object

klass.superclass.superclass
#=> BasicObject

klass.superclass.superclass.superclass
#=> nil
```
#### 类是开放的

#### 多重initialize方法

#### 匿名类