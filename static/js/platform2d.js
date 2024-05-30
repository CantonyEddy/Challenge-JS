window.onload = function(){
    const canvasWidth = 900;
    const canvasHeight = 600;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    let player1;
    let delay;
    let timeout;
    keys = [];
    let gravity = 0.8;
    let max_gravity = 20;
    let friction = 0.8;
    let max_friction = 8;
    let velX = 0;
    let velY = 0;
    let boxes = [];
    let level = 0;
    let position_checkpoint = [0, 0];

    let map =  [[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ,4 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1]],
                [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                [1, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 4 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 3, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ,1 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1]],
                [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ,0 ,6],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0 ,0 ,5],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4 ,0 ,6],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0 ,0 ,5],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0 ,0 ,1],
                [1, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,6],
                [1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1]],
                [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1],
                [1, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1],
                [1, 1, 0, 0, 0, 0, 1, 6, 0, 0, 1, 0, 1, 0, 0, 1 ,4 ,1],
                [1, 0, 5, 5, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0 ,1 ,1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 6, 1, 0, 0, 1, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 0, 0, 0, 1 ,0 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0 ,0 ,1],
                [1, 0, 0, 0, 2, 2, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0 ,0 ,1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1]]
                ]

    function load_level(n){
        boxes = [];
        for (var i = 0; i < map[n].length; i++){
            for (var j = 0; j < map[n][i].length; j++){
                switch (map[n][i][j]){
                    case 1:
                        boxes.push({
                            forme: "rect",
                            x: j*50,
                            y: i*50+50,
                            width: 50,
                            height: 50,
                            color: '#655643'
                        });
                        break;
                    case 2:
                        boxes.push({
                            forme: "rect",
                            x: j*50,
                            y: i*50+50,
                            width: 50,
                            height: 45,
                            color: '#DF2714'
                        });
                        break;
                    case 3:
                        position_checkpoint = [j*50, i*50+50];
                        break;
                    case 4:
                        boxes.push({
                            forme: "rect",
                            x: j*50,
                            y: i*50+50,
                            width: 50,
                            height: 45,
                            color: '#5865F2'
                        });
                        break;
                    case 5:
                        boxes.push({
                            forme: "triangle",
                            x1: j*50,
                            y1: i*50+50,
                            x2: j*50 + 50,
                            y2: i*50+50,
                            x3: j*50 + 25,
                            y3: i*50,
                            color: '#DF2714'
                        });
                        break;
                    case 6:
                        boxes.push({
                            forme: "triangle",
                            x1: j*50,
                            y1: i*50,
                            x2: j*50 + 50,
                            y2: i*50,
                            x3: j*50 + 25,
                            y3: i*50+50,
                            color: '#DF2714'
                        });
                        break;
                }
            }
        }
    }

    init();

    function init(){
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "30px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        load_level(level);
        player1 = new player([position_checkpoint[0], position_checkpoint[1]])
        clearTimeout(timeout);
        delay = 16;
        game();
    }

    function game(){
        if (keys[38] || keys[32] || keys[87]) {
            if (player1.jump){
                velY = -15;
                player1.jump = false;
            }
            if (player1.wallJumpLeft && (keys[39] || keys[68])){
                velY = -10;
                velX = 8;
                player1.wallJumpLeft = false;
            }
            if (player1.wallJumpRight && (keys[37] || keys[65])){
                velY = -10;
                velX = -8;
                player1.wallJumpRight = false;
            }
        }
        if (keys[39] || keys[68]) {
            if (velX < 0){
                //velX = 0;
            }
            velX += friction;
        }else if (velX > 0){
            velX *= friction;
            if (velX < 0.1){
                velX = 0;
            }
        }
        if (keys[37] || keys[65]) {
            if (velX > 0){
                //velX = 0;
            }
            velX -= friction;
        }else if (velX < 0){
            velX *= friction;
            if (velX > -0.1){
                velX = 0;
            }
        }
        velY += gravity;
        if (player1.y >= 600) {
            if (player1.y > 600) {
                player1.y = 600
            }
            if (velY > 0){
                velY = 0;
            }
            player1.jump = true;
        }
        if (velY > 0) {
            if (player1.colision_bottom()){
                velY = 0;
                i = 0;
                player1.jump = true;
                while (player1.colision_bottom()){
                    var left_colision = ctx.getImageData(player1.x, player1.y-20, 1, 1);
                    var pixelData = left_colision.data;
                    var rouge = pixelData[0];
                    var vert = pixelData[1];
                    var bleu = pixelData[2];
                    var couleurHexadecimalLeft = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    var right_colision = ctx.getImageData(player1.x+50, player1.y-20, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalRight = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    right_colision = ctx.getImageData(player1.x, player1.y+1, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalBottom = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    right_colision = ctx.getImageData(player1.x+50, player1.y+1, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalBottomR = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    if (couleurHexadecimalLeft === '#655643' || couleurHexadecimalRight === '#655643'){                     
                        if (couleurHexadecimalBottom === '#000000' || couleurHexadecimalBottomR === '#000000'){
                            player1.jump = false;
                            break;
                        }
                    }
                    player1.y -= 0.1;
                    i++;
                    if (i >= 200){
                        break;
                    }
                }
            }else{
                player1.jump = false;
            }
        }
        if (velY < 0){
            if (player1.colision_top()){
                var left_colision = ctx.getImageData(player1.x, player1.y, 1, 1);
                var pixelData = left_colision.data;
                var rouge = pixelData[0];
                var vert = pixelData[1];
                var bleu = pixelData[2];
                var couleurHexadecimalLeft = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                var right_colision = ctx.getImageData(player1.x+50, player1.y, 1, 1);
                pixelData = right_colision.data;
                rouge = pixelData[0];
                vert = pixelData[1];
                bleu = pixelData[2];
                var couleurHexadecimalRight = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimalLeft != '#655643' && couleurHexadecimalRight != '#655643'){                        
                    velY = 0;
                }
                i = 0;
                while (player1.colision_top()){
                    var left_colision = ctx.getImageData(player1.x, player1.y, 1, 1);
                    var pixelData = left_colision.data;
                    var rouge = pixelData[0];
                    var vert = pixelData[1];
                    var bleu = pixelData[2];
                    var couleurHexadecimalLeft = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    var right_colision = ctx.getImageData(player1.x+50, player1.y, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalRight = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    right_colision = ctx.getImageData(player1.x, player1.y-51, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalBottom = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    right_colision = ctx.getImageData(player1.x+50, player1.y-51, 1, 1);
                    pixelData = right_colision.data;
                    rouge = pixelData[0];
                    vert = pixelData[1];
                    bleu = pixelData[2];
                    var couleurHexadecimalBottomR = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    if (couleurHexadecimalLeft === '#655643' || couleurHexadecimalRight === '#655643'){                        
                        if (couleurHexadecimalBottom === '#000000' || couleurHexadecimalBottomR === '#000000'){
                            break;
                        }
                    }
                    player1.y += 0.1;
                    i++;
                    if (i >= 150){
                        break;
                    }
                }
            }
        }

        //check collision to walljump
        var left_colision = ctx.getImageData(player1.x-1, player1.y-20, 1, 1);
        var pixelData = left_colision.data;
        var rouge = pixelData[0];
        var vert = pixelData[1];
        var bleu = pixelData[2];
        var couleurHexadecimalLeft = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
        var right_colision = ctx.getImageData(player1.x+51, player1.y-20, 1, 1);
        pixelData = right_colision.data;
        rouge = pixelData[0];
        vert = pixelData[1];
        bleu = pixelData[2];
        var couleurHexadecimalRight = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
        if (couleurHexadecimalLeft === '#655643'){
            player1.wallJumpLeft = true;
        }else{
            player1.wallJumpLeft = false;
        }
        if (couleurHexadecimalRight === '#655643'){
            player1.wallJumpRight = true;
        }else{
            player1.wallJumpRight = false;
        }

        ///////////////////////////////////////
        //check lava collision

        if (player1.colision_lava()){
            console.log("ouille ça fait mal");
            player1.x = position_checkpoint[0];
            player1.y = position_checkpoint[1];
            velX = 0;
            velY = 0;
        }

        //next level collision

        if (player1.colision_next_level()){
            level ++;
            load_level(level);
            player1.x = position_checkpoint[0];
            player1.y = position_checkpoint[1];
            velX = 0;
            velY = 0;
        }

        if (velX > max_friction){
            velX = max_friction;
        }
        if (velX < -max_friction){
            velX = -max_friction;
        }
        if (velY > max_gravity){
            velY = max_gravity;
        }
        if (velX < 0){
            if (player1.colision_left()){
                velX = 0;
                while (player1.colision_left()){
                    player1.x += 0.1;
                }
            }
        }
        if (velX > 0){
            if (player1.colision_right()){
                velX = 0;
                while (player1.colision_right()){
                    player1.x -= 0.1;
                }
            }
        }
        player1.y += velY;
        player1.x += velX;
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        player1.draw();
        for (var i = 0; i < boxes.length; i++){
            ctx.fillStyle = boxes[i].color;
            if(boxes[i].forme === "rect"){
                drawBlock(ctx, [boxes[i].x, boxes[i].y], boxes[i].width, boxes[i].height);
            }else{
                drawTriangle(ctx, [boxes[i].x1, boxes[i].y1,boxes[i].x2, boxes[i].y2,boxes[i].x3, boxes[i].y3])
            }
        }
        timeout = setTimeout(game, delay);
      }

    function drawBlock(ctx, position, width, height){
        const x = position[0];
        const y = position[1] - height; // ajustez la position y pour que les blocs soient dessinés vers le haut
        ctx.fillRect(x, y, width, height);
    }

    function drawTriangle(ctx, position){
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(position[0], position[1]);
        ctx.lineTo(position[2], position[3]);
        ctx.lineTo(position[4], position[5]);
        ctx.closePath();
        ctx.fill();
    }

    function decimaleEnHexadecimal(decimale) {
        var hex = decimale.toString(16);
        return hex.length == 1 ? "0" + hex : hex; // Ajoute un zéro devant si nécessaire
    }

    function player(co){
        this.x = co[0];
        this.y = co[1];
        this.jump = true;
        this.wallJumpRight = false;
        this.wallJumpLeft = false;
        this.draw = function(){
           ctx.fillStyle = "#000";
           drawBlock(ctx, [this.x, this.y], 50, 50);
         };
        this.left = function(){
            console.log("left");
            this.x -= 5;
        };
        this.right = function(){
            console.log("right");
            this.x += 5;
        };
        this.colision_left = function(){
            var left_colision = ctx.getImageData(this.x-1, this.y-50, 1, 50);
            var pixelData = left_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#655643'){
                    return true;
                }
            }
        }
        this.colision_right = function(){
            var left_colision = ctx.getImageData(this.x+50, this.y-50, 1, 50);
            var pixelData = left_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#655643'){
                    return true;
                }
            }
        }
        this.colision_bottom = function(){
            var left_colision = ctx.getImageData(this.x, this.y, 50, 1);
            var pixelData = left_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#655643'){
                    return true;
                }
            }
        }
        this.colision_top = function(){
            var left_colision = ctx.getImageData(this.x, this.y-50, 50, 1);
            var pixelData = left_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#655643'){
                    return true;
                }
            }
        }
        this.colision_lava = function(){
            var lava_colision = ctx.getImageData(this.x, this.y-50, 50, 50);
            var pixelData = lava_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#df2714'){
                    return true;
                }
            }
        }
        this.colision_next_level = function(){
            var lava_colision = ctx.getImageData(this.x, this.y-50, 50, 50);
            var pixelData = lava_colision.data;

            for (var i = 0; i < pixelData.length; i += 4) {
                var rouge = pixelData[i];
                var vert = pixelData[i + 1];
                var bleu = pixelData[i + 2];
                var couleurHexadecimal = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                if (couleurHexadecimal === '#5865f2'){
                    return true;
                }
            }
        }
    }

    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });
}