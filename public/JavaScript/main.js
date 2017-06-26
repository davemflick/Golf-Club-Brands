const instructions = document.getElementsByClassName("inst");

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
//Only run instructionsSlide on home page
if(window.location.pathname == "/"){
	instructionSlide();
}


//Pop up the help modal
$(document).ready(function(){
	$('.help').click(function(){
		$('.ui.modal').modal('show');
	})	
})







