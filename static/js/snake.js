window.onload = function(){
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30; // en pixels
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    const widthInBlocks = canvasWidth/blockSize; 
    const heightInBlocks = canvasHeight/blockSize;
    const centreX = canvasWidth / 2;
    const centreY = canvasHeight / 2;
    let delay; // en millisecondes
    let snakee;
    let applee;
    let score;
    let timeout;

    init();

    function init(){
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        start();
    }

    function start(){
        score = 0;
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
        snakee.draw();
        applee = new Apple([10, 10]);
        applee.draw();
        score = 0;
        clearTimeout(timeout);
        delay = 100;
        game();
    }

    function game(){
      snakee.advance();
      if (snakee.checkCollision()){
        gameOver();
      }
      else {
        if (snakee.eatApple()){
          applee.newPosition();
          score++;
          snakee.ateApple = true;
        }
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snakee.draw();
        applee.draw();
        timeout = setTimeout(game, delay);
      }
    }

    function gameOver(){
      console.log("game over");
      ctx.save();
      ctx.font = "bold 70px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "white";
      ctx.lineWidth = "5";
      ctx.strokeText("Game Over", centreX, centreY - 180);
      ctx.fillText("Game Over", centreX, centreY - 180);
      ctx.font = "bold 30px sans-serif";
      ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
      ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
      ctx.restore();
    }

    function drawBlock(ctx, position){
        const x = position[0] * blockSize;
        const y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction){
         this.body = body;
         this.direction = direction;
         this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let i = 0; i < this.body.length;i++){
              drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
          };
          this.advance = function(){
            const nextPosition = this.body[0].slice();
            switch(this.direction){
              case "left":
                nextPosition[0] -= 1;
                break;
              case "right":
                nextPosition[0] += 1;
                break;
              case "down":
                nextPosition[1] += 1;
                break;
              case "up":
                nextPosition[1] -= 1;
                break;
              default:
                throw("Invalid direction");
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple)
              this.body.pop();
            else
              this.ateApple = false;
          };
          this.setDirection = function(newDirection){
            let validDirection;
            switch(this.direction){
              case "left":
              case "right":
                validDirection = ["up", "down"];
                break;
              case "down":
              case "up":
                validDirection = ["left", "right"];
                break;
              default:
                throw("Invalid direction");
            }
            if(validDirection.indexOf(newDirection) > -1){
              this.direction = newDirection;
            }
          };
          this.checkCollision = function(){
            let collision = false;
            const head = this.body[0];
            const rest = this.body.slice(1);
            const minX = 0;
            const minY = 0;
            const maxX = widthInBlocks-1;
            const maxY = heightInBlocks-1;
            if (head[0] < minX || head[0] > maxX || head[1] < minY || head[1] > maxY){
              collision = true;
            }
            for(let i = 0;i < rest.length;i++){
              if (head[0] == rest[i][0] && head[1] == rest[i][1]){
                collision = true;
              }
            }
            console.log(collision);
            return collision;
          };
          this.eatApple = function(){
            const head = this.body[0];
            if (head[0] == applee.position[0] && head[1] == applee.position[1]){
              return true;
            }
            return false;
          }
    }

    function Apple(position){
        this.position = position;
        this.draw = function(){
            const radius = blockSize / 2;
            const x = this.position[0] * blockSize + radius;
            const y = this.position[1] * blockSize + radius;
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
          };
          this.newPosition = function(){
            const X = Math.round(Math.random() * (widthInBlocks - 1));
            const Y = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [X,Y];
          };
    }

    const map = {}; // Vous pourriez aussi utiliser un tableau
    onkeydown = onkeyup = function(e){
        e = e || event; // pour gérer IE
        map[e.keyCode] = e.type == 'keydown';
        let newDirection;
        console.log(map);
        if(map[37]){
            newDirection = "left";
        } else if(map[38]){
            newDirection = "up";
        } else if(map[39]){
            newDirection = "right";
        } else if(map[40]){
            newDirection = "down";
        } else if(map[32]){
            start();
        }
        snakee.setDirection(newDirection);
    }
}