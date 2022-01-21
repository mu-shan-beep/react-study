function render(Component) {
    ReactDOM.render(<div>
        {Component}
    </div>, document.querySelector("#root"))
}


{
    /**
     * 编写高阶组件
     * 强化props
     * */
    {
        // 混入props
        function classHoc() {
            return class Idex extends React.Component {
                state = {
                    name: "alien"
                }

                componentDidMount() {
                    console.log("HOC")
                }

                render() {
                    return <WrapComponent {...this.props} {...this.state}/>
                }
            }
        }

        function Index(props) {
            const {name} = props;
            React.useEffect(() => {
                console.log("index");
            }, [])
            return <div>hello,world,my name is {name}</div>
        }

        //无状态组件 （函数组件）
        function functionHoc(WrapComponent) {
            return function Index(props) {
                const [state, setState] = React.useState({name: "alien"})
                return <WrapComponent {...props} {...state}/>
            }
        }

        const NewIndex = classHoc(Index)
    }

    {
        // 抽离state控制更新
        function classHOC(WrapComponent) {
            return class Idex extends React.Component {
                constructor() {
                    super();
                    this.state = {
                        name: "alien"
                    }
                }

                changeName(name) {
                    this.setState({name})
                }

                render() {
                    return <WrapComponent {...this.props} {...this.state} changeName={this.changeName.bind(this)}/>

                }
            }
        }

        function Index(props) {
            const [value, setValue] = React.useState(null);
            const {name, changeName} = props;
            return <div>
                <div>hello,world,my name is {name}</div>
                改变name <input onChange={(e) => setValue(e.target.value)}/>
                <button onClick={() => changeName(value)}>确定</button>
            </div>
        }

        let App = classHOC(Index);
    }


    {
        //  控制渲染 动态渲染
        function renderHOC(WrapComponent) {
            return class Index extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {visible: true}
                }

                setVisible() {
                    this.setState(
                        {visible: !this.state.visible}
                    )
                }

                render() {
                    const {visible} = this.state;
                    return <div className="box">
                        <button onClick={this.setVisible.bind(this)}>挂载组件</button>
                        {visible ? <WrapComponent{...this.props} setVisible={this.setVisible.bind(this)}/> :
                            <div className="icon">
                                <SyncOutlined/>
                            </div>
                        }
                    </div>
                }
            }

        }

        class SyncOutlined extends React.Component {
            render() {
                return <h1>我是SyncOutlined</h1>
            }
        }


        class Index extends React.Component {
            render() {
                const {setVisible} = this.props;
                return <div className="box">
                    <p>hello,my name is alien</p>
                    <img
                        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&fm=26&gp=0.jpg"/>
                    <button onClick={() => setVisible()}>卸载当前组件</button>
                </div>
            }
        }

        let App = renderHOC(Index)

    }


    {
        //   动态渲染 分片渲染
        const renderQueue = [];
        let isFirstrender = false;

        const tryRender = () => {
            const render = renderQueue.shift();
            if (!render) return;
            setTimeout(() => {
                render();
            }, 300)
        }

        function renderHOC(WrapComponent) {
            return function Index(props) {
                //useState  返回一个state和更新state的函数
                const [isRender, setRender] = React.useState(false);

                console.log(isRender, setRender);

                React.useEffect(() => {
                    renderQueue.push(() => {
                        setRender(true)
                    })
                    if (!isFirstrender) {
                        tryRender();
                        isFirstrender = true;
                    }
                }, [])
                return isRender ? <WrapComponent tryRender={tryRender()} {...props} /> : <div className="box">
                    <div className="icon"><SyncOutlined></SyncOutlined></div>
                </div>
            }
        }

        class SyncOutlined extends React.Component {
            render() {
                return <h1>我是SyncOutlined</h1>
            }
        }

        class Index extends React.Component {
            componentDidMount() {
                const {name, tryRender} = this.props;
                tryRender();
                console.log(name + "渲染")
            }

            render() {
                return <div>
                    <img
                        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&amp;fm=26&amp;gp=0.jpg"/>
                </div>
            }
        }

        const Item = renderHOC(Index)

        const App = () => {
            return <React.Fragment>
                <Item name="组件一"/>
                <Item name="组件二"/>
                <Item name="组件三"/>
            </React.Fragment>
        }

    }

    {
        //  节流渲染  HOC配合hocks的useMemo等API配合使用。可减少渲染次数，达到优化性能的效果。
        function HOC(Component) {
            return function renderWrapComponent(props) {
                const {num} = props;
                console.log(num, "num")
                const RenderElement = React.useMemo(() => <Component {...props}/>, [num])//只有当num更新时，才会重新渲染组件
                return RenderElement;
            }
        }

        class Index extends React.Component {
            render() {
                console.log("当前组件是否渲染", this.props);
                return <div>hello,world,my name is alien</div>
            }
        }

        const IndexHoc = HOC(Index);

        function App() {
            const [num, setNum] = React.useState(0)
            const [num1, setNum1] = React.useState(0)
            const [num2, setNum2] = React.useState(0)
            return <div>
                <IndexHoc num={num} num1={num1} num2={num2}/>
                <button onClick={() => setNum(num + 1)}>num++</button>
                <button onClick={() => setNum1(num1 + 1)}>num1++</button>
                <button onClick={() => setNum2(num2 + 1)}>num2++</button>
            </div>
        }

    }

    {
        //    定制化渲染刘
        function HOC(rule, Component) {
            return function renderWrapComponent(props) {
                const dep = rule(props);
                const RenderElement = React.useMemo(() => <Component {...props}/>, [dep])
                return RenderElement
            }
        }


        class IndexHoc extends React.Component {
            render() {
                console.log(`组件一渲染`, this.props)
                return <div> 组件一 ： hello,world </div>
            }
        }

        class IndexHoc1 extends React.Component {
            render() {
                console.log("组件二渲染", this.props)
                return <div> 组件二 ： hello,world </div>
            }
        }

        const Hoc1 = HOC((props) => props['num'], IndexHoc)
        const Hoc2 = HOC((props) => props['num1'], IndexHoc1)


        function App() {
            const [num, setNum] = React.useState(0)
            const [num1, setNum1] = React.useState(0)
            const [num2, setNum2] = React.useState(0)
            return <div>
                <Hoc1 num={num} num1={num1} num2={num2}/>
                <Hoc2 num={num} num1={num1} num2={num2}/>
                <button onClick={() => setNum(num + 1)}>num++</button>
                <button onClick={() => setNum1(num1 + 1)}>num1++</button>
                <button onClick={() => setNum2(num2 + 1)}>num2++</button>
            </div>
        }

    }


    {
        //    赋能组件 属性代理
        function HOC(Component) {
            const proDidMount = Component.prototype.componentDidMount;
            Component.prototype.componentDidMount = function () {
                console.log("劫持生命周期：componentDidMount");
                proDidMount.call(this);
            }
            return class wrapComponent extends React.Component {
                render() {
                    return <Component{...this.props}/>
                }
            }
        }

        class Index extends React.Component {
            componentDidMount() {
                console.log("____didMount____");
            }

            render() {
                return <div>hello,world </div>
            }
        }


    }


    {
        //    反向继承
        function HOC(Component) {
            const didMount = Component.prototype.componentDidMount;
            return class wrapComponent extends Component {
                componentDidMount() {
                    console.log("劫持生命周期：componentDidMount");
                    if (didMount) {
                        didMount.apply(this)
                    }
                }

                render() {
                    return super.render();
                }
            }
        }

        class Index extends React.Component {
            componentDidMount() {
                console.log("____didMounted____");
            }

            render() {
                return <div>hello,world</div>
            }
        }
    }


    {
        //    事件监控
        function ClickHoc(Component) {
            return function Wrap(props) {
                const dom = React.useRef(null);
                React.useEffect(() => {
                    console.log(dom,"dddddd")
                    const handleClick = () => console.log("发生点击事件")
                    dom.current.addEventListener("click", handleClick);
                    return () => dom.current.removeEventListener("click", handleClick)
                }, []);
                return <div ref={dom}><Component {...props}/></div>
            }
        }

        class Index extends React.Component {
            render() {
                return <div className="index">
                    <p>hello,world</p>
                    <button>组件内部点击</button>
                </div>
            }
        }

        const App = ClickHoc(Index)
        render(<App/>)
    }
}


