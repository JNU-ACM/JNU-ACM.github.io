---
title: STL 基础
icon: toolbox
order: 2
---

掌握 C++ 基本语法之后，就可以学习 STL 了。它提供了许多常用的数据结构和算法，能够帮助我们把精力集中在解题思路上。

本文参考《算竞常用 C++ STL 用法》整理，示例使用 **C++17**。建议边看边运行代码，理解每种工具的用途、时间复杂度和使用限制。

## STL 是什么？

STL（Standard Template Library，标准模板库）的核心包括容器、算法、迭代器和函数对象。算法竞赛中，我们也经常把 `string`、`pair` 以及标准库中的数学工具放在一起学习。

| 组成 | 作用 | 示例 |
| --- | --- | --- |
| 容器 | 保存和组织数据 | `vector<int>`、`set<int>` |
| 算法 | 对一段数据进行处理 | `sort`、`reverse` |
| 迭代器 | 表示位置，连接容器与算法 | `a.begin()`、`a.end()` |
| 函数对象 | 定义比较等操作 | `greater<int>()` |

使用时包含相应头文件，并写上 `std::` 前缀。为便于入门，下面的示例统一采用 `using namespace std;`。竞赛中常见的 `#include <bits/stdc++.h>` 是 GNU 扩展，不属于标准 C++，是否可用取决于评测环境。

## 常用容器与工具

### 如何选择容器？

| 需求 | 推荐工具 | 常用操作的时间复杂度 |
| --- | --- | --- |
| 可变长数组，按下标访问 | `vector` | 下标访问 O(1)，尾部插入均摊 O(1) |
| 后进先出 | `stack` | 默认底层容器下，入栈、出栈、取栈顶 O(1) |
| 先进先出 | `queue` | 默认底层容器下，入队、出队、取队首 O(1) |
| 两端都要插入、删除 | `deque` | 两端插入、删除和下标访问 O(1) |
| 反复取出最大值或最小值 | `priority_queue` | 入队、出队 O(log n)，取堆顶 O(1) |
| 去重，同时保持有序 | `set` | 插入、按值删除、查找 O(log n) |
| 按键保存数据，同时保持键有序 | `map` | 插入、按键删除、查找 O(log n) |
| 只关心是否存在或键值映射，不要求顺序 | `unordered_set`、`unordered_map` | 插入、查找、按键删除平均 O(1)，最坏 O(n) |
| 字符串处理 | `string` | 下标访问 O(1)，其他操作依具体函数而定 |
| 把两个值放在一起 | `pair` | 保存两个成员，比较成本取决于成员类型 |

这里的 n 表示容器中的元素个数。复杂度是选择工具的依据之一，还要注意内存消耗和题目中的具体操作。

### 动态数组 vector

头文件：`<vector>`。`vector` 的元素连续存储，长度可以改变，下标从 `0` 开始。

```cpp
vector<int> a;                         // 空数组
vector<int> b(5, 1);                   // 5 个 1
vector<vector<int>> grid(3, vector<int>(4, -1)); // 3 行 4 列

a.push_back(10);
a.push_back(20);
cout << a[0] << '\n';                 // 10
cout << a.back() << '\n';             // 20
a.pop_back();                         // 删除最后一个元素，不返回它
a.resize(4, 0);                       // {10, 0, 0, 0}

for (int x : a) cout << x << ' ';
a.clear();
cout << a.empty() << '\n';            // 1，表示为空
```

常用方法：`size()` 返回长度，`empty()` 判断是否为空，`front()` / `back()` 访问首尾元素，`clear()` 清空元素。

注意以下几点：

- `a[i]` 不检查边界，只能访问 `0 <= i < a.size()` 的位置。
- `reserve(n)` 预留容量，不增加元素；`resize(n)` 才会改变长度。调用 `reserve(n)` 后不能直接访问原本不存在的 `a[i]`。
- 中间插入、删除需要移动后续元素，时间复杂度为 O(n)。
- 扩容可能使原有迭代器、指针和引用失效；删除元素也会影响被删除位置及其后的迭代器。
- `size()` 返回无符号整数。计算 `size() - 1` 前先判空，乘法要在运算前转为足够大的类型，例如 `1LL * a.size() * a.size()`。

