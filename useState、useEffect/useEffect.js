/**
 * @param useState
 * @param useEffect
 * 在使用以上两个钩子时，每次组件render时，会生成一份本次render的state，function，effects，这些与之前的render中的内容都是没关系的。对于class component ,state是一种引用形式，故二者在表现形式有所不同
 * */

function Counter1() {
    const [count, setCount] = React.useState(0);

    function handleAlertClick() {
        setTimeout(() => {
                console.log(count)
            },
            300
        )
    }

    return <div>
        <p>You click {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <button onClick={handleAlertClick}>show console</button>
    </div>
}

function Counter2() {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        setTimeout(() => {
            console.log(count);
        }, 300)
    })

    return <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>
}


function Example1(props) {
    React.useEffect(() => {
        setTimeout(() => {
            console.log(props.counter, "Example1");
        }, 1000)
    })

    return ""
}

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.add = this.add.bind(this)
    }

    componentDidUpdate() {
        setTimeout(() => {
            console.log(this.state.count)
        }, 300)
    }

    add = () => {
        const {count} = this.state;
        this.setState({
                count: count + 1
            }
        )
    }

    render() {
        return <div>
            <Example1 counter={this.state.count}></Example1>
            <button onClick={this.add}>Click me</button>
        </div>
    }
}

