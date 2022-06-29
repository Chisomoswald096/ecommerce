function insert(char){
    let initialValue = $("input").val();
    $("input").val(initialValue + char);
}
$("#evaluate").on("click", function(){
    //Get current value inside the calculator screen e.g 8*2+5-1
    let currentValue = $("input").val();
    //evaluate the arithemetic inside the calculator screen e.g 22
    let evaluatedValue = eval(currentValue);
    //display the evaluated value in the calculator screen
    $("input").val(evaluatedValue);
})
$("#deleteAll").on("click", function(){
    $("input").val("");
})

$("#delete").on("click", function(){
    let currentValue = $("input").val();
    let splitValue = currentValue.split("");
    splitValue.pop();
    let finalValue = splitValue.join("");
    $("input").val(finalValue);
})