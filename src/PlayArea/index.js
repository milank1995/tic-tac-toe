import React, {useEffect, useState} from "react"
import Confetti from 'react-confetti'

const winningCombo = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7]
];

export const PlayArea = props => {
    const indexArray = [...new Array(9)].map((_, i) => ({
        value: '',
        index: i + 1
    }))
    const [boxes, setBoxes] = useState(indexArray)
    const [isYourTurn, setIsYourTurn] = useState(false)
    const [isWinner, setIsWinner] = useState(false)

    useEffect(() => {
        onWinnerChecking()
    }, [boxes]);

    const onBoxClick = (index) => {
        if (isYourTurn) {
            boxes[index].value = "X"
            setIsYourTurn(false)
        } else {
            boxes[index].value = "O"
            setIsYourTurn(true)
        }
        setBoxes([...boxes])
    }

    const onWinnerChecking = () => {
        winningCombo.forEach(winning => {
            const comb1 = boxes[winning[0] - 1].value
            const comb2 = boxes[winning[1] - 1].value
            const comb3 = boxes[winning[2] - 1].value
            if (comb1 && comb2 && comb3 && comb1 === comb2 && comb2 === comb3) {
                setIsWinner(true)
            }
        })
    }

    const onNewGame = () => {
        setIsYourTurn(false)
        setIsWinner(false)
        setBoxes([...indexArray])
    }

    return (
        <main>

            {
                isWinner ? (
                    <Confetti
                        recycle={false}
                        numberOfPieces={1000}
                    />
                ) : null
            }

            <h1 className="game-title">Tic Tac Toe</h1>
            <div className="container">
                <div className="game">
                    {
                        boxes.map((_, index) => (
                            <button
                                className="box"
                                key={index.toString()}
                                id={index.toString()}
                                onClick={() => onBoxClick(index)}
                                disabled={_.value || isWinner}
                            >
                                {_.value}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="msg-container">
                {
                    isWinner ? (
                        <>
                            <p id="msg">Winner</p>
                            <button
                                id="new-btn"
                                onClick={onNewGame}
                            >
                                New Game
                            </button>
                        </>
                    ) : (
                        <>
                            <h3 className="turn-msg">
                                {isYourTurn ? "X" : "O"} Your turn...
                            </h3>
                            <button
                                id="reset-btn"
                                onClick={onNewGame}
                            >
                                Reset Game
                            </button>
                        </>
                    )
                }

            </div>
        </main>
    )
}