### 栈 stack

头文件：`<stack>`。栈遵循**后进先出**，适合括号匹配、撤销操作等场景。

```cpp
stack<int> st;
st.push(1);
st.push(2);
while (!st.empty()) {
    cout << st.top() << ' ';           // 2 1
    st.pop();
}
```

`top()` 取栈顶，`pop()` 删除栈顶但不返回值。`stack` 不支持下标访问和范围遍历，也没有 `clear()`；需要清空时可以不断 `pop()`，或赋值为空栈。

### 队列 queue 与双端队列 deque

头文件：`<queue>`。队列遵循**先进先出**，常用于广度优先搜索（BFS）。

```cpp
queue<int> q;
q.push(1);
q.push(2);
cout << q.front() << '\n';            // 1，队首
cout << q.back() << '\n';             // 2，队尾
q.pop();                              // 删除队首，不返回值
```

`queue` 同样不支持下标访问和范围遍历，也没有 `clear()`。

如果需要在两端操作，可以使用头文件 `<deque>` 中的双端队列：

```cpp
deque<int> dq;
dq.push_back(2);
dq.push_front(1);                      // {1, 2}
cout << dq[0] << '\n';                // 支持下标访问
dq.pop_front();
dq.pop_back();
```

### 优先队列 priority_queue

头文件：`<queue>`。优先队列通常用堆实现，每次可以快速取到当前最大或最小的元素。

```cpp
priority_queue<int> max_heap;          // 默认大顶堆
priority_queue<int, vector<int>, greater<int>> min_heap; // 小顶堆

max_heap.push(3);
max_heap.push(8);
max_heap.push(5);
cout << max_heap.top() << '\n';       // 8
max_heap.pop();
cout << max_heap.top() << '\n';       // 5
```

小顶堆的 `greater<int>` 需要头文件 `<functional>`。优先队列只提供堆顶访问，不能用下标或迭代器遍历，也不能直接修改堆顶。需要修改时，应先取出、删除，再插入新值。

::: warning 先判空，再访问
对空容器调用 `top()`、`front()`、`back()`、`pop()` 或 `pop_back()` 等操作可能产生未定义行为。访问或删除前，先确认容器非空。
:::

### 集合 set 与 multiset

头文件：`<set>`。`set` 保存不重复的元素，默认按从小到大的顺序排列。

```cpp
set<int> s;
s.insert(3);
s.insert(1);
s.insert(3);                           // 重复元素不会插入

cout << s.count(3) << '\n';           // 1
if (s.find(2) == s.end()) cout << "不存在\n";
for (int x : s) cout << x << ' ';      // 1 3
s.erase(1);                           // 按值删除，不存在时不做任何事

auto it = s.lower_bound(2);            // 第一个 >= 2 的元素
if (it != s.end()) cout << *it << '\n';
```

`set` 没有下标，迭代器不能相减，也不能直接修改元素。需要变更值时，先删除旧值，再插入新值。`set<int, greater<int>>` 可以按从大到小的顺序保存元素。

`multiset` 允许重复元素。特别注意：`ms.erase(x)` 删除所有等于 x 的元素；只删除一个时，应先查找，再按迭代器删除：

```cpp
multiset<int> ms{1, 1, 2};
auto it = ms.find(1);
if (it != ms.end()) ms.erase(it);      // 剩下 {1, 2}
```

### 映射 map 与无序容器

头文件：`<map>`。`map` 保存键值对，每个键唯一，默认按键从小到大排列。统计字符串出现次数是一个常见用途：

```cpp
map<string, int> cnt;
vector<string> words{"apple", "pear", "apple"};
for (const string& word : words) ++cnt[word];

for (const auto& [word, times] : cnt) { // 结构化绑定，C++17
    cout << word << ' ' << times << '\n';
}
auto it = cnt.find("banana");
if (it == cnt.end()) cout << "不存在\n";
cnt.erase("pear");
```

