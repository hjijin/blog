---
layout: post
title: "Object-Oriented as i understand"
category: Ruby
excerpt: Object-Oriented Ruby 语言描述.
tags: ruby
---

面向对象编程(Object-Oriented Programming)，简称OOP。
Ruby 是一门纯面向对象的编程语言，一切事物在 Ruby 中都是对象，Ruby 中的每个值都是一个对象。

### 基本特征

面向对象语言（Object-Oriented Language）是一类以对象作为基本程序结构单位的程序设计语言，指用于描述的设计是以对象为核心，而对象是程序运行时刻的基本成分。
是一种通过对象的方式，把现实世界映射到计算机模型的一种编程方法。

OOP 中的基本编程概念是：抽象化、多态性、封装形式、继承。
抽象通过建模适合该问题的类来简化复杂的现实；多态性是将运算符或函数以不同方式用于不同数据输入的过程；封装对其他对象隐藏了类的实现细节；继承是一种使用已经定义的类形成新类的方法。

#### Ruby 对象

对象是 Ruby OOP 程序的基本构建块，是数据和方法的组合。在 OOP 程序中，我们创建对象，这些对象通过方法进行通信，每个对象都可以接收消息，发送消息和处理数据。
创建对象有两个步骤， 首先，我们定义一个类：

```
#!/usr/bin/ruby

# 创建一个简单的对象，主体还是空的，没有任何数据或方法
class Student

end

# 创建 Student 类的新实例
s = Student.new
puts s
```

类是对象的模板，描述了类对象共享的状态和行为，一个类可以用来创建许多对象，在运行时从类创建的对象称为该特定类的实例。


#### Ruby 构造函数

构造函数是一种特殊的方法，创建对象时会自动调用它。构造函数不返回值，目的是初始化对象的状态。而Ruby 中的构造函数称为 initialize。

```
#!/usr/bin/ruby

class Student
  def initialize
    puts "auto called"
  end
end

Student.new
```

对象的属性是捆绑在该对象内部的数据项，也称为实例变量或成员字段。实例变量是在类中定义的变量，该类中的每个对象都有一个单独的副本。

```
#!/usr/bin/ruby

class Student

  # 构造函数是称为 initialize 的方法，该方法在创建实例对象时被调用
  def initialize name
    @name = name
  end

  # 定义方法返回成员字段
  def get_name
    @name # 是一个实例变量
  end
end

# 创建 Student 类的两个对象，字符串参数传递给每个对象构造函数，名称存储在每个对象唯一的实例变量中
s1 = Student.new "Jim"
s2 = Student.new "Lam"

# 通过在每个对象上调用 get_name 来打印成员字段
puts s1.get_name
puts s2.get_name
```

从下面的程序输出可以看到 Student 类的每个实例都有其自己的名称成员字段
```
❯ ruby student.rb
Jim
Lam
```

#### Ruby 构造函数重载

构造函数重载是在一个类中具有多种类型的构造函数的能力，这样可以创建具有不同数量或不同类型参数的对象。

```
#!/usr/bin/ruby

class Student

  def initialize name="unknown", age=0
    @name = name
    @age = age
  end

  def to_s
    "Student Name: #{@name}, Age: #{@age}."
  end
end

s1 = Student.new
s2 = Student.new "unknown", 17
s3 = Student.new "Jim", 22
s4 = Student.new "Lam", 18

p s1.to_s, s2.to_s, s3.to_s, s4.to_s
```

#### Ruby 方法

方法是在类主体内定义的函数，它们用于通过对象的属性执行操作。 在 OOP 范式的封装概念中，方法对于划分编程中的职责至关重要。 

```
#!/usr/bin/ruby

class Student

  def initialize name="unknown", age=0
    @name = name
    @age = age
  end

  def get_info
    "Student Name: #{@name}, Age: #{@age}."
  end
end

s = Student.new "Jim", 22

# 两种调用方法的方式
puts s.get_info
puts s.send :get_info
```


#### Ruby 继承

继承是一种使用已经定义的类形成新类的方法，新形成的类称为派生的类，我们派生的类称为基类，继承的重要好处是代码重用和降低程序的复杂性。派生类（后代）将覆盖或扩展基类（祖先）的功能。

```
#!/usr/bin/ruby

# 基类
class Person

  def initialize
    puts "this is base class"
  end
end

# 派生类，派生类继承自基类
class Student < Person

  def initialize
    super # super 方法调用父类的构造函数
    puts "Human class created"
  end
end

Person.new
Student.new
```

在实际的业务中，对象关系可能更复杂，一个对象可以有多个祖先。 但是 Ruby 有一个方法 ancestors，它提供了特定类的祖先列表，每个 Ruby 对象自动是 Object 和 BasicObject 类以及 Kernel 模块的后代。 它们内置在 Ruby 语言的核心中。

```
#!/usr/bin/ruby

class Person 
end

class HeadMaster < Person 
end

class Teacher < HeadMaster
end

class CNTeacher < Teacher 
end

p CNTeacher.ancestors # => [CNTeacher, Teacher, HeadMaster, Person, Object, PP::ObjectMixin, Kernel, BasicObject]

```

#### Ruby super 方法

super 方法在父类的类中调用相同名称的方法。如果该方法没有参数，它将自动传递其所有参数，如果我们写 super()，则不会将任何参数传递给父方法。

```
#!/usr/bin/ruby

class Base
  def show x=0, y=0
    p "Base class, x: #{x}, y: #{y}"
  end
end

class Derived < Base
  def show x, y
    super
    super x
    super x, y
    super()
  end
end

d = Derived.new
d.show 3, 3

# 输出结果
❯ ruby super.rb
"Base class, x: 3, y: 3"
"Base class, x: 3, y: 0"
"Base class, x: 3, y: 3"
"Base class, x: 0, y: 0"
```

从输出结果可以看到，不带任何参数的 super 方法使用传递给 Derived 类的 show 方法的参数调用父级的 show 方法：此处，x = 3 和 y = 3。 
super() 方法不将任何参数传递给父级的 show 方法。

#### 小结

面向对象的设计思想是从自然界中来的，因为在自然界中，类（Class）和实例（Instance）的概念是很自然的。Class 是一种抽象概念，比如我们定义的 Class—Student，是指学生这个概念，而实例（Instance）则是一个个具体的 Student，比如，Jim 和 Lam 是两个具体的 Student。所以，面向对象的设计思想是抽象出 Class，根据 Class 创建 Instance。面向对象的抽象程度又比函数要高，因为一个 Class 既包含数据，又包含操作数据的方法。
数据封装、继承和多态是面向对象的三大特点需要谨记。
