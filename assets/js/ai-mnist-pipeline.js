

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
  
    document.addEventListener ('mouseup', function(e){
      drawing = false
      
      
    })
  
    document.addEventListener ('mousemove', function(e){
      if (drawing){
        var rect = canvas.getBoundingClientRect();
        painted[painted.length - 1].push({x:e.clientX -rect.left , y: e.clientY - rect.top});
      }
      else{
          
      }
    })
  
  
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
        context.lineWidth = 10;
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
        console.log(base64Img)

        $.ajax({
            url: 'https://wenl9zk715.execute-api.ca-central-1.amazonaws.com/production/ai-mnist-pipeline-lambda',
            type: 'POST',
            data: base64Img,
            
            
            success: function(response) {
                //success stuff. data here is the response, not your original data
                document.getElementById("prediction").innerHTML=response.predicted_label;
            },
            error: function(error) {
                console.log(error)
            }
        });
    })
    
  


  
  
      
    