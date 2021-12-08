document.addEventListener("DOMContentLoaded", function(event) { 

    var plus = document.querySelector(`#plus-${className}`)
    var minus = document.querySelector(`#minus-${className}`)
    var element = document.querySelector(`#expand-${className}`)

    
    if(element.style.display === "hidden"){
      element.style.display = "block"
      plus.style.display = "none"
      minus.style.display = "block"
    }else if(element.style.display === "block"){
      element.style.display = "none"
      plus.style.display = "block"
      minus.style.display = "none"
    }else{
      element.style.display = "block"
      plus.style.display = "none"
      minus.style.display = "block"
    }
})