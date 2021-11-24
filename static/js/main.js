/*
Called when create button is pressed in new page
*/
$(document).on("click", ".game-create", function ()
{
	//Collect datas to insert
	let datatitle = $("#input-title")[0].value;
	let datacost = $("#input-cost")[0].value;
	let datarating = $("#input-rating")[0].value;
	let datacategory = $("#input-category")[0].value;
	let datadesp = $("#input-desp")[0].value;

	//Check if title is entered
	if (datatitle == "")
	{
		alert("Title field must not be empty");
		return;
	}

	//Set cost to fixed values
	datacost = datacost ? parseFloat(datacost).toFixed(2) : "0.00";
	
	//Insert datas to database
	$.post("/game_insert", {title: datatitle, cost: datacost, rating: datarating, category: datacategory, desp: datadesp}, function(data, status)
	{
		//Insert complete, open to info page
		window.open("/info/" + data, "_self");
	});
});

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
	let datacategory = $("#input-category")[0].value;
	let datadesp = $("#input-desp")[0].value;
	
	//Check if title is entered
	if (datatitle == "")
	{
		alert("Title field must not be empty");
		return;
	}
	
	//Ensure cost has 2 decimal points
	datacost = datacost ? parseFloat(datacost).toFixed(2) : "0.00";
	$("#input-cost")[0].value = datacost;

	//Update datas to database
	$.post("/game_update", {id: dataid, title: datatitle, cost: datacost, rating: datarating, category: datacategory, desp: datadesp}, function(data, status)
	{
		//Update data attr for new value
		$(".game-main").parent().attr('data-title', datatitle);
		$(".game-main").parent().attr('data-cost', datacost);
		$(".game-main").parent().attr('data-rating', datarating);
		$(".game-main").parent().attr('data-category', datacategory);
		$(".game-main").parent().attr('data-desp', datadesp);
		
		//Set inputs read only
		$("input, select, textarea").removeClass("color-orange");
		$("input, textarea").attr("readonly", "");
		$("select").attr("disabled", "");

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
	})
	.fail(function(response)
	{
		//Display error html text
		$("html").html(response.responseText);
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
	$("#input-category").val($(".game-main").parent().attr('data-category'));
	$("#input-desp").val($(".game-main").parent().attr('data-desp'));

	//Set inputs read only
	$("input, select, textarea").removeClass("color-orange");
	$("input, textarea").attr("readonly", "");
	$("select").attr("disabled", "");

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
	$("input, select, textarea").addClass("color-orange");
	$("input, textarea").removeAttr("readonly");
	$("select").removeAttr("disabled");

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
    //Ask to confirm delete
	if (window.confirm("Are you sure you want to delete?"))
	{
		//"Ok" is pressed, delete game in database
		let dataid = $(".game-main").parent().attr('data-id');
		$.post("/game_delete", {id: dataid}, function(data, status)
		{
			//Delete complete, open home page
			window.open("/", "_self");
		})
		.fail(function(response)
		{
			//Display error html text
			$("html").html(response.responseText);
		});
	}
});

/*
Called when new category button is no longer focused to be typed in home page
*/
$(document).on("blur", "#categories-new", function ()
{
	//Get value entered
	let value = $("#categories-new")[0].value;

	//Clear value
	$("#categories-new").val("");

	//If nothing entered, dont create new category
	if (value == "")
	{
		return;
	}

	//Insert new category in database
	$.post("/category_insert", {name: value}, function(data, status)
	{
		//Add html underneath new category input for newly created category
		$('<p data-id="' + data + '" class="categories-filter border-curve color-blue"><span class="categories-text">' + value + '</span><span class="border-curve color-red categories-remove">X</span></p>').insertAfter("p[data-id='']");
	});
});

/*
Called when category button is pressed in home page
*/
$(document).on("click", ".categories-filter", function ()
{
	//Reset selected categories color back to blue
	$(".categories-filter").removeClass("color-orange");
	$(".categories-filter").addClass("color-blue");

	//Set selected category color to orange
	$(this).removeClass("color-blue");
	$(this).addClass("color-orange");

	//Get category id selected
	let id = $(this).attr("data-id");
	if (id == "")
	{
		//"None" is selected, re-display all games
		$("a[data-category]").removeAttr("hidden");
	}
	else
	{
		//Hide all games
		$("a[data-category]").attr("hidden", "");
		
		//Show all games which has selected category id
		$("a[data-category='" + id + "']").removeAttr("hidden");
	}
});

/*
Called when category remove button is pressed in home page
*/
$(document).on("click", ".categories-remove", function ()
{
    //Ask to confirm delete
	if (window.confirm("Are you sure you want to delete?"))
	{
		//"Ok" is pressed, delete game in database
		let dataid = $(this).parent().attr('data-id');
		$.post("/category_delete", {id: dataid}, function(data, status)
		{
			//Check if deleted category is also selected to filter games
			if ($("p[data-id='" + dataid + "']").hasClass("color-orange"))
			{
				//Set "none" as selected category
				$("a[data-category]").removeAttr("hidden");
				$(".categories-filter[data-id='']").removeClass("color-blue");
				$(".categories-filter[data-id='']").addClass("color-orange");
			}
			
			//Remove category from list
			$("p[data-id='" + dataid + "']").remove();
		})
		.fail(function(response)
		{
			//Display error html text
			$("html").html(response.responseText);
		});
	}
});