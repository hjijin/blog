# Ruby 2.1
Ruby Cookbook 的第一版出版于2006年，当时 ruby 的稳定版是1.8.4， 同时Rails 的版本刚刚达到1.0。八年和100多个稳定版本后，最新的版本是现在的 Ruby2.1.1 和 Rails 刚刚达到4.1.0。在过去的八年里，发生了很多变化：

* 字节码解释器取代了旧的 Ruby MRI。
* RubyGems 和 Rake 成为标准库的一部分。
* SOAP 和 Curses 已经从标准库移进了 RubyGems。
* 为 hashes， procs 等添加了新的语法元。
* 添加了如 Object#tap 和 String#prepend 的新方法。
* 添加了如 BasicObject， Fiber， 和 TracePoint 等新类。
* MD5 的标准库名更改为 Digest::MD5。
* 还有很多变化... ...

最终的结果是 ruby 语言更加简洁，运行速度比以往更快而且更高效。比如，一个简单的 Rails 应用程序用 Ruby 2.1 运行的速度比 Ruby 1.8 快 167-200％。

令人欣喜的是：一切的改变大部分都是向后兼容的，大多数用 Ruby1.8 编写的代码无需做任何修改就可以在 Ruby 2.1 上跑。但是用 Ruby 2.1 编写的代码很可能因为语法的变化而在 Ruby 1.8 中运行不起来。

在 Ruby 1.8 和 Ruby 2.1 之间的有两个主要版本：Ruby 1.9 和 Ruby 2.0。在这一章，我们将列举从 Ruby 1.9 到 Ruby 2.1 所有变化，而不是单单列出某一个版本中添加或修改了什么功能。例如，YARV 字节码解释器只添加到 Ruby 1.9.4，但我们会把它当做 Ruby 1.8 和 Ruby 2.1 之间的许多不同之处之一来讨论。

## 1.1 Ruby 1.8 和 Ruby 2.1 之间有什么不同？
### 问题：
你需要知道 Ruby 1.8 和 Ruby 2.1 之间的主要区别。
### 解决办法：
下图将列出Ruby 1.8 和 Ruby 2.1 之间的主要区别：

| Type      | About            | Note  |
| -------- | ---------------- | ----- |
| 新语法    | →                | → 操作符可以简洁替代lambda |
| 新语法    | Array            | You can use %i(foo bar baz) to specify [:foo, :bar, :baz] for brevity. |
| 新语法    | def              | You can define methods like def foo(x: 1); puts x; end. |
| 新的类    | BasicObject      | New root in class  hierarchy. |
| 新语法    | Hash             | You can use {a: 1, b: 2}, which is like {:a =\> 1, :b =\> 2}, for brevity. |
| 新语法    | r                | You can apply the r suffix to numbers to specify rationals like 1.2r.  |
| 新的类    | GC::Profiler     | Profiles the garbage collector. |
| 新的类    | Encoding         | Represents a character  encoding. |
| 新的类    | Enumerator::Lazy | Delays running enumerations until absolutely necessary. |
| 新的类    | Fiber            | Lightweight processes. |
| 新的类    | Gem              | RubyGems. |
| 新的类    | Random           | Pseudorandom number generator. |
| 新的类    | RubyVM           | The Ruby interpreter.          |
| 新的类    | Socket::Ifaddr   | Interface address class.       |
| 新的类    | TracePoint       | DTrace-like inspection class.  |
| 新方法    | Array.try\_convert | Tries to convertobjinto an array. |
| 新方法    | Array#rotate | Creates a new array by rotating the existing array. |
| 新方法    | Array#keep\_if | Deletes every element where the block evaluates to false. |
| 新方法    | Array#sample | Chooses a random element. |
| 新方法    | Array#repeated\_permutation | All repeated permutations. |
| 新方法    | Array#repeated\_combination | All repeated combinations. |
| 新方法    | Hash#to\_h | Ubiquitous hash conversion. |
| 新方法    | Hash#default\_proc= | You can now set the default proc after initialization. |
| 新方法    | Hash#key | An inverted hash lookup. |
| 新方法    | Hash#keep\_if | Deletes every key-value pair where the block evaluates to false. |
| 新方法    | Hash#assoc | Searches through the hash comparing obj with the value using ==. |
| 新方法    | Hash#rassoc | Searches through the hash comparing obj with the key using ==. |
| 新方法    | Hash#flatten | A one-dimensional flattening of this hash. |
| 新方法    | Hash#compare\_by\_identity | Compares hashes by their identity. |
| 新方法    | Enumerable#to\_h | Ubiquitous hash conversion. |
| 新方法    | Enumerable#flat\_map | Creates array with the concatenated results of running block once for every element inenum. |
| 新方法    | Enumerable#each\_entry | Calls block once for each element in self, passing that element as a parameter, converting multiple values from yieldto an array. |




