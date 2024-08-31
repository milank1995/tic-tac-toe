import React, {useEffect, useState} from "react"

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

    return (
        <div className="container">
            <div className="boxes">
                {
                    boxes.map((_, index) => (
                        <button
                            key={index.toString()}
                            id={index}
                            onClick={() => onBoxClick(index)}
                            disabled={_.value || isWinner}
                        >
                            {_.value}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}