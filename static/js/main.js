/*
Called when save button is pressed in info page
*/
$(document).on("click", ".game-save", function ()
{
	//Collect datas to update
	let dataid = $(".game-main").parent().attr('data-id');
	let datatitle = $("#input-title")[0].value;
	let datacost = $("#input-cost")[0].value;
	let datarating = $("#input-rating")[0].value;
	let datadesp = $("#input-desp")[0].value;
	
	//Update datas to database
	$.post("/game_update", {id: dataid, title: datatitle, cost: datacost, rating: datarating, desp: datadesp}, function(data, status)
	{
		//Set inputs read only
		$("input, textarea").attr("readonly", "");
		$("input, textarea").removeClass("color-orange");
		
		//Change save button to edit
		$(".game-save").text("Edit");
		$(".game-save").addClass("color-orange");
		$(".game-save").removeClass("color-green");
		$(".game-save").addClass("game-edit");
		$(".game-save").removeClass("game-save");
	});
});

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

/*
Called when delete button is pressed in info page
*/
$(document).on("click", ".game-delete", function ()
{
    //Delete game in database
	let dataid = $(".game-main").parent().attr('data-id');
	$.post("/game_delete", {id: dataid}, function(data, status)
	{
		//Delete complete, open home page
		window.open("/", "_self");
	});
});