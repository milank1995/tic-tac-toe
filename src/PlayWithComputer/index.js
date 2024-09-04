import React, {useEffect, useState, useCallback} from "react"
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

const initialObject = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: '',
}

export const PlayWithComputer = props => {
    const [boxObject, setBoxObject] = useState(initialObject)
    const [isYourTurn, setIsYourTurn] = useState(true)
    const [isWinner, setIsWinner] = useState(false)

    useEffect(() => {
        if(Object.values(boxObject).filter(x => x).length > 0 && !isYourTurn && !isWinner) {
            const index = onAutoPlaying(boxObject)
            onBoxClick(index)
        }
    }, [boxObject, isWinner, isYourTurn])

    const onBoxClick = useCallback((index) => {
        boxObject[index] = isYourTurn ? "X" : "0"
        onWinnerChecking(boxObject)
        setIsYourTurn(!isYourTurn)
        setBoxObject(boxObject)
    })

    const onWinnerChecking = (boxObjectLocal) => {
        winningCombo.forEach(winning => {
            const comb1 = boxObjectLocal[winning[0]]
            const comb2 = boxObjectLocal[winning[1]]
            const comb3 = boxObjectLocal[winning[2]]
            if (comb1 && comb2 && comb3 && comb1 === comb2 && comb2 === comb3) {
                setIsWinner(true)
                document.getElementsByTagName("body")[0].style.overflow = "hidden"
            }
        })
    }

    const onNewGame = () => {
        setIsYourTurn(false)
        setIsWinner(false)
        setBoxObject(initialObject)
        document.getElementsByTagName("body")[0].style.overflow = "auto"
    }

    const onAutoPlaying = (updatedBoxes) => {
        const remainingBoxes = Object.keys(updatedBoxes).filter(box => !updatedBoxes[box])
        if(!remainingBoxes.length) return -1
        const randomNumber = Math.floor(Math.random() * remainingBoxes.length)
        return remainingBoxes[randomNumber]
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
                         Object.keys(boxObject).map((_, index) => (
                            <button
                                className="box"
                                key={index.toString()}
                                id={index.toString()}
                                onClick={() => onBoxClick(_)}
                                disabled={boxObject[_] || isWinner || !isYourTurn}
                            >
                                {boxObject[_]}
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