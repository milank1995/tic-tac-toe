import React, {useCallback, useEffect, useState} from "react"
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

export const PlayWithComputer = props => {
    const indexArray = [...new Array(9)].map((_, i) => ({
        value: '',
        index: i + 1
    }))
    const [boxes, setBoxes] = useState(indexArray)
    const [isYourTurn, setIsYourTurn] = useState(true)
    // let isYourTurn = true
    const [isWinner, setIsWinner] = useState(false)

    useEffect(() => {
        onWinnerChecking()
    }, [boxes]);

    const onBoxClick = (index) => {
        // if (isYourTurn) {
            boxes[index].value = "X"
            setIsYourTurn(false)
            // isYourTurn = false
        // } else {
        //     boxes[index].value = "O"
        //     setIsYourTurn(true)
            // isYourTurn = true
        // }
        setBoxes([...boxes])
        // console.log({isWinner})
        // if(!isWinner && !isYourTurn) {
        //     const index = onAutoPlaying(boxes)
        //     if(index !== -1) {
        //         setTimeout(() => onBoxClick(index), 1000)
        //     }
        // }
    }

    const onWinnerChecking = () => {
        winningCombo.forEach(winning => {
            const comb1 = boxes[winning[0] - 1].value
            const comb2 = boxes[winning[1] - 1].value
            const comb3 = boxes[winning[2] - 1].value
            if (comb1 && comb2 && comb3 && comb1 === comb2 && comb2 === comb3) {
                setIsWinner(true)
                document.getElementsByTagName("body")[0].style.overflow = "hidden"
            }
        })
    }

    const onNewGame = () => {
        // isYourTurn = false
        setIsYourTurn(false)
        setIsWinner(false)
        setBoxes([...indexArray])
        document.getElementsByTagName("body")[0].style.overflow = "auto"
    }

    const onAutoPlaying = (updatedBoxes) => {
        const remainingBoxes = updatedBoxes.filter(box => !box.value)
        if(!remainingBoxes.length) return -1
        const randomNumber = Math.floor(Math.random() * remainingBoxes.length)
        const index = remainingBoxes[randomNumber].index
        return updatedBoxes.findIndex(box => box.index === index)
    }

    const callback = useCallback((id) => {
        if(isYourTurn) {
            onBoxClick(id)
        }
    }, [isYourTurn, onBoxClick])

    console.log({isYourTurn})

    useCallback(() => {debugger
        if (!isYourTurn) {
            const index = onAutoPlaying(boxes)
            if(index !== -1) {
                // setTimeout(() => {
                    boxes[index].value = "0"
                    setIsYourTurn(true)
                // }, 1000)
            }
        }
    }, [boxes, isYourTurn])()

    // aa()
    // callback()
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
                                // onClick={() => onBoxClick(index)}
                                onClick={() => callback(index)}
                                disabled={_.value || isWinner || !isYourTurn}
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