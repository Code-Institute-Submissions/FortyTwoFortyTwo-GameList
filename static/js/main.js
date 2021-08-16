/*
Called when edit button is pressed in info page
*/
$(document).on("click", ".game-edit", function ()
{
	//Allow input editable
	$("input, textarea").removeAttr("readonly");
	$("input, textarea").addClass("color-orange");
	
	//Change edit button to save
	$(".game-edit").text("Save");
	$(".game-edit").addClass("color-green");
	$(".game-edit").removeClass("color-orange");
	$(".game-edit").addClass("game-save");
	$(".game-edit").removeClass("game-edit");
});