`cnt[key]` 在键不存在时，会插入该键并对值进行值初始化，例如 `int` 值为 `0`。如果只是判断是否存在，应使用 `find()` 或 `count()`，避免无意中插入数据。遍历时可以修改值，不能修改键。

`unordered_map` 和 `unordered_set` 分别位于 `<unordered_map>`、`<unordered_set>` 中，使用哈希表，遍历顺序没有保证。它们不支持有序容器的 `lower_bound()` / `upper_bound()`。竞赛中可能遇到哈希冲突导致性能下降的情况，不能把平均 O(1) 当成任何输入下的保证。

### 字符串 string

头文件：`<string>`。`string` 可以动态保存字符串，支持比较、拼接和子串等操作。

```cpp
string s = "hello";
s += " world";                        // 尾接，适合循环中逐步构造字符串
cout << s[0] << '\n';                 // h
cout << s.substr(6, 5) << '\n';        // world：起点为 6，长度为 5

auto pos = s.find("world");
if (pos != string::npos) cout << pos << '\n'; // 6

int x = stoi("123");
long long y = stoll("12345678900");
string t = to_string(x);
```

- `cin >> s` 遇到空白字符停止；读取整行用 `getline(cin, s)`。
- 在 `cin >> ...` 之后紧接着 `getline`，要处理残留换行。若允许忽略行首空白，可用 `getline(cin >> ws, s)`；若要保留行首空白，可先 `cin.ignore(numeric_limits<streamsize>::max(), '\n')`，再 `getline`，并包含 `<limits>`。
- `substr(pos, len)` 的第二个参数是**长度**，不是结束下标；起点超过字符串长度会抛出异常。
- 查找失败返回 `string::npos`，建议用 `auto` 保存结果并与它比较。
- `find()` 不能视为线性字符串匹配算法的替代品；大规模匹配题需要根据要求选择 KMP 等算法。
- `stoi()` / `stoll()` 在无法转换或超出范围时会抛出异常，使用前应确认输入符合要求。

### 二元组 pair

头文件：`<utility>`。`pair` 可以把两个相关的值放在一起，例如坐标、数值与编号。

```cpp
pair<int, string> p = {1, "Alice"};
cout << p.first << ' ' << p.second << '\n';
auto [id, name] = p;                  // C++17，复制两个成员

vector<pair<int, int>> a{{2, 1}, {1, 3}, {1, 2}};
sort(a.begin(), a.end());             // 需要 <algorithm>
// 结果为 {(1, 2), (1, 3), (2, 1)}
```

`pair` 默认按字典序比较：先比较 `first`，相同再比较 `second`。`auto& [id, name] = p` 则绑定到原成员，修改变量会影响 p。

## 迭代器与区间

### begin 与 end

迭代器表示容器中的位置，使用 `*it` 访问该位置的元素，使用 `++it` 移动到下一个位置。

```cpp
vector<int> a{10, 20, 30};
for (auto it = a.begin(); it != a.end(); ++it) {
    cout << *it << ' ';
}
```

`begin()` 指向第一个元素，`end()` 指向最后一个元素的后一个位置。大多数 STL 算法使用**左闭右开区间 `[first, last)`**：包含起点，不包含终点。

- 整个容器：`[a.begin(), a.end())`。
- 数组 a 的前 n 个元素：`[a, a + n)`。
- 对于 `vector`，下标 `[l, r)`：`[a.begin() + l, a.begin() + r)`。
- 空容器的 `begin() == end()`，不能解引用 `end()`。

### 不同迭代器的能力

`vector`、`deque` 和 `string` 的迭代器支持 `it + k`、`it - k` 以及两个迭代器相减；`set` 和 `map` 的迭代器只能逐步前后移动，不支持这些随机访问操作。

