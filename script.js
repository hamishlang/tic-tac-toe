$(document).ready(function () {
    //table printing
    // let columnsNum = $('#columns').val()
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
                let thUniq = `<th row="${t}" col="${i}" id="${t}-${i}">&nbsp;</th>`
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
                if (thisCell === '&nbsp;') {
                    $(this).html(`<span class="ghost">${xOrO}</span>`)
                };
            },
            function () {
                if ($(this).hasClass('selected')) {
                    return
                } else {
                    $(this).html(`&nbsp;`);
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
            winChecker()

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

    let winChecker = () => {
        let winCount = rowsNum
        // console.log(winCount)
        let winCheckHor = 0
        let winCheckVer = 0
        let winCheckSE = 0
        let winCheckNE = 0
        // let j = 0
        
        


        for (let j = 0; j < newMatrix.length; j++) {
            // let ix = 0
            // function for color change horizontel 
            let horWin = (player) => {
                
                for (let ix = 0; ix < newMatrix[j].length; ix++) {
                    let theItem = $(`#${j}-${ix}`)
                    


                    $(`#${j}-${ix}`).addClass('green')
                    
                }
                console.log(`player ${player} wins!`)
            }

            let vertWin = (player) => {
                for (let i2x = 0; i2x < rowsNum; i2x++) { 
                    $(`#${i2x}-${j}`).addClass('green')
                } 
            }

            let southEWin = (player) => {
                
                for (let i2x = 0; i2x < rowsNum; i2x++) { 
                    $(`#${i2x}-${i2x}`).addClass('green')
                }
            }

            let northEWin = (player) => {
                let northEast2 = rowsNum - 1
                for (let i2x = 0; i2x < rowsNum; i2x++) { 
                    $(`#${northEast2 - i2x}-${i2x}`).addClass('green')
                }
            }



            // horizontal checker
            for (let i = 0; i < newMatrix[j].length; i++) {
                
                if (newMatrix[j][i] === 2) {
                    winCheckHor += 1

                    if (winCheckHor == winCount) {
                        //PLAYER ONE WIN HOR
                        horWin(1)
                    } 

                } else if (newMatrix[j][i] === 3) {
                    winCheckHor += 10

                    if (winCheckHor == winCount * 10) {
                        horWin(2)
                    }
                }
            }
            // vertical checker
            for (let i2 = 0; i2 < rowsNum; i2++) {

                if (newMatrix[i2][j] === 2) {
                    winCheckVer += 1


                    if (winCheckVer == winCount) {
                    vertWin(1)
                }

                } else if (newMatrix[i2][j] === 3) {
                    winCheckVer += 10

                    if (winCheckVer == winCount * 10) {
                        vertWin(2)
                    }
                }
            }
            // South East checker
            for (let i2 = 0; i2 < rowsNum; i2++) {

                if (newMatrix[i2][i2] === 2) {
                    winCheckSE += 1

                    if (winCheckSE == winCount) {
                        southEWin(1)
                    }


                } else if (newMatrix[i2][i2] === 3) {
                    winCheckSE += 10

                    if (winCheckSE == winCount * 10) {
                        southEWin(2)
                    }
                }
            }

            // NORTH East checker
            for (let i3 = 0; i3 < rowsNum; i3++) {
                let northEast = rowsNum - 1
                if (newMatrix[(northEast - i3)][i3] === 2) {
                    winCheckNE += 1
                    if (winCheckNE == winCount) {
                        northEWin(1)
                    }


                } else if (newMatrix[(northEast - i3)][i3] === 3) {
                    winCheckNE += 10

                    if (winCheckNE == winCount *10) {
                        northEWin(2)
                    }
                }
            }
            // console.log(winCheck)
            // if (winCheckHor == winCount) {



            // }
            if (winCheckHor == winCount || winCheckVer == winCount || winCheckSE == winCount || winCheckNE == winCount) {
                // console.log('player 1 wins')
            } else if (winCheckHor === (winCount) * 10 || winCheckVer === (winCount) * 10 || winCheckSE === (winCount) * 10 || winCheckNE == (winCount) * 10) {
                // console.log('player 2 wins')
            }
            // console.log('Hor: ' + winCheckHor + ' Ver: ' + winCheckVer + ' SE: ' + winCheckSE + ' WINCOUNT' + winCount)
            // console.log('rowsNum' + rowsNum)

            winCheckHor = 0
            winCheckVer = 0 
            winCheckSE = 0
            winCheckNE = 0
            
            
            // console.log('break')
            // console.log(newMatrix)
        }
        // console.log('end')

    }
    $(' #checker ').on("click", function () {

        winChecker()


    })


})