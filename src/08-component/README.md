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
-   高阶组件
    -   接受想要渲染的组件 `props.children`
    -   在高阶组件中订阅 context
    -   将订阅的 context 值作为 props 传递给 `props.children`
    -   高阶组件在 context 改变时不重渲染
        -   是消费者组件，但没有渲染在 DOM 中
        -   context 改变时，return 语句会重新执行
    -   `props.children` 在 context 改变时不重渲染
        -   没有直接订阅 context
        -   只在接受的 props 值改变时，才会重渲染
    -   只能真正渲染到 DOM 中的函数组件，并在组件顶层或 return 语句中使用了 useState、useEffect、useContext 等 Hook 才是消费者组件
-   _React-Redux_ 是 _cotext_ 的上层实现

**custom hooks**

-   _hooks_ 中定义的 _state_，在消费组件中 _setState_ 会导致消费组件重渲染
-   记忆 _hooks_ 返回值，不会阻止消费组件的重渲染
-   无法避免消费组件的重渲染，只能尽量在更小的组件中进行 _steState hooks_
-   更小组件需遵循子组件使用推荐方案，防止因父组件重渲染导致的不必要渲染

**Ref**

-   组件重渲染不会重置 ref （useRef 只在组件挂载时初始 一次）
-   结合 _custom hooks_ 实现记录上一次 _state_
-   组件传递，
    -   作为 `props` 传递（`xxRef={xxRef}`）
    -   将 `ref` 关键字解读为普通字符，作为 `props` 传递，需使用 `forwardRef` 包裹子组件（`ref={xxRef}`）

**useEffect**

-   在组件渲染完成之后执行
-   若不设置依赖项，会在组件每次重渲染后执行
-   可设置清除函数，阻止 _竞态条件_
    -   设置更新标识
    -   使用 `AbortController` 类，在清除函数中调用 `abort` 方法终止前一次 web 请求

**列表渲染 key**

-   不使用随机值
-   动态列表，附加状态使用 _唯一 id_
    -   列表增删
        -   id: 只有增删的 item memocomponent 才挂载渲染
        -   index: 增删的 item memocomponent 挂载渲染 + 其余进行重渲染
    -   选中添加 className
    -   排序
-   分页，数据展示使用 _数组 index_
    -   _唯一 id_ 不匹配会导致组件的卸载和挂载（准确，资源消耗高）
    -   _数组 index_ 永远相同，组件不会重载，但会因为 _props_ 改变而重渲染（不准确，资源消耗低）

**useMemo 和 useCallback**

-   仅在 _re-render_ 时生效，对初始渲染有害（使用需要取舍）
-   好的架构 _re-render_ 应该只影响小部分组件
-   性能优化应在最后才考虑使用 _useMemo 和 useCallback_
-   `useCallback` 实践

    -   当其依赖一些 state 或 props 做条件判断，但不想每次都更新：将 function 单独定义
        ```javascript
        const onClick = () => {
            setCounter((c) => {
                if (c > 100) return c;
                return c + 1;
            });
        };
        const onClickMemo = useCallback(onClick, []);
        ```
    -   由于 `useCallback(onClick, [])` 只会在组件挂载后生效一次，导致在 `onClick` 函数中访问的 `state` 永远是初始值，需使用 `useEffect`

        ```javascript
        const [counter, setCounter] = useState(0);
        const ref = useRef(0);
        useEffect(() => {
            ref.current = counter;
        }, [counter]);
        const onClick = () => {
            console.log(ref.current);
        };
        ```

**useReducer**

-   父组件中定义的 `reducer` , 若 `dispatch` 不改变值，则子组件不重渲染

**memo**

-   接受两个参数：组件；自定义比较函数（可选）
    -   自定义比较函数：对于传递多个 `props`，且存在 _引用类型 props_ 的情况，可只对 简单类型 `props` 进行比较

**setSate**

-   当 _state_ 初始值和 _setState_ 值一直相同时，将永远不会触发重渲染
-   当 _state_ 初始值和 _setState_ 值不一定相同时，当初次相同时会再触发一次重渲染，若后续 _setState_ 值仍相同，则不再重渲染

**组合模式**

-   简单组件

    -   Simple components

-   容器组件

    -   Container components
    -   将子组件通过 _children props_ 传入并使用
    -   **相比直接使用子组件的优势**
    -   直接使用时，每一次父组件重新渲染都会重新创建子组件实例，从而导致子组件的重渲染（即使子组件的定义不改变）
    -   _children props_ ，相当于父组件的一个子元素，diff 算法比较，只有在子组件的定义发生改变时才会重新渲染

-   扩展

    -   在父组件 jsx 中使用多个子组件时可以用变量接受

    ```javascript
    // 爷组件 jsx
    <ParentComponent
        left={ <ChildrenComponent1 /> }
        right={ <ChildrenComponent2 /> }
    />
    // 父组件 jsx
    const ParentComponent = ({left, right}) => {
        return (
            .....
            {left}
            .....
            {right}
        )
    }
    ```

-   Good Component
    -   大小：允许在不滚动的情况下阅读
    -   名称：指示它的作用
    -   无无关状态管理
    -   易于阅读的实现

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

-   `<ParentComponent children={<childrenComponent />}>`
-   在 ParentComponent 返回 jsx 中，通过 `{ children }` 使用
-   用于当不需要在接受组件中修改自身 _props_

### as Component

-   `<ParentComponent children={childrenComponent}>`
-   在 ParentComponent 返回 jsx 中，通过 `<children />` 使用
-   用于需要在接受组件中修改(覆盖)或自定义自身 _props_

### as Function

-   用于需要在接受组件 _props_ 和自身 _props_ 之间选择的情况（相当于默认值和自定义传参）
-   作为渲染函数传递，会在每次调用时生成新的对象 `<ChildComponent />`
-   useCallback 记忆渲染函数无用，因为即使函数相同，但每次生成的元素对象 `<ChildComponent />` 不同
-   需结合 _useMemo_ 包裹渲染函数的返回值，才能避免子组件不必要的渲染

### 总结

-   组件渲染时，任何 _props_ 元素都不会改变（不重渲染）
-   传递渲染函数需单独讨论，`{ ()=> <></> }`, 在调用时返回一个新的对象
-   组件定义，定义的是一个不可变的对象，除非重新创建组件定义
-   `as Component({})` 和 `as Element(<></>)`，都是在传递不可变对象

# 高阶组件

## 使用场景

1. 回调；日志事件
2. 监听 DOM 事件
3. 上下文选择器

# Hooks

## 18 Hooks

### useTransition

-   **将紧急更新任务变为过渡任务**

```javascript
const [isPending, startTransition] = useTransition();
useTransition(() => {
    // 一些操作。在这些操作执行过程中，isPending 为 true；执行完成后，isPending 变为 false
});
{isPending ? (
         // 过渡动画
      ) : (
        // 数据处理
    )}
```

### useImperativeHandle

-   使父组件能够使用子组件方法

```javascript
useImperativeHandle(ref, 绑定一些属性和方法, [依赖项]);
// 父组件
ref.current.方法;
```

### useLayoutEffect

-   保证其中代码在组件更新期间同步运行，在 `useEffect` 之前执行
-   常见用法：
    -   在 `useLayoutEffect` 中更新 `state` ，可在一定程度上避免 UI 闪烁
-   缺陷：
    -   过多使用 `useLayoutEffect` 会使 `React` 变为一个巨大的同步任务
