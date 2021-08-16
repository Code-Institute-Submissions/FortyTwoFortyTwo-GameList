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
		//Update data attr for new value
		$(".game-main").parent().attr('data-title', datatitle);
		$(".game-main").parent().attr('data-cost', datacost);
		$(".game-main").parent().attr('data-rating', datarating);
		$(".game-main").parent().attr('data-desp', datadesp);
		
		//Set inputs read only
		$("input, textarea").attr("readonly", "");
		$("input, textarea").removeClass("color-orange");
		
		//Change save button to edit
		$(".game-save").text("Edit");
		$(".game-save").addClass("color-orange");
		$(".game-save").removeClass("color-green");
		$(".game-save").addClass("game-edit");
		$(".game-save").removeClass("game-save");
		
		//Change cancel button to delete
		$(".game-cancel").text("Delete");
		$(".game-cancel").addClass("color-red");
		$(".game-cancel").removeClass("color-orange");
		$(".game-cancel").addClass("game-delete");
		$(".game-cancel").removeClass("game-cancel");
	});
});

/*
Called when cancel button is pressed in info page
*/
$(document).on("click", ".game-cancel", function ()
{
	//Set value back to what it was before from attr
	$("#input-title").val($(".game-main").parent().attr('data-title'));
	$("#input-cost").val($(".game-main").parent().attr('data-cost'));
	$("#input-rating").val($(".game-main").parent().attr('data-rating'));
	$("#input-desp").val($(".game-main").parent().attr('data-desp'));

	//Set inputs read only
	$("input, textarea").attr("readonly", "");
	$("input, textarea").removeClass("color-orange");

	//Change save button to edit
	$(".game-save").text("Edit");
	$(".game-save").addClass("color-orange");
	$(".game-save").removeClass("color-green");
	$(".game-save").addClass("game-edit");
	$(".game-save").removeClass("game-save");

	//Change cancel button to delete
	$(".game-cancel").text("Delete");
	$(".game-cancel").addClass("color-red");
	$(".game-cancel").removeClass("color-orange");
	$(".game-cancel").addClass("game-delete");
	$(".game-cancel").removeClass("game-cancel");
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
	
	//Change delete button to cancel
	$(".game-delete").text("Cancel");
	$(".game-delete").addClass("color-orange");
	$(".game-delete").removeClass("color-red");
	$(".game-delete").addClass("game-cancel");
	$(".game-delete").removeClass("game-delete");
});

/*
Called when delete button is pressed in info page
*/
$(document).on("click", ".game-delete", function ()
{
    //Ask for confirm
	if (window.confirm("Are you sure you want to delete?"))
	{
		//"Ok" is pressed, delete game in database
		let dataid = $(".game-main").parent().attr('data-id');
		$.post("/game_delete", {id: dataid}, function(data, status)
		{
			//Delete complete, open home page
			window.open("/", "_self");
		});
	}
});