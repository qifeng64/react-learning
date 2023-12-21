# 性能优化

**父组件重渲染，子组件一定会重渲染**

-   即使子组件不接受 _props_
-   官方提供 _memo_ api 帮助组件在接受的 _props_ 不改变的情况下跳过渲染

**上下文提供者（context）值改变，所有消费组件都将重渲染**

-   消费组件指真正用 _useContext_ 获取上下文的组件
-   _useMemo_ 生成提供值
    -   微小优化，确保提供者组件重渲染不会生成不同 _value_ 导致消费组件重渲染
-   单独的提供者组件
    -   确保 _setState_ 改变的是提供者组件中的 _state_
    -   防止顶级父组件重渲染导致的所有子组件重渲染
-   _React-Redux_ 是 _cotext_ 的上层实现

**custom hooks**

-   _hooks_ 中定义的 _state_，在消费组件中 _setState_ 会导致消费组件重渲染
-   记忆 _hooks_ 返回值，不会阻止消费组件的重渲染
-   无法避免消费组件的重渲染，只能尽量在更小的组件中进行 _steState hooks_
-   更小组件需遵循子组件使用推荐方案，防止因父组件重渲染导致的不必要渲染

## 一.子组件使用

### 不推荐

-   _props_ 中对象用 _useMemo_ 包裹返回
-   _props_ 中函数用 _useCallback_ 包裹返回
-   子组件定义时使用 _memo_ api

### 推荐

-   若子组件接受 props
    -   在父组件中使用 _useMemo_ 包裹需要使用的子组件返回一个变量，在 return jsx 中使用
-   若子组件不接受 props
    -   子组件定义时使用 _memo_ api

## 二.组件 props

### as Element

-   用于当不需要在接受组件中修改自身 _props_

### as Component

-   用于需要在接受组件中修改或自定义自身 _props_

### as Function

-   用于需要在接受组件 _props_ 和自身 _props_ 之间选择的情况（相当于默认值和自定义传参）

# 高阶组件

## 使用场景

1. 回调；日志事件
2. 监听 DOM 事件
3. 上下文选择器
