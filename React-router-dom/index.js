const {Routes, Route, Link, useNavigate, useParams, Outlet} = ReactRouterDOM;

function App() {
    return (
        <div>
            <header>
                <h1>Welcome to React Router!</h1>
                <Link to="/">Home</Link> ||
                <Link to="/teams">Teams</Link> ||
                <Link to="/teams/小明">Team</Link> ||
                <Link to="/teams/new">NewTeamForm</Link> ||
                <Link to="/leagueStandings">LeagueStandings</Link>
            </header>
            {/**
             *注册路由
             */}
            <Routes>
                <Route path="/" element={<Home/>}>
                    {/*带有index默认渲染组件*/}
                    <Route index path="about" element={<About/>}/>
                    {/*<Route path="teams/:teamId" element={<Team/>}/>*/}
                    <Route path="teams" element={<Teams/>}>
                        <Route path=":teamId" element={<Team/>}/>
                        <Route path="new" element={<NewTeamForm/>}/>
                    </Route>
                    <Route path="leagueStandings" element={<LeagueStandings/>}/>
                </Route>
            </Routes>
        </div>
    );
}

function Home() {
    return (
        <div>
            <h1>我是Home组件</h1>
            <Outlet/>
            <hr/>
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>我是About组件</h1>
            <Outlet/>
            <hr/>
        </div>
    );
}


function Teams() {
    return <div>
        <h1>我是Teams组件</h1>
        <Outlet/>
        <hr/>
    </div>
}

function Team() {
    const params = useParams();
    console.log(params)
    return <div>
        <h1>我是Team组件</h1>
        <h1>我是参数teamId:{params.teamId}</h1>
        <Outlet/>
        <hr/>
    </div>
}

function NewTeamForm() {
    return <div>
        <h1>我是NewTeamForm 组件</h1>
        <Outlet/>
        <hr/>
    </div>
}

function LeagueStandings() {
    return <div>
        <h1>我是LeagueStandings组件</h1>
        <Outlet/>
        <hr/>
    </div>
}

