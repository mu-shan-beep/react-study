/**
 * const  [state ,setState] = React.useState(initialState);
 * 返回一个state，以及更新state的函数
 * 初始渲染时，返回的状态（state）与传入的第一个参数（initialState）值相同。
 * setState函数用于更新state
 * setState（newState）；
 * */
// import React from "react";
//函数式更新
function Counter() {
    const [count, setCount] = React.useState(0);

    function handleClick() {
        setCount((count + 1));
    }

    function handleClickFn() {
        setCount((prevCount) => {
            return prevCount + 1;
        })
    }

    return (
        <div>
            Count :{count}
            <button onClick={handleClickFn}>+</button>
            <button onClick={handleClick}>+</button>
        </div>
    )
}

//两种方式区别
// handleClick 和 handleClickFn 一个通过新的state值更新，一个通过函数更新返回新的state，同步没有，异步两者是有区别的

function SyncCounter() {
    const [count, setCount] = React.useState(0);

    function handleClick() {
        setTimeout(() => {
            setCount(count + 1)
        }, 300)
    }

    function handleClickFn() {
        setTimeout(() => {
            setCount((prevCount) => {
                return prevCount + 1
            })
        }, 300)
    }

    return (
        <div>
            Count:{count}
            <button onClick={handleClick}>+</button>
            <button onClick={handleClickFn}>+</button>
        </div>
    )
}

