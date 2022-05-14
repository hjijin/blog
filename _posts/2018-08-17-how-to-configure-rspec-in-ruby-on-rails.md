---
layout: post
title: "如何在 Rails 项目中配置 RSpec"
category: ror
tags: rails
comments: true
---
初级开发人员如何在项目中设置 RSpec： Rails 5.2, RSpec 3.7, Factory Bot, Database Cleaner

文章写于 2018-08-09， 适用于当前版本 gem。

<!--more-->

### 在新项目中配置

假设读者已经阅读过 [Agile Web Development with Rails](https://pragprog.com/book/rails51/agile-web-development-with-rails-5-1)
 或者 [RailsGuides](https://guides.rubyonrails.org/getting_started.html) 并且在自己的计算机上安装好 Ruby 和 Ruby on Rails 环境。

我们将新建一个没有 Ruby on Rails 原生测试的项目，你可以执行以下命令查看新项目的所有选项：

```bash
rails new -h
```

创建不带测试的项目你可以执行：

```bash
rails new my_rspec_project_name --skip-test
```
接着用你熟悉的编辑器打开 `Gemfile` 找到这段 `group :development, :test` 往里面写入以下 gems:

```ruby
# Gemfile

# ...

group :development, :test do

  # ...

  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'faker'
end

# ...

```

> 上面这一步很重要，这些 gem 加入 `group :development, :test` 而不是  `group :test`。像 **rails generate ...** 在 `development`环境下运行默认命令，如果你不这样执行： **RAILS_ENV=test rails generate ...**它们不会选择在测试环境覆盖默认配置。

现在安装 gems：
```bash
bundle install
```

生成 RSpec 的配置文件
```bash
rails generate rspec:install
```

> 更多信息： [rspec-rails](https://github.com/rspec/rspec-rails)

这样你应该能够使用 RSpec 测试和 FactoryBot 工厂生成 Rails 模型
```bash
rails generate model worker name:string age:integer
```
...在你执行上面的命令后你应该可以看到以下输出：
```bash
invoke  active_record
create    db/migrate/20180809131148_create_workers.rb
create    app/models/worker.rb
invoke    rspec
create      spec/models/worker_spec.rb
invoke      factory_bot
create        spec/factories/workers.rb
```

如你所见，这个命令生成了带有内容的数据迁移文件文件 `db/migrate/20180809131148_create_workers.rb`：
```ruby
class CreateWorkers < ActiveRecord::Migration[5.2]
  def change
    create_table :workers do |t|
      t.string :name
      t.integer :age

      t.timestamps
    end
  end
end
```

所以运行数据迁移：
```bash
# migrations for develompent environment
rake db:migrate

# migrations for test environment
RAILS_ENV=test rake db:migrate
```

这将生成 `workers` 数据表。

### 开始写一些测试

打开 `spec/models/worker_spec.rb` 写你的第一个 “failing” 的测试:
```ruby
require 'rails_helper'

RSpec.describe Worker, type: :model do

  it do
    expect(1 + 200).to eq(0)
  end
end
```

在终端 `rspec spec.` 你应该看到这样的输出：
```bash
Failures:

  1) Worker should eq 0
     Failure/Error: expect(1 + 200).to eq(0)

       expected: 0
            got: 201

       (compared using ==)
     # ./spec/models/worker_spec.rb:6:in `block (2 levels) in <main>'

Finished in 0.00714 seconds (files took 0.59673 seconds to load)
3 examples, 1 failure, 1 pending

```

好极了！现在让我们做一写修改来通过这个测试：
```ruby
# ...
    expect(1 + 200).to eq(0)
# ...
```
改成：
```ruby
# ...
    expect(1 + 200).to eq(201)
# ...
```

现在你应该看到类似这样的输出：
```bash
Finished in 0.00328 seconds (files took 0.61603 seconds to load)
3 examples, 0 failures, 1 pending
```

不要担心 “pending” 测试，你可以稍后删除它们。重要的是你有 0 failures， 这意味着你通过了测试。

### 配合 Factories (FactoryBot) 使用

[GETTING_STARTED](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md)

图书 [Agile Web Development with Rails](https://pragprog.com/book/rails51/agile-web-development-with-rails-5-1) 结合 `Fixture` 来写有效的测试，但是我们的目的不是那样，我们用 `Factories`。

你可以在本文 [Why Factories?](https://robots.thoughtbot.com/why-factories) 中阅读更多有关 Factories 的信息

我们将使用 [FactoryBot](https://github.com/thoughtbot/factory_bot_rails) 这个库，

在开始之前，我们需要修改一下配置，打开 `spec/rails_helper.rb` 然后在 RSpec 配置块里添加这一行：
```ruby
# ...

RSpec.configure do |config|

  # ...

  config.include FactoryBot::Syntax::Methods
end

```

这将确保我们可以在本地 RSpec 测试中使用 Factory Bot 语法。

打开 `spec/factories/workers.rb` f文件并更改自动生成的内容：
```ruby
FactoryBot.define do
  factory :worker do
    name "MyString"
    age 1
  end
end
```

为：
```ruby
FactoryBot.define do
  factory :worker do
    name "Ezo"
    age 31
  end
end
```

现在打开 `spec/models/worker_spec.rb` 并添加一个测试：
```ruby
require 'rails_helper'

RSpec.describe Worker, type: :model do
  # ....

  describe 'default worker details' do
    let(:worker) { create :worker }

    it 'should initialize worker with name and age' do
      expect(worker.name).to eq("Ezo")
      expect(worker.age).to eq(31)
    end
  end

  describe 'default worker details' do
    before do
      create :worker
    end

    it 'should initialize worker with name and age' do
      expect(Worker.count).to eq 1

      w = Worker.last

      expect(w.name).to eq("Ezo")
      expect(w.age).to eq(31)
    end
  end
end
```

如果运行 `rspec spec` 所有测试都应该通过： **4 examples, 0 failures, 1 pending**
这些都是很简单的测试，前面我们在数据库中创建一些属性，现在测试是否具有这些属性值。

实际上，你将使用 RSpec 测试更复杂的逻辑，例如：
```ruby
def trigger_money_transfer(account)
  account.balance = account.balance + 800
end

# ...
let(:bank_account) { create :account }

it "should transfer buch of money to my Account" do
  expect(bank_account.balance).to eq 0
  trigger_money_transfer(bank_account)
  expect(bank_account.balance).to eq 800
end
# ...
```

> B.T.W. FactoryBot 是从旧版 [FactoryGirl](https://robots.thoughtbot.com/factory_bot) 的重写而来，如果你在互联网上发现关于 FactoryGirl 的特性，大多在 FactoryBot 上都适用。

### Database cleaner

[DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) 是一个可以帮助你在每次测试运行之前保持数据库没有记录的 gem。

你需要做的就是在 `spec/rails_helper.rb` RSpec 配置块中添加以下行：
```ruby
# ...
RSpec.configure do |config|
  # ...
  config.before(:suite) do
    DatabaseCleaner.strategy = :deletion
  end

  config.before(:each) do |example|
    DatabaseCleaner.clean
  end
end
```

> 在我们的 context里，它将在每次测试之前从测试数据库中删除记录。

这个 gem 有更多的用法，有不同的策略，以便整个测试套件更快。有关详细信息，请访问 [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner)

### Faker

[faker](https://github.com/stympy/faker)

有时你希望在测试中使用随机数据（例如随机电子邮件地址），因为这可以帮助你在测试环境中暴露那些通常只会在生产中有真实数据流入系统时才暴露的问题。

你可以使用 [FactoryBot sequence syntax](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md#sequences) 序列语法生成随机数据：
```ruby
FactoryBot.define do
  factory :worker do
    sequence :name do |n|
      "Ezo#{n}"
    end

    age 31
  end
end
```

这会产生：
```bash
Ezo1
Ezo2
Ezo3
# ...
```

但是这些数据看上去太简单了，有一种更好的方法使用 Faker gem 获得真正的随机数据：
```ruby
Faker::Name.first_name
# => "Jonathan"
Faker::Name.first_name
#=> "Luigi"
Faker::Name.first_name
#=> "Crissy"
Faker::Number.number(2)
#=> "75"
Faker::Number.number(2)
#=> "48"
```

Faker 提供了许多不同的 “fake data” 类型， 你可以[在这里](https://github.com/stympy/faker#contents)探索它们，尝试使用变体来看看哪些更适合。

在 Rails 世界中常见的是将 Faker 与 Factory bot 结合起来生成随机数据：

在 `spec/factories/workers.rb`
```ruby
FactoryBot.define do
  factory :worker do
    name { Faker::Name.first_name }
    age 31
  end
end
```

所以我们的测试看起来像 (`spec/models/worker_spec.rb`)
```ruby
require 'rails_helper'

RSpec.describe Worker, type: :model do
  # ....

  describe 'default worker details' do
    let(:worker) { create :worker }

    it 'should initialize worker with name and age' do
      expect(worker.name).to be_kind_of(String)
      expect(worker.name).to worker.name
    end
  end
end
```

最后再一次强调这是无用的测试，并没有给开发人员提供多大帮助，我只是想告诉你，当你处理随机数据时，你不能只比较结果是否等于一个字符串。你需要检查结果是否等于对象的状态和类型。

> 你不想一直有随机数据，我甚至认为大多数时候使用 dereministic 数据更健康，想知道为什么请阅读 [这篇文章](https://blog.eq8.eu/article/back-to-the-primitive-testing-with-simplicity.html)。

### 讨论
[https://blog.eq8.eu/article/junior-developer-set-up-rails-with-rspec-factorybot-database-cleaner.html](https://blog.eq8.eu/article/junior-developer-set-up-rails-with-rspec-factorybot-database-cleaner.html)

原文出自[EquiValent
](https://blog.eq8.eu/article/junior-developer-set-up-rails-with-rspec-factorybot-database-cleaner.html)。