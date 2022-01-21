### Context

- React.createContext()

> 创建一个 Context 对象，当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
> 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效
> 需要将 Context 对象挂载为类组件的静态属性 ContextType 才可获得

```
const MyContext = React.createContext(defaultValue)
```

- Context.Provider5

> 每个 Context 对象都会返回一个 Provider React 组件，允许消费组件订阅 context 的变化;
> Provider 接收一个 value 属性，传递给消费组件，一个 Provider 可以和多个消费组件有对应关系，多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
> 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括.contextType 和 useContext）的传播不受制于 shouldComponentUpdate 函数

- Class.contextType 挂载在 class 上的 contextType 属性可以赋值为由 React.createContext()创建的 Context 对象，此属性可让我们使用 this.context 来获取
  Context 的值，可在任何生命周期中访问，包含 render 函数

```
  componentDidMount() {
    let value = this.context;
  }
const MyContext = React.createContext({ name: "小明", age: 21 });
```

- Context.Consumer
  > React 组件可订阅 context 的变更，此组件可以在函数式组件中订阅 context；
  > 该方法需要一个函数作为子元素。该函数接受当前 context 值，并返回一个 React 节点；
  > 传递给函数的 value 值等于组件树上方离这个 context 最近的 Provider 提供的 value 值。
  > 如果没有对应的 Provider，value 参数等同于传递给 createContext()的 defaultValue

```
   class MyConsumer extends React.Component {
        render() {
          return (
            <MyContext.Consumer>
              {(value) => {
                return <div>我是MyConsumer组件：{value.name}</div>;
              }}
            </MyContext.Consumer>
          );
        }
   }
```

- context.displayName

> context 对象接受一个名为 displayName 的 property，类型为字符串。
> React DevTools 使用该字符串来确确定 context 要显示的内容

```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```
