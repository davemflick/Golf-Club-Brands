const instructions = document.getElementsByClassName("inst");

console.log(instructions)

let slideIn = 0;
function instructionSlide(){
	let inLen = instructions.length
	for(let i=0; i< inLen; i++){
		instructions[i].style.display = "none"
	}
	slideIn++;
	if(slideIn > inLen){
		slideIn = 1;
	}
	instructions[slideIn-1].style.display = "block";
	setTimeout(instructionSlide, 2700)
}

instructionSlide();




$(document).ready(function(){

	$('.help').click(function(){
		$('.ui.modal').modal('show');
	})	
})







