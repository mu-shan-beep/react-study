import React from "react";

function render(Component) {
    ReactDOM.render(<div>
        <Component a="小明"></Component>
    </div>, document.querySelector("#root"))

}

/*{
    // react-mixins 老版本，已被废弃

    const customMixin = {
        componentDidMount() {
            console.log("-----componentDidMount-----");
        },

        say() {
            console.log(this.state.name);
        }
    }


    const APP = React.createClass({
        minixs: [customMixin],
        getInitialState() {
            return {
                name: "alien",
            }
        },
        render() {
            const {name} = this.state;
            return <div>hello ,world,my name is {name}</div>
        }
    })

}*/

/**
 * 以上方式已废弃
 * */


{
//衍生方式

    const customMixin = {
        componentDidMount() {
            console.log("-----componentDidMount-----");
        },

        say() {
            console.log(this.state.name);
        }
    }

//原型继承
    function componentClassMixins(Component, mixin) {
        for (let key in mixin) {
            Component.prototype[key] = mixin[key]
        }
    }

    class Index extends React.Component {
        constructor() {
            super();
            this.state = {
                name: "alien"
            }
        }

        render() {
            return <div>hello world
                <button onClick={this.say.bind(this)}>to say</button>
            </div>
        }
    }

    componentClassMixins(Index, customMixin)


}


{
//   继承模式

    class Base extends React.Component {
        constructor() {
            super();
            this.state = {
                name: "alien"
            }
        }

        say() {
            console.log("base components")
        }

        render() {
            return <div>hello world <button onClick={this.say.bind(this)}>点击</button></div>
        }
    }

    class Index extends Base {
        componentDidMount() {
            console.log(this.state.name)
        }

        say() {
            console.log("extends components")
        }

    }


}


{
//HOC  模式
    function HOC(Component) {
        return class wrapComponent extends React.Component {
            constructor(props) {
                super();
                this.state = {
                    name: "alien"
                }
            }

            componentDidMount() {
                console.log(this.props, "sssssssssss")
            }


            render = () => <Component   {...this.props} {...this.state}/>
        }
    }

    class Index extends React.Component {
        say() {
            const {name} = this.props;
            console.log(name)
        }

        componentDidMount() {
            console.log("我是Index组件")
        }

        render() {
            return <div>hello,world <button onClick={this.say.bind(this)}>点击</button></div>
        }
    }

    const App = HOC(Index);

    render(App);
}

{
    /**
     * 正向属性代理和反向组件继承
     * */

    // 正向属性代理
    //用组件包裹一层代理组件，在代理组件可对源组件做一些代理操作。可理解为父子组件关系
    /*   function HOC(WrapComponent) {
           return class Advance extends React.Component {
               state = {
                   name: "alien"
               }

               render() {
                   return <WrapComponent {...this.props} {...this.state}></WrapComponent>
               }

           }
       }*/

    class Index extends React.Component {
        render() {
            return <div>hello,world</div>
        }
    }

    Index.say = function () {
        console.log("my name is alien");
    }

    function HOC(Component) {
        return class wrapComponent extends React.Component {
            render() {
                return <Component {...this.props} {...this.state}/>
            }
        }
    }

    const newIndex = Hoc(Index);
    console.log(newIndex.say);//undefined
}


{
//    反向继承
    class Index extends React.Component {
        render() {
            return <div>hello, world</div>
        }
    }

    function HOC(Component) {
        return class wrapComponent extends Component {

        }
    }


    {
        class Index extends React.Component {
            render() {
                return <div>hello ,world</div>
            }
        }

        Index.say = function () {
            console.log("my name is alien");
        }

        function HOC(Component) {
            return class wrapComponent extends Component {
            }
        }

        const newIndex = HOC(Index);
        console.log(newIndex.say);//say()函数
    }

}