头文件 `<iterator>` 中的 `next(it)`、`prev(it)` 可以获得相邻位置，前提是目标位置有效。`distance(first, last)` 可以计算距离，但对于 `set`、`map` 通常需要线性时间。

### 删除时的迭代器失效

删除之后不要继续使用失效的迭代器。下面是删除 `vector` 中所有偶数的一种正确写法：

```cpp
vector<int> a{1, 2, 4, 5};
for (auto it = a.begin(); it != a.end(); ) {
    if (*it % 2 == 0) it = a.erase(it); // 返回删除位置之后的有效迭代器
    else ++it;
}
// a = {1, 5}
```

这种写法反复移动元素，最坏可能达到 O(n²)。需要批量删除时，可以使用下面算法部分介绍的“算法 + erase”思路。

## 常用算法

除特别说明外，本节函数位于头文件 `<algorithm>`。

### 排序 sort 与比较器

`sort(first, last)` 默认从小到大排序，比较次数为 O(n log n)，要求随机访问迭代器。

```cpp
vector<int> a{3, 1, 2};
sort(a.begin(), a.end());              // {1, 2, 3}
sort(a.begin(), a.end(), greater<int>()); // {3, 2, 1}

vector<pair<int, int>> p{{1, 2}, {3, 2}, {2, 1}};
sort(p.begin(), p.end(), [](const auto& x, const auto& y) {
    if (x.second != y.second) return x.second < y.second;
    return x.first > y.first;
});
// 按 second 升序，相同时按 first 降序：{(2, 1), (3, 2), (1, 2)}
```

比较器返回 `true` 表示第一个元素应排在第二个之前，必须满足**严格弱序**。不能用 `<=` 或 `>=` 代替 `<` 或 `>`；尤其是 `cmp(x, x)` 必须为 `false`。`sort` 不保证相等元素的相对顺序，需要保留时可使用 `stable_sort`。

### 二分查找 lower_bound 与 upper_bound

对于**升序排列**的序列：

- `lower_bound(first, last, x)`：第一个大于等于 x 的位置。
- `upper_bound(first, last, x)`：第一个大于 x 的位置。
- 如果没有符合条件的位置，返回 `last`。

```cpp
vector<int> a{1, 2, 2, 2, 5};
auto l = lower_bound(a.begin(), a.end(), 2);
auto r = upper_bound(a.begin(), a.end(), 2);
cout << l - a.begin() << '\n';        // 1
cout << r - a.begin() << '\n';        // 4
cout << r - l << '\n';                // 3，即 2 的出现次数

auto it = upper_bound(a.begin(), a.end(), 4);
if (it != a.begin()) cout << *prev(it) << '\n'; // 最后一个 <= 4 的元素：2
```

对 `vector` 进行二分查找是 O(log n)。对于 `set` / `map`，应使用容器自身的 `s.lower_bound(x)` 等成员函数；通用算法虽然比较次数是对数级，但在这些容器上移动迭代器可能需要 O(n) 时间。

如果使用自定义排序规则，查找时也必须满足相应的区间划分要求；初学时建议先掌握默认升序情形。

### 去重 unique 与批量删除

`unique` 只消除**相邻**的重复元素，把有效元素移到前面，返回有效区间的尾迭代器，**不会缩短容器**。要对整个数组去重，通常先排序，再配合 `erase`：

```cpp
vector<int> a{3, 1, 3, 2, 2};
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end()), a.end());
// a = {1, 2, 3}
```

这种方法会改变原来的顺序。类似地，删除满足条件的元素可以使用 `remove_if` 配合 `erase`，避免反复移动整个后缀：

```cpp
vector<int> a{1, 2, 4, 5};
a.erase(remove_if(a.begin(), a.end(), [](int x) {
    return x % 2 == 0;
}), a.end());                         // {1, 5}，线性时间
```

### 交换、反转、最值与排列

