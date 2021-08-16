/*
Called when edit button is pressed in info page
*/
$(document).on("click", ".game-edit", function ()
{
	//Allow input editable
	$("input, textarea").removeAttr("readonly");
	$("input, textarea").addClass("color-orange");
});