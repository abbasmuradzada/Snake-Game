$(document).ready(function(){
	var canvas = $("#myCanvas")[0];
	var ctx = canvas.getContext("2d");
	var width = $("#myCanvas").width();
	var height = $("#myCanvas").height();
	var cw = 10;
	var direction;
	var food;
	var score;
	
	var snake_array;
	
	function startGame()
	{
		direction = "right"; 
		create_snake();
		create_food(); 
		score = 0;
		
        if(typeof game_loop != "undefined") {clearInterval(game_loop)};
		game_loop = setInterval(paint, 100);
	}
	startGame();
	
	function create_snake()
	{
		var length = 5;
		snake_array = [];
		for(var i = length-1; i>=0; i--){
			snake_array.push({x: i, y:0});
		}
	}
	
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(width-cw)/cw), 
			y: Math.round(Math.random()*(height-cw)/cw), 
		};
	}
	
	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        
		if(direction == "right") {nx++}
		else if(direction == "left") {nx--}
		else if(direction == "up") {ny--}
		else if(direction == "down") {ny++}

        if(nx == -1 || nx == width/cw || ny == -1 || ny == height/cw || check_collision(nx, ny, snake_array)){
            startGame();
            console.log("game over");
			return;
		}
		
		if(nx == food.x && ny == food.y){
			var tail = {x: nx, y: ny};
			score++;
       
            create_food();
		}else{
			var tail = snake_array.pop();
            tail.x = nx; tail.y = ny;
		}
		
		snake_array.unshift(tail);
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			paint_cell(c.x, c.y, "#4e4e4e");
		}
		 
		paint_cell(food.x, food.y, "red");
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 205, height-5);
	}
	
	function paint_cell(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	$(document).keydown(function(e){
		if(e.which == "37" && direction != "right"){
            direction = "left"
        }else if(e.which == "38" && direction != "down"){
            direction = "up"
        }else if(e.which == "39" && direction != "left"){
            direction = "right"
        }else if(e.which == "40" && direction != "up"){
            direction = "down"
        }
	})		
})