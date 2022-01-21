// 将ref转发，向下传递（其子组件）
//  ref 参数自在使用React.forwardRef定义组件时存在，常规函数和class组件不接受ref参数,且props中不存在ref
const FancyButton = React.forwardRef((props, ref) => {
    return (
        <div>
            <button ref={ref} className="FancyButton">
                {props.children}
            </button>
        </div>
    );
});

const ref = React.createRef();

/************************************ 在高阶组件中转发 refs *************************************/
function logProps(WrappedComponent) {
    class LogProps extends React.Component {
        render() {
            const {forwardedRef, ...rest} = this.props;
            return <WrappedComponent ref={forwardedRef} {...rest} />;
        }
    }

    return React.forwardRef((props, ref) => {
        return <LogProps {...props} forwardedRef={ref}/>;
    });
}

const LogProps1 = logProps(FancyButton);

ReactDOM.render(
    <div>
        <FancyButton ref={ref}>Click me!</FancyButton>

        <hr/>
        <LogProps1/>
    </div>,
    document.getElementById("root")
);

//   当ref挂载完成，ref.current指向 <button> DOM节点
console.log(ref); //获取当前组件