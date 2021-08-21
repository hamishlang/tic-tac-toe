$(document).ready(function () {
    //table printing
    let columnsNum = $('#columns').val()
    let rowsNum = $('#rows').val()
    let th = ''
    let tr = ''

    //table printer function
    let tablePrint = (col, row) => {
        tr = ''
        for (let t = 0; t < row; t++) {
            th = ''
            tr += `<tr id="row${t}">`
            for (let i = 0; i < col; i++) {
                let thUniq = `<th row="${t}" col="${i}"></th>`
                th += thUniq
            }
            tr += th
            tr += '</tr>'
        }
    }

    //table submit function
    $('#form').submit(function () {
        columnsNum = $('#columns').val()
        rowsNum = $('#rows').val()
        $('#boardarea').empty()
        gameStarter()
        xOrO = 'X'
        return false
    })



    let xOrO = 'X'

    let ghostLetter = () => {
        $(' th ').hover(
            function () {
                let thisCell = ($(this).html())
                if (thisCell === '') {
                    $(this).html(`<span class="ghost">${xOrO}</span>`)
                };
            },
            function () {
                if ($(this).hasClass('selected')) {
                    return
                } else {
                    $(this).html(``);
                }
            }
        )
    }


    let click = () => {
        $(' th ').on("click", function () {

            let classMark = (point, letter) => {
                newMatrix[thisRow][thisCol] = point
                $(this).html(`<span class="mark">${xOrO}</span>`)
                $(this).addClass(`selected`)
                xOrO = letter
            }

            let thisCol = $(this).attr('col')
            let thisRow = $(this).attr('row')

            if (newMatrix[thisRow][thisCol] === 2 || newMatrix[thisRow][thisCol] === 3) {
                console.log('taken')
            } else if (xOrO === 'X') {
                classMark(2, 'O')
            } else if (xOrO === 'O') {
                classMark(3, 'X')
            }

            // console.log(newMatrix)
        })
    }

    let newMatrix = []
    let innMatrix = []
    let matrixBuilder = (col, row) => {
        newMatrix = []
        for (let i = 0; i < row; i++) {
            innMatrix = []
            for (let i = 0; i < col; i++) {
                innMatrix.push(1)
            }
            newMatrix.push(innMatrix)
        }
    }


    let gameStarter = () => {
        tablePrint(rowsNum, rowsNum)
        $('#boardarea').html(`<table class="board">` + tr + `</table>`)
        ghostLetter()
        matrixBuilder(rowsNum, rowsNum)
        // console.log(newMatrix)
        click()
    }

    gameStarter()

    let x = 2
    let count = 0
    $(' #checker ').on("click", function () {
        let winCount = rowsNum
        // console.log(winCount)
        let winCheckHor = 0
        let winCheckVer = 0
        let winCheckSE = 0




        for (let j = 0; j < newMatrix.length; j++) {


            // horizontal checker
            for (let i = 0; i < newMatrix[j].length; i++) {

                if (newMatrix[j][i] === 2) {
                    winCheckHor += 1

                } else if (newMatrix[j][i] === 3) {
                    winCheckHor += 10
                }

            }
            // vertical checker
            for (let i2 = 0; i2 < rowsNum; i2++) {

                if (newMatrix[i2][j] === 2) {
                    winCheckVer += 1

                } else if (newMatrix[i2][j] === 3) {
                    winCheckVer += 10
                }
            }
            // South East checker
            for (let i2 = 0; i2 < rowsNum; i2++) {

                if (newMatrix[i2][i2] === 2) {
                    winCheckSE += 1

                } else if (newMatrix[i2][i2] === 3) {
                    winCheckSE += 10
                }
            }
            // console.log(winCheck)

            if (winCheckHor == winCount || winCheckVer == winCount || winCheckSE == winCount) {
                console.log('player 1 wins')
            } else if (winCheckHor === (winCount) * 10 || winCheckVer === (winCount) * 10 || winCheckSE === (winCount) * 10) {
                console.log('player 2 wins')
            }
            console.log('Hor: ' + winCheckHor + ' Ver: ' + winCheckVer + ' SE: ' + winCheckSE + ' WINCOUNT' + winCount)


            winCheckHor = 0
            winCheckVer = 0
            // console.log('break')
            // console.log(newMatrix)
        }
        console.log('end')
    })

    let testArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    testArray

})