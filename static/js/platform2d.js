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
    let boxes = []

    boxes.push({
        x: 340,
        y: 600,
        width: 200,
        height: 100,
        color: '#655643'
    });
    boxes.push({
        x: 540,
        y: 440,
        width: 200,
        height: 400,
        color: '#655643'
    });
    boxes.push({
        x: 740,
        y: 600,
        width: 200,
        height: 100,
        color: '#655643'
    });
    boxes.push({
        x: 500,
        y: 180,
        width: 280,
        height: 80,
        color: '#655643'
    });

    init();

    function init(){
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        player1 = new player([50, 50])
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
        }
        if (keys[39] || keys[68]) {
            if (velX < 0){
                velX = 0;
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
                velX = 0;
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
                    var left_colision = ctx.getImageData(player1.x, player1.y-50, 1, 1);
                    var pixelData = left_colision.data;
                    var rouge = pixelData[0];
                    var vert = pixelData[1];
                    var bleu = pixelData[2];
                    var couleurHexadecimalLeft = "#" + decimaleEnHexadecimal(rouge) + decimaleEnHexadecimal(vert) + decimaleEnHexadecimal(bleu);
                    var right_colision = ctx.getImageData(player1.x+50, player1.y-50, 1, 1);
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
                    if (couleurHexadecimalLeft === '#655643' || couleurHexadecimalRight === '#655643'){                        
                            break;
                    }
                    player1.y += 0.1;
                    i++;
                    if (i >= 150){
                        break;
                    }
                }
            }
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
            drawBlock(ctx, [boxes[i].x, boxes[i].y], boxes[i].width, boxes[i].height);
        }
        timeout = setTimeout(game, delay);
      }

    function drawBlock(ctx, position, width, height){
        const x = position[0];
        const y = position[1] - height; // ajustez la position y pour que les blocs soient dessinés vers le haut
        ctx.fillRect(x, y, width, height);
    }

    function decimaleEnHexadecimal(decimale) {
        var hex = decimale.toString(16);
        return hex.length == 1 ? "0" + hex : hex; // Ajoute un zéro devant si nécessaire
    }

    function player(co){
        this.x = co[0];
        this.y = co[1];
        this.jump = true;
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
            var left_colision = ctx.getImageData(this.x, this.y-50, 1, 50);
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
    }

    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });
}