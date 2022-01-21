{
    /*class MouseTracker extends React.Component {
        constructor(props) {
            super(props);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.state = {x: 0, y: 0}
        }

        handleMouseMove(e) {
            this.setState({
                x: e.clientX,
                y: e.clientY
            });
        }

        render() {
            return <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                <h1>移动鼠标</h1>
                <p>当前鼠标位置是({this.state.x},{this.state.y})</p>
            </div>
        }
    }*/
}

{/*
    class Mouse extends React.Component {
        constructor(props) {
            super(props);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.state = {x: 0, y: 0};
        }

        handleMouseMove(e) {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }

        render() {
            return <div onMouseMove={this.handleMouseMove}>
                <p>The current mouse position is ({this.state.x},{this.state.y})</p>
            </div>
        }

    }*/
}

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return <img
            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
            style={{position: "absolute", left: mouse.x, top: mouse.y, width: "100px", height: "100px"}} alt=""/>
    }
}

{/*
    class MouseWithCat extends React.Component {
        constructor(props) {
            super(props);
            this.handleMouseMove = this.handleMouseMove.bind(this);
            this.state = {x: 0, y: 0}
        }

        handleMouseMove(e) {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }

        render() {
            return <div style={{height: '100%', border: '1px solid red'}} onMouseMove={this.handleMouseMove}>
                <Cat mouse={this.state}/>
            </div>
        }
    }
*/
}


/**
 * render prop 是因为模式才被称为 render prop ，你不一定要用名为 render 的 prop 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”.
 * */

class Mouse extends React.Component {
    render() {
        const state = this.props.client;
        console.log(state, "eeeeeeeeeee")
        return <div style={this.props.render ? {height: "100vh"} : {height: ""}} onMouseMove={this.handleMouseMove}>
            {
                this.props.render ? this.props.render(state) : this.props.children(state)
            }
        </div>
    }
}


function widthMouse(Component) {
    return class extends React.Component {
        render() {
            return (<Mouse render={mouse =>
                <Component {...this.props} mouse={mouse}/>
            }/>)
        }
    }
}


class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0}
    }

    handleMouseMove(e) {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    render() {
        return <div style={{height: "100vh"}} onMouseMove={this.handleMouseMove}>
            <h1>鼠标移动</h1>
            <Mouse client={this.state} children={mouse => {
                return <p>鼠标的位置是{mouse.x},{mouse.y}</p>
            }
            }/>
            <Mouse client={this.state} render={mouse => {
                return <Cat mouse={mouse}/>
            }}/>
        </div>
    }
}

ReactDOM.render(<MouseTracker/>, document.getElementById("root"))