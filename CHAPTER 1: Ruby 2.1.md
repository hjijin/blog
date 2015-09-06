# Ruby2.1
Ruby Cookbook 的第一版出版于2006年，当时 ruby 的稳定版是1.8.4， 同时Rails 的版本刚刚达到1.0。八年和100多个稳定版本后，最新的版本是现在的 Ruby2.1.1 和 Rails 刚刚达到4.1.0。在过去的八年里，发生了很多变化：

> 字节码解释器取代了旧的 Ruby MRI。
> RubyGems 和 Rake 成为标准库的一部分。
> SOAP 和 Curses 已经从标准库移进了 RubyGems。
> 为 hashes， procs 等添加了新的语法元。
> 添加了如 Object#tap 和 String#prepend 的新方法。
> 添加了如 BasicObject， Fiber， 和 TracePoint 等新类。
> MD5 的标准库名更改为 Digest::MD5。
> 还有很多变化... ...

最终的结果是 ruby 语言更加简洁，运行速度比以往更快而且更高效。比如，一个简单的 Rails 应用程序用 Ruby 2.1 运行的速度比 Ruby 1.8 快 167-200％。

令人欣喜的是：一切的改变大部分都是向后兼容的，大多数用 Ruby1.8 编写的代码无需做任何修改就可以在 Ruby 2.1 上跑。但是用 Ruby 2.1 编写的代码很可能因为语法的变化而在 Ruby 1.8 中运行不起来。

在 Ruby 1.8 和 Ruby 2.1 之间的有两个主要版本：Ruby 1.9 和 Ruby 2.0。在这一章，我们将列举从 Ruby 1.9 到 Ruby 2.1 所有变化，而不是单单列出某一个版本中添加或修改了什么功能。例如，YARV 字节码解释器只添加到 Ruby 1.9.4，但我们会把它当做 Ruby 1.8 和 Ruby 2.1 之间的许多不同之处之一来讨论。