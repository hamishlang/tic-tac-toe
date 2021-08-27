$(document).ready(function () {
    $('.resetConfirmation').hide()
    $('.backdrop').hide()

    $('#edit').on('click', function () {
        $('.backdrop').fadeIn(200)

    })
    $('.x').on('click', function () {
        $('.backdrop').fadeOut(200)
    })

    $('.popup').parent('.backdrop').not('.popup').on('click', function (e) {

        if ($('.backdrop').is(e.target)) {
            $('.backdrop').fadeOut(200)
            console.log(e.target)
        }
    })

    let rowsNum = $('#rows').val()
    let th = ''
    let tr = ''
    let player1count = 0
    let player2count = 0
    let player1name = 'Player 1'
    let player2name = 'Player 2'

    function winner(player) {
        $(' th ').addClass('no')
        $(' th ').unbind()
        if (player == 1) {
            player1count += 1
            $(`#player1count`).html(player1count)
            $(`#winner`).html(player1name)
        } else if (player == 2) {
            player2count += 1
            $(`#player2count`).html(player2count)
            $(`#winner`).html(player2name)
        }
        confetti({
            particleCount: 500,
            spread: 90,
            origin: {
                y: 0.6
            }
        })
        $(`.winnertext`).fadeIn(400)

        function winnerfade() {
            $(`.winnertext`).fadeOut(200)

        }
        setTimeout(gameStarter, 2000)
        setTimeout(winnerfade, 2000)

    }
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

    function playerName() {
        player1name = $('#player1nameGet').val()
        player2name = $('#player2nameGet').val()
        $('#player1name').html(player1name)
        $('#player2name').html(player2name)
        console.log(player1name)
        $('.backdrop').fadeOut(200)

    }

    $('#playerNameSelection').submit(function () {
        playerName()
        return false
    })

    $('#reseths').on('click', function () {
        player1count = 0
        player2count = 0
        $(`#player1count`).html(player1count)
        $(`#player2count`).html(player2count)
        $('.resetConfirmation').fadeIn(400).delay(400).fadeOut(500)
    })
    let xOrO = 'X'
    let ghostLetter = () => {
        $(' th ').hover(
            function () {
                let thisCell = ($(this).html())
                if (thisCell === '&nbsp;') {
                    $(this).html(`<span class="ghost">${xOrO}</span>`)
                }
            },
            function () {
                if ($(this).hasClass('selected')) {
                    return
                } else {
                    $(this).html(`&nbsp;`)
                }
            }
        )
    }

    let playerTurn = (player) => {
        if (player == 1) {
            $('.p1section').addClass('turn')
            $('.p2section').removeClass('turn')
        } else if (player == 2) {
            $('.p2section').addClass('turn')
            $('.p1section').removeClass('turn')
        }
    }
    playerTurn(1)

    let click = () => {
        $(' th ').on("click", function () {
            let classMark = (point, letter) => {
                newMatrix[thisRow][thisCol] = point
                $(this).html(`<span class="mark">${xOrO}</span>`)
                $(this).addClass(`selected`)
                xOrO = letter
            }
            let thisCol = $(this).attr('col')
            let thisRow = $(this).attr('row');
            if (newMatrix[thisRow][thisCol] === 2 || newMatrix[thisRow][thisCol] === 3) {
                console.log('taken')
            } else if (xOrO === 'X') {
                classMark(2, 'O')
                playerTurn(2)
            } else if (xOrO === 'O') {
                classMark(3, 'X')
                playerTurn(1)
            }
            winChecker()
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
        click()
    }
    gameStarter()
    let x = 2
    let count = 0
    let winChecker = () => {
        let winCount = rowsNum

        let winCheckHor = 0
        let winCheckVer = 0
        let winCheckSE = 0
        let winCheckNE = 0

        for (let j = 0; j < newMatrix.length; j++) {

            // function for color change horizontel 
            let horWin = (player) => {

                for (let ix = 0; ix < newMatrix[j].length; ix++) {
                    $(`#${j}-${ix}`).addClass('green')
                }
                winner(player)
                console.log(`player ${player} wins!`)
            }

            let vertWin = (player) => {
                for (let i2x = 0; i2x < rowsNum; i2x++) {
                    $(`#${i2x}-${j}`).addClass('green')
                }
                winner(player)
            }
            let southEWin = (player) => {

                for (let i2x = 0; i2x < rowsNum; i2x++) {
                    $(`#${i2x}-${i2x}`).addClass('green')
                }
                winner(player)
            }

            let northEWin = (player) => {
                let northEast2 = rowsNum - 1
                for (let i2x = 0; i2x < rowsNum; i2x++) {
                    $(`#${northEast2 - i2x}-${i2x}`).addClass('green')
                }
                winner(player)
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
                    if (winCheckNE == winCount * 10) {
                        northEWin(2)
                    }
                }
            }
            if (winCheckHor == winCount || winCheckVer == winCount || winCheckSE == winCount || winCheckNE == winCount) {
                // console.log('player 1 wins')
            } else if (winCheckHor === (winCount) * 10 || winCheckVer === (winCount) * 10 || winCheckSE === (winCount) * 10 || winCheckNE == (winCount) * 10) {}

            winCheckHor = 0
            winCheckVer = 0
            winCheckSE = 0
            winCheckNE = 0
        }
    }
})