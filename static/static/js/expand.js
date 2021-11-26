document.addEventListener("DOMContentLoaded", function(event) { 
    const result = document.querySelectorAll('.expand-hidden');
    const expanded = document.querySelector('.expand');
    let expandState = false;
    expanded.addEventListener("click", expand);
    
    function expand(){
        if(!expandState){
        for (var i = 0; i < result.length; i++) {
            result[i].style.display = "block";
        }
        expanded.innerHTML = "View less"
        expandState = true
        }else{
        for (var i = 0; i < result.length; i++) {
            result[i].style.display = "none";
        }
        expanded.innerHTML = "View all"
        expandState = false
        }

    }
})