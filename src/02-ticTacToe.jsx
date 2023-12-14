import { useState } from "react";

export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // 初始，二维数组（矩阵）
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0; // 下一次应下子
    const currentSquares = history[currentMove]; // 最新棋盘

    const handlePlay = (nextSquares) => {
        // 记录每一次棋盘（跳转后也记录）
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    // 时间旅行
    const jumpTo = (i) => {
        setCurrentMove(i); // 更新当前查看棋盘（悔棋）
    };

    const moveItems = history.map((item, i) => {
        const description = i === 0 ? "Go to Game Start" : `Go to move #${i}`;

        return (
            <li key={i}>
                <button
                    onClick={() => {
                        jumpTo(i);
                    }}
                >
                    {description}
                </button>
            </li>
        );
    });

    // 传递方法 尽量不用箭头函数（直接写函数名传递），避免需要多次接受参数
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moveItems}</ol>
            </div>
        </div>
    );
}

// 棋盘组件
function Board({ xIsNext, squares, onPlay }) {
    // 自定义事件
    const squareClickEvent = (i) => {
        if (squares[i] || calculateWinner(squares)) return;
        let squaresC = squares.slice();
        squaresC[i] = xIsNext ? "X" : "O";
        onPlay(squaresC);
    };

    let status = calculateWinner(squares) ? "Winter: " + calculateWinner(squares) : "Next Player: " + (xIsNext ? "X" : "O");

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} squareClickEvent={() => squareClickEvent(0)} />
                <Square value={squares[1]} squareClickEvent={() => squareClickEvent(1)} />
                <Square value={squares[2]} squareClickEvent={() => squareClickEvent(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} squareClickEvent={() => squareClickEvent(3)} />
                <Square value={squares[4]} squareClickEvent={() => squareClickEvent(4)} />
                <Square value={squares[5]} squareClickEvent={() => squareClickEvent(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} squareClickEvent={() => squareClickEvent(6)} />
                <Square value={squares[7]} squareClickEvent={() => squareClickEvent(7)} />
                <Square value={squares[8]} squareClickEvent={() => squareClickEvent(8)} />
            </div>
        </>
    );
}

// 棋格组件
const Square = ({ value, squareClickEvent }) => {
    return (
        <button className="square" onClick={() => squareClickEvent()}>
            {value}
        </button>
    );
};

// 判断胜负辅助函数
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
