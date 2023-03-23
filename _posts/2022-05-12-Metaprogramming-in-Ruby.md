---
layout: post
title: "Metaprogramming in Ruby"
category: Ruby
excerpt: 主要是看 Ruby Metaprogramming 这本书的时候做的笔记，以及自己的一些理解，记录下来帮助自己温故知新.
tags: ruby
---

Ruby 是一门纯粹的面向对象语言，它魔幻而有趣的。而元编程（Metaprogramming）在 Ruby/Rails 中的应用也让我大开眼界，借着重新阅读这本书的机会，再次感受一次 Ruby 元编程的世界。
在Ruby中，Metaprogramming是一种常见的技术，它可以使开发者在运行时动态地创建、修改、扩展和重定义类、方法和变量等程序元素。

Ruby中有许多内置的Metaprogramming工具和技术，例如动态定义方法、使用反射API、元编程和元对象等。这些工具和技术使得Ruby成为一种非常灵活和强大的编程语言，同时也使得Ruby的代码更加简洁、易读和易维护。

Metaprogramming在Ruby中的应用非常广泛，例如Rails框架中的Active Record模块就使用了Metaprogramming来自动生成数据库表和对应的数据模型。另外，Ruby中的DSL（领域特定语言）也是一种常见的Metaprogramming技术，它可以让开发者用更加自然和直观的方式来描述特定领域的问题和解决方案。
### 实例变量、方法、类
	
#### 对象的实例变量及方法
在Ruby中，Metaprogramming可以用来动态地创建、修改和访问对象的实例变量和方法。
实例变量
可以使用Ruby的元编程技术来动态地为一个对象添加实例变量。例如，可以使用instance_variable_set方法来设置一个对象的实例变量：

class Person
end

p = Person.new
p.instance_variable_set("@name", "John")
puts p.instance_variable_get("@name")  # 输出 "John"
这里使用了instance_variable_set方法来设置一个名为“@name”的实例变量，并使用instance_variable_get方法来获取该实例变量的值。

方法
可以使用Ruby的元编程技术来动态地为一个对象添加方法。例如，可以使用define_method方法来定义一个新的方法：

class Person
end

p = Person.new
Person.define_method("say_hello") do
  puts "Hello, I'm a person."
end

p.say_hello  # 输出 "Hello, I'm a person."
这里使用了define_method方法来定义一个名为“say_hello”的方法，并将其绑定到Person类上。在创建一个Person对象后，就可以调用该对象的say_hello方法了。

#### 重新认识类

在Ruby中，Metaprogramming可以让开发者重新定义和扩展类，从而实现更加灵活和强大的编程。

打开类
比如可以随时打开一个类并添加新的方法或修改现有方法。例如，可以使用以下代码来打开String类并添加一个新的方法：
class String
  def reverse_and_upcase
    self.reverse.upcase
  end
end

puts "hello world".reverse_and_upcase  # 输出 "DLROW OLLEH"
这里使用了class关键字来打开String类，并在其中定义了一个名为“reverse_and_upcase”的新方法。在调用字符串对象的reverse_and_upcase方法时，就会返回反转并大写后的字符串。

继承
可以使用继承来扩展类的功能。例如，可以创建一个新的类并继承自现有的类，然后添加新的方法或重写现有方法：

class Person
  def say_hello
    puts "Hello, I'm a person."
  end
end

class Student < Person
  def say_hello
    puts "Hello, I'm a student."
  end
end

p = Person.new
s = Student.new

p.say_hello  # 输出 "Hello, I'm a person."
s.say_hello  # 输出 "Hello, I'm a student."
这里创建了一个Person类，并定义了一个名为“say_hello”的方法。然后创建了一个Student类并继承自Person类，并重写了“say_hello”方法。在创建Person和Student对象后，可以调用它们的say_hello方法来查看不同的输出。


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
这意味着可以随时打开一个类并添加新的方法或修改现有方法，而不需要继承或使用其他技术。

例如，可以使用以下代码来打开String类并添加一个新的方法：

class String
  def reverse_and_upcase
    self.reverse.upcase
  end
end

puts "hello world".reverse_and_upcase  # 输出 "DLROW OLLEH"
这里使用了class关键字来打开String类，并在其中定义了一个名为“reverse_and_upcase”的新方法。在调用字符串对象的reverse_and_upcase方法时，就会返回反转并大写后的字符串。

类是开放的这一特性使得Ruby的Metaprogramming非常强大和灵活。开发者可以使用Metaprogramming来动态地扩展和修改类的行为，从而实现更加灵活和强大的编程。
#### 多重initialize方法
在Ruby中，可以使用Metaprogramming来为一个类定义多个initialize方法，从而实现更加灵活和强大的对象初始化。

例如，可以使用以下代码来为一个类定义两个initialize方法：

class Person
  def initialize(name)
    @name = name
  end

  def initialize(name, age)
    @name = name
    @age = age
  end
end

p1 = Person.new("John")
p2 = Person.new("Mary", 25)
这里为Person类定义了两个initialize方法，一个接收一个参数（name），另一个接收两个参数（name和age）。在创建Person对象时，可以根据需要选择使用不同的initialize方法。

需要注意的是，Ruby中只允许一个类定义一个initialize方法，因为initialize方法是一个特殊的方法，用于初始化对象的状态。如果一个类定义了多个initialize方法，只会执行最后一个被定义的方法。因此，在使用Metaprogramming定义多个initialize方法时，应该使用其他方法名来避免冲突。

例如，可以使用以下代码来为一个类定义多个初始化方法：

class Person
  def initialize_name(name)
    @name = name
  end

  def initialize_name_and_age(name, age)
    @name = name
    @age = age
  end
end

p1 = Person.new_name("John")
p2 = Person.new_name_and_age("Mary", 25)
这里为Person类定义了两个初始化方法，分别命名为“initialize_name”和“initialize_name_and_age”。在创建Person对象时，可以根据需要选择使用不同的方法来初始化对象的状态。
#### 匿名类

可以使用Metaprogramming创建匿名类（Anonymous Class），这是一种没有名字的类，可以用于临时存储数据或实现特定功能。

例如，可以使用以下代码创建一个匿名类，并为该类动态地定义一个方法：

person_class = Class.new do
  def say_hello
    puts "Hello, I'm a person."
  end
end

p = person_class.new
p.say_hello  # 输出 "Hello, I'm a person."
这里使用了Class.new方法来创建一个匿名类，并在其中动态地定义了一个名为“say_hello”的方法。然后创建了一个该类的对象，并调用了其say_hello方法。

匿名类的创建在Ruby中非常常见，它可以用于实现一些简单的功能或存储一些临时数据。同时，匿名类也可以被用于实现一些高级的设计模式，例如装饰器模式和代理模式等。

需要注意的是，由于匿名类没有名字，因此在使用Metaprogramming创建匿名类时，应该为其定义一个变量或常量来引用该类，以便后续使用。