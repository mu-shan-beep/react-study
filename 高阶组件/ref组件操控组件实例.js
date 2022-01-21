/**
 *通过ref获取组件实例，获取到组件实例可获取组件的一些状态，或手动触发一些事件。 class声明的有状态组件才有实力，function生命的无状态组件不存在实例
 * */

//  属性代理，添加额外的生命周期

function Hoc(Component) {
    return class WrapComponent extends React.Component {
        constructor(props) {
            super(props);
            this.node = null;
        }

        UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
            if (nextProps.number !== this.props.number) {
                this.node.handerNumberChange && this.node.handerNumberChange.call(this.node)
            }
        }

        render() {
            return <Component {...this.props} ref={(node) => this.node = node}/>
        }
    }
}

class Index extends React.Component {
    handerNumberChange() {
    }

    render() {
        return <div>hello world!</div>
    }

}