```cpp
int x = 1, y = 2;
swap(x, y);                           // 交换两个值，定义于 <utility>

vector<int> a{1, 3, 2};
reverse(a.begin(), a.end());           // {2, 3, 1}，O(n)
cout << max({1, 5, 3}) << '\n';       // 5
cout << min(x, y) << '\n';            // 1
if (!a.empty()) {
    cout << *max_element(a.begin(), a.end()) << '\n'; // 3
}
```

`max_element` / `min_element` 返回迭代器，对空区间返回尾迭代器，不能直接解引用。`max` / `min` 的普通双参数形式要求两个参数推导出相同的类型，例如可写 `max(1LL, 2LL)`。

`next_permutation` 将序列改为字典序的下一个排列。枚举全部不同排列时，先从升序开始：

```cpp
vector<int> a{1, 2, 3};
sort(a.begin(), a.end());
do {
    for (int x : a) cout << x << ' ';
    cout << '\n';
} while (next_permutation(a.begin(), a.end()));
```

`prev_permutation` 则获得上一个排列。排列数量增长很快，只适合规模较小的枚举问题。

### 数值算法 numeric

头文件：`<numeric>`。

```cpp
vector<int> a(5);
iota(a.begin(), a.end(), 1);           // {1, 2, 3, 4, 5}
long long sum = accumulate(a.begin(), a.end(), 0LL); // 15
cout << gcd(8, 12) << '\n';           // 4，C++17
cout << lcm(8LL, 12LL) << '\n';       // 24，C++17
```

`accumulate` 的累加类型由初值决定。使用 `0LL` 才会以 `long long` 累加；仅把最终结果赋给 `long long` 无法补救中途的 `int` 溢出。`lcm` 的结果及 `gcd` 所需的绝对值必须能被相应类型表示，不能忽略整数范围。

### 数学函数 cmath

头文件：`<cmath>`。常用函数包括 `abs`（绝对值）、`sqrt`（平方根）、`pow`（幂）、`log`（自然对数）、`log2`、`ceil`（向上取整）、`floor`（向下取整）和 `round`（四舍五入，半整数远离零）。

浮点数存在精度误差。需要精确整数结果时，应优先考虑整数运算：

- 对非负整数 a、正整数 b，向下取整除法可用 `a / b`。
- 同样的前提下，向上取整可用 `a / b + (a % b != 0)`，避免 `a + b - 1` 的加法溢出。
- C++ 整数除法向零截断；有负数时，不能直接套用上述向下、向上取整结论。
- 精确整数幂或模意义下的幂应使用快速幂，不能依赖 `pow` 后强制转换。
- 精确整数平方根需要校验边界，或使用避免乘法溢出的整数二分。

## 综合示例：排序、去重与统计

下面是一个可以直接运行的 C++17 程序，结合了 `vector`、`map`、排序、去重和二分查找。

```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <vector>
using namespace std;

int main() {
    vector<int> a{3, 1, 3, 2, 1};
    map<int, int> cnt;
    for (int x : a) ++cnt[x];

    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());

    for (int x : a) {
        cout << x << " 出现 " << cnt[x] << " 次\n";
    }

    int target = 2;
    auto it = lower_bound(a.begin(), a.end(), target);
    if (it != a.end() && *it == target) {
        cout << "去重后，2 的下标为 " << it - a.begin() << '\n';
    }
}
```

输出：

```text
1 出现 2 次
2 出现 1 次
3 出现 2 次
去重后，2 的下标为 1
```

## 学完后练什么？

1. 输入若干整数，输出排序、去重后的结果，并用二分查找回答查询。
2. 使用 `stack` 判断仅包含圆括号的字符串是否匹配。
3. 使用 `map<string, int>` 统计单词次数，按单词字典序输出。
4. 使用小顶堆依次输出所有数，观察它与一次性排序的区别。
5. 练习在遍历时删除元素，确认没有跳过元素或访问失效迭代器。

遇到新问题时，先想清楚需要哪些操作，再选择容器。熟悉常用接口之后，还要逐步理解时间复杂度、迭代器失效和数值范围，才能在比赛中稳定地使用 STL。
