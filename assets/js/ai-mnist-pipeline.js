var canvas = document.getElementById('blackboard');
var context = canvas.getContext('2d');

canvas.width = 350;
canvas.height = 350;
context.fillStyle = "blacks";
context.fillRect(0, 0, canvas.width, canvas.height);

var drawing = false;
var painted = [];

document.addEventListener ('mousedown', function(e){
  painted.push([]);
  context.beginPath();
  drawing = true;
})

canvas.addEventListener ('touchstart', function(e){
    painted.push([]);
    context.beginPath();
    drawing = true;
  })

canvas.addEventListener ('touchend', function(e){
    drawing = false;
})

document.addEventListener ('mouseup', function(e){
  drawing = false
})

canvas.addEventListener ('mousemove', function(e){
    e.preventDefault();
    e.stopPropagation();
  if (drawing){
    var rect = canvas.getBoundingClientRect();
    painted[painted.length - 1].push({x:e.clientX -rect.left, y: e.clientY - rect.top});
  }
  
})
canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (drawing){
        console.log(e.touches[0].clientY)
        var rect = canvas.getBoundingClientRect();
        painted[painted.length - 1].push({x:e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top});
    }
  });


var draw = function () {
  if(drawing){
    for (var li in painted){
      var line = painted[li];
      
      
      for (var pi in line){
        if (pi == 0){
          context.moveTo(line[0].x, line[0].y);
        }else{
          context.lineTo(line[pi].x, line[pi].y);
        }
      }
      
      context.strokeStyle = '#fff';
      context.lineWidth = 20;
      context.stroke();
      
    }
    
  }
}

var clear = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    painted = []
}

var loop = function () {
  draw();
  window.requestAnimationFrame(loop)
}

loop()

$("#blackboard-reset").on('click', function(){
    clear();
})

$("#blackboard-predict").on('click', function(){
    var pngUrl = canvas.toDataURL(); 
    base64Img = pngUrl.replace("data:image/png;base64,", "");

    $.ajax({
        url: 'https://wenl9zk715.execute-api.ca-central-1.amazonaws.com/production/ai-mnist-pipeline-lambda',
        type: 'POST',
        data: base64Img,
        success: function(response) {
            document.getElementById("prediction").innerHTML=response.predicted_label;
        },
        error: function(error) {
            console.log(error)
        }
    });
})






  
