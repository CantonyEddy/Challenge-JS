window.onload = function(){
    const canvasWidth = 900;
    const canvasHeight = 600;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    let blockSize; // définissez la taille des blocs
    let liste;
    let widthBlock;
    let delay = 100;
    let timeout;

    init();

    function init(){
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "5px solid gray";
        canvas.style.margin = "10px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#000";
        document.body.appendChild(canvas);
        start();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createListFrom1ToN(n) {
        const list = [];
        for (let i = 1; i <= n; i++) {
          list.push(i);
        }
        return list;
      }

    function start(){
        liste = createListFrom1ToN(100);
        liste = shuffle(liste);
        console.log(liste);
        widthBlock = canvasWidth/liste.length;
        blockSize = canvasHeight/liste.length;
        clearTimeout(timeout);
        bubbleSortRecursive(liste, liste.length)
    }

    function bubbleSortRecursive(arr, n) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // efface le canvas à chaque itération
        for (let i = 0; i < arr.length; i++) {
            ctx.fillStyle = "#fff";
            drawBlock(ctx, [i * widthBlock, canvasHeight], widthBlock, blockSize * arr[i]);
        }

        if (n === 1) {
          return arr;
        }
      
        setTimeout(function() {
            bubbleSortRecursive(arr, n - 1);
        }, delay);
        
        for (let i = 0; i < n - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            const temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
          }
        }
      }

      function drawBlock(ctx, position, width, height){
        const x = position[0];
        const y = position[1] - height; // ajustez la position y pour que les blocs soient dessinés vers le haut
        ctx.fillRect(x, y, width, height);
    }
}
