class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.textInput}/>
                <input type="button" value="Focus the text input" onClick={this.focusTextInput}/>
            </div>
        )
    }
}

class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focusTextInput();
    }

    render() {
        return <CustomTextInput ref={this.textInput}/>
    }
}


function MyFunctionComponent() {
    return <input/>
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    render() {
        return <MyFunctionComponent ref={this.textInput}/>
    }
}

function CustomTextInputFn(props) {
    const textInput = React.useRef(null);

    function handleClick() {
        textInput.current.focus();
    }

    return <div>
        <input
            type="text"
            ref={textInput}/>
        <input
            type="button"
            value="Focus the text input"
            onClick={handleClick}
        />
    </div>
}

//回调Refs
class CustomTextInputCB extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = null;
        this.setTextInputRef = element => {
            this.textInput = element;
        }
        this.focusTextInput = () => {
            if (this.textInput) this.textInput.focus();
        }
    }

    componentDidMount() {
        this.focusTextInput();
    }

    render() {
        return <div>
            <input type="text" ref={this.setTextInputRef}/>
            <input type="button" onClick={this.focusTextInput} value="Focus the text input"/>
        </div>
    }
}

//组件之中传递回调形式的refs
function CustomTextInputRef(props) {
    return (
        <div><input ref={props.inputRef}/></div>
    )
}


class ParentRef extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <CustomTextInputRef inputRef={el => this.inputElement = el}/>
    }
}

ReactDOM.render(<div>
    <p>CustomTextInput：</p> <CustomTextInput/>
    <p>AutoFocusTextInput：</p> <AutoFocusTextInput/>
    <p>Parent:</p> <Parent/>
    <p>CustomTextInputFn:</p> <CustomTextInputFn/>
    <p>CustomTextInputCB:</p> <CustomTextInput/>
    <p>ParentRef:</p> <ParentRef/>
</div>, document.getElementById("root"))