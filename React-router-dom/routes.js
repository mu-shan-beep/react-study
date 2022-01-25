let invoices = [
    {
        name: "Santa Monica",
        number: 1995,
        amount: "$10,800",
        due: "12/05/1995"
    },
    {
        name: "Stankonia",
        number: 2000,
        amount: "$8,000",
        due: "10/31/2000"
    },
    {
        name: "Ocean Avenue",
        number: 2003,
        amount: "$9,500",
        due: "07/22/2003"
    },
    {
        name: "Tubthumper",
        number: 1997,
        amount: "$14,000",
        due: "09/01/1997"
    },
    {
        name: "Wide Open Spaces",
        number: 1998,
        amount: "$4,600",
        due: "01/27/2998"
    }
];

function getInvoive(number) {
    console.log(number, "aaaaaaa")
    return invoices.find(invoice => invoice.number === number)
}

function QueryNavLink({to, ...props}) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props}/>
}

/*function Invoices() {
    return (
        <div style={{display: "flex"}}>
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}
            >
                {invoices.map(invoice => (
                    <Link
                        style={{display: "block", margin: "1rem 0"}}
                        to={`/invoices/${invoice.number}`}
                        key={invoice.number}
                    >
                        {invoice.name}
                    </Link>
                ))}
            </nav>
            <Outlet/>
        </div>
    );
}*/


//动态路由
/*
function Invoices() {
    return <div style={{display: "flex"}}>
        <nav style={{borderRight: "solid 1px ", padding: "1rem"}}>
            {
                invoices.map(invoice => <NavLink style={({isActive}) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                }} to={`/invoices/${invoice.number}`} key={invoice.number}>{invoice.name}</NavLink>)
            }
        </nav>
        <Outlet/>
    </div>
}
*/

//搜索参数
function Invoices() {
    let [searchParams, setSearchParams] = useSearchParams();
    return <div style={{display: "flex"}}>
        <nav style={{borderRight: "solid 1px ", padding: "1rem"}}>
            <input value={searchParams.get("filter") || ""}
                   onChange={event => {
                       let filter = event.target.value
                       if (filter) {
                           setSearchParams({filter});
                       } else {
                           setSearchParams({});
                       }
                   }}
            />
            {
                invoices.filter(invoice => {
                    let filter = searchParams.get("filter");
                    if (!filter) return true;
                    let name = invoice.name.toLowerCase()
                    return name.startsWith(filter.toLowerCase())
                }).map(invoice => <QueryNavLink style={({isActive}) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                }} to={`/invoices/${invoice.number}`} key={invoice.number}>{invoice.name}</QueryNavLink>)
            }
        </nav>
        <Outlet/>
    </div>
}


function Invoice() {
    let {InvoiceId} = useParams();
    let invoice = getInvoive(parseInt(InvoiceId, 10))
    return <div>
        <main style={{padding: "1rem"}}>
            <h2>Total Due: {invoice.amount}</h2>
            <p>
                {invoice.name}: {invoice.number}
            </p>
            <p>Due Date: {invoice.due}</p>
        </main>
    </div>
}

function BrandLink({brand, ...props}) {
    let [params] = useSearchParams();
    let isActive = params.getAll("brand").includes(brand);
    if (!isActive) {
        params.append("brand", brand);
    } else {
        params = new URLSearchParams(Array.from(params).filter(([key, value]) =>
            key !== "brand" || value !== brand)
        )
    }
    return (<Link style={{color: isActive ? "red" : ""}} to={`/shoes?${params.toString()}`}  {...props}/>)
}

function Home() {
    return <div>
        <h1>我是Home组件</h1>
        <Outlet/>
    </div>
}

function App() {
    return <div>
        <Invoices/>
        <Link to="/brandLink?brank=nike">Nike</Link>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="brandLink" element={<BrandLink/>}/>
                <Route path="invoices" element={<Invoices/>}>
                    <Route index path=":InvoiceId" element={<Invoice/>}/>
                </Route>
                <Route path="*" element={<div><h1>There's nothing here！</h1></div>
                }/>
            </Route>
        </Routes>
        <Outlet/>
    </div>
}