$(document).ready(function() {

	var game_over = false;
	var current_player = 'x'
	var owin = ['o', 'o', 'o']
	var xwin = ['x', 'x', 'x']

	function getTarget(){
		if (current_player == 'x'){
			return xwin;
		}
		return owin;
	}

	function boardMaker(){
		var board =[]
		for (var i = 0; i < 3; i++){
			var row = ["", "", ""];
			board.push(row);
		}
		return board; 
	}
	function parseId(id){
		var array = id.split(' ').map(Number); 
		return array;
	}

	function divAppend(content, id) {
        if (content == "") {
            $('div.container').append('<div class="square" id="' + id + '"></div>');  
        }
        else{
            $('div.container').append('<div class="square" id="' + id + '">' + content + '</div>');
        }
    }   

    function addInfo(content){
    	$('div.info').html(content)
    }
	
	function clearBoard(){
		$('div.container').html('');
	}         

	function boardRender(board){
		for (var i = 0; i < 3; i++){
			for (var y = 0; y < 3; y++) {
				var id = i.toString() + ' ' + y.toString();
				divAppend(board[i][y], id)
			}
		}
	}

	function switchPlayer(){
		current_player == 'x' ? current_player = 'o' : current_player = 'x'
		addInfo('The current player is now: ' + current_player)
	}

	function checkWin(board){
		var target = getTarget();
		//console.log(rowWin(board))
		if (rowWin(board, target) || colWin(board, target) || diagWin(board, target)){
			addInfo('Player ' + current_player + ' won!')
			return deactivateBoard();
		}
		switchPlayer();
	}

	function checkStalemate(board){
		for (var i=0; i < 3; i++){
			var row = board[i]
			if (row.includes("")){
				return false;
			}
		}
		addInfo('Uh oh, stalemate');
		return deactivateBoard();
	}

	function rowWin(board, target){
		for (var i = 0; i < 3; i++){
			row = board[i];
			if (_.isEqual(row, target)){
				return true;		
		}
		return false;
	}}

	function colWin(board, target){

		for (var x = 0; x < 3; x++){
			column = [];
			for (var i = 0; i < 3; i++){
				column.push(board[i][x]);	
			}	
				if (_.isEqual(column, target)){
					return true;
				}			
		}
		return false;
	}
	function diagWin(board, target){
		diag1 = [board[0][0], board[1][1], board[2][2]];
		diag2 = [board[0][2], board[1][1], board[2][0]];
		var target = getTarget();
		console.log('target is ' + target);
		

		if ((_.isEqual(target, diag1)) || (_.isEqual(target, diag2))){
			return true;
		}
		return false;
	}

	function move(coordinates, player, board){
		if (validMove(coordinates, player, board)){
			board = addPiece(coordinates, player, board);
			checkWin(board);
			checkStalemate(board);
			clearBoard();
			boardRender(board);
		}
		else {addInfo('Invalid move, please try a different spot.')
	}}

	function validMove(coordinates, player, board){
		if (board[coordinates[0]][coordinates[1]] == "") {
			return true;
		}
		return false
	}

	function deactivateBoard(){
		$('div.container').off('click');
	}

	function addPiece(coordinates, player, board){
		player == 'x' ? board[coordinates[0]][coordinates[1]] = 'x' : board[coordinates[0]][coordinates[1]] = 'o';;
		return board;
	}

	$('div.container').on('click', 'div.square', function(){
		var id = event.target.id;
		move(parseId(id), current_player, board)
	});

	var board = boardMaker();

	boardRender(board);
	addInfo("Player one is up! You're X")
})