## react-router-dom

+ 官方api  https://reactrouter.com/docs/en/v6/getting-started/installation

> 基本安装 npm  install react-router-dom / yarn add react-router-dom


> 创建应用

```jsx
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
```

> 注册 React Router

```jsx
function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>
            <Routes>
                <Route path="/" element={<ReactComponent/>}/>
                <Route index path="home" element={<ReactComponent/>}/>

            </Routes>
        </div>
    )
}
```

> 使用 React  Router

```jsx
<Link to="/">Home</Link>
```

> 嵌套路由
> 带有index默认渲染组件
> 父级组件中要添加 <Outlet/> 标签，进行内容渲染

```jsx
  <Routes>
    <Route path="/" element={<Home/>}>
        <Route path="about" element={<About/>}/>

        <Route index path="leagueStandings" element={<LeagueStandings/>}/>
        <Route path="teams" element={<Teams/>}>
            <Route path=":teamId" element={<Team/>}/>
            <Route path="new" element={<NewTeamForm/>}/>
        </Route>
    </Route>
</Routes>
```

> 接收参数 useParams()

```jsx
function App() {
    return (
        <Routes>
            <Route
                path="invoices/:invoiceId"
                element={<Invoice/>}
            />
        </Routes>
    );
}

function Invoice() {
    let params = useParams();
    return <h1>Invoice {params.invoiceId}</h1>;
}
```

> 相对链接 不以"/"开头，相对于渲染他们的路径
> 以下路由会被渲染为 /dashboard/invoices 或 /dashboard/team
> path="*" 匹配任何URL,具有最弱的优先级，没有其他路由匹配时，才会使用

```jsx
function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="invoices">Invoices</Link>{" "}
                <Link to="team">Team</Link>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    );
}
```

> 搜索参数 类似url参数，但他位于url不同位置，位于结尾的？，比如："/login?success=1"或"/shoes?brand=nike&sort=asc"