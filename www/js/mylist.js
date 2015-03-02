/*
	My List mobile application for iOS, Android and Web 2.0.
	Liran Cohen, 2014.

	contact info:
	gshirkan@gmail.com
	http://github.com/shirkan
*/

// Global variables
var numitems = ( localStorage.numitems ? localStorage.numitems : 0);
var colors = [(localStorage.colors0 ? localStorage.colors0 : "white"), (localStorage.colors1 ? localStorage.colors1 : "black")];

// Numeric value constants
const adMobBannerPct = .83;

//	Aliasing
const $body = $('body');
const $bodyDiv = $('#bodyDiv');
const $outerDiv = $('#outerDiv');
const $iosStatusBar = $('#iosStatusBar');
const $itemsCanvas = $('#itemsCanvas');
const $addItemButton = $('#addItemButton');
const $addItemDialog = $( "#addItemDialog" );
const $itemData = $('#itemData');
const $editDialog = $('#editDialog');
const $aboutButton = $('#aboutButton');
const $aboutDialog = $('#aboutDialog');

//	items canvas
function initList () {
	var list = LSlistGet();
	console.log("------------------------------list size is " + list.length + " and list is: " + list);
	list.forEach(function (id, i) {
		console.log("------------ID is: " + id)
		addItemToCanvas(JSON.parse(LSlistGetKey(LSlistGet(i))), id);
	});
}

function addItemToCanvas(val, id) {

	console.log("------------ID is: " + id + " AND VAL: " + val);

	var text = val.text;
	var isDone = val.isDone ? " style='text-decoration: line-through' ": "";

	$itemsCanvas.append("<div id=item" + id + isDone + ">" + text + "</div>");
	var e = document.getElementById(id);
	$('#item' + id).bind("touchstart", function (event) { 
		var style = event.target.style;
		var id = event.target.id.substring("item".length,event.target.id.length);
		var textDecoration = style.textDecoration;
		var item = JSON.parse(LSlistGetKey(id));
		if (textDecoration == "") {
			style.textDecoration = "line-through";
			item.isDone = true;
		} else {
			style.textDecoration = "";
			item.isDone = false;
		}
		LSlistUpdate(id, JSON.stringify(item));
	});
	$('#item' + id).bind("swiperight", function(item) {
		removeItemFromCanvas(item.target.id.substring("item".length,event.target.id.length));
	});
}

function removeItemFromCanvas (id) {
	$('#item' + id).remove();
	LSlistRemove(id);
}

//	Edit dialog invokation
function editDialog( id ) {
	$editDialog.dialog({
		dialogClass: "no-close",
		autoOpen: false,
		draggable: false,
		modal: true,
		width: "auto",
		"min-height": "inherit",
		title: "Edit item",
		buttons: [
			{
				text: "Delete",
				style: "float:right",
				width: "33%",
				click: function() {
					removeItem(id, key);
					closeEditDialog();
				}
			},
			{ 
				text: "Update",
				style: "float:right",
				width: "33%",
				click: function() {
					closeEditDialog()
				}
			},
				{
				text: "Cancel",
				style: "float:left",
				width: "33%",
				click: function() {
					closeEditDialog();
				}
			}
		]
	});
	$editDialog.dialog("open");

	// register Android back button
	document.addEventListener("backbutton", closeEditDialog, false);
}

function closeEditDialog() {
	$('#ItemEditDiv').remove();
	$editDialog.dialog("close")
	document.removeEventListener("backbutton", closeEditDialog, false);
}

//	About Dialog
function aboutDialog() {
	
	$aboutDialog.dialog("open");

	// register Android back button
	document.addEventListener("backbutton", closeAboutDialog, false);
}

function closeAboutDialog() {
	$aboutDialog.dialog("close")
	document.removeEventListener("backbutton", closeAboutDialog, false);
}

//	Application logic
$(document).ready( function () {

	// showMessage("alert", "welcome!", "welcoming", function (param) { console.log("returned " + param)}, ["ok" , "close"] );
	// showMessage("confirm", "welcome confirm!", "welcoming confirm", function (param) { console.log("confirm returned " + param)}, ["ok" , "close"] );	

	//	Disable statusbar on iOS
	if (!isiOS()) {
		$iosStatusBar.hide();
	}

	//	Items canvas
	var itemsHeight = (($(window).height() - $outerDiv.height()) * adMobBannerPct);
	console.log ("window height is " + $(window).height() + " outerdiv is " + $outerDiv.height() + " and items is " + itemsHeight);
    $itemsCanvas.height( itemsHeight + "px");
    $itemsCanvas.text();
	initList();

    //	About button
    $aboutButton.bind("mousedown touchstart", function() {
		$aboutButton.css({'color':colors[0], 'background-color':colors[1], 'border-color': colors[0]});
	});

    $aboutButton.bind("mouseup touchend", function() {
		$aboutButton.css({'color':colors[1], 'background-color':colors[0], 'border-color': colors[1]});
		console.log("about")
		aboutDialog();
		// register Android back button
		document.addEventListener("backbutton", closeAboutDialog, false);
		event.preventDefault();
	});

    //	About dialog
	$aboutDialog.dialog({
		dialogClass: "no-close",
		autoOpen: false,
		draggable: false,
		modal: true,
		title: "About",
		width: "auto",
		buttons: [
			{
				text: "Close",
				width: "100%",
				click: function() {
					closeAboutDialog();
				}
			}
		]
	});

    //	Add Item button logic
    $addItemButton.bind("mousedown touchstart", function() {
		$addItemButton.css({'color':colors[0], 'background-color':colors[1], 'border-color': colors[0]});
	});
	
	$addItemButton.bind("mouseup touchend", function() {
		$addItemButton.css({'color':colors[1], 'background-color':colors[0], 'border-color': colors[1]});

		$addItemDialog.dialog("open");
		// register Android back button
		document.addEventListener("backbutton", closeDialog, false);
		event.preventDefault();
	});

    // Dialog creation
    $addItemDialog.dialog({
		dialogClass: "no-close",
		autoOpen: false,
		draggable: false,
		modal: true,
		title: "New item",
		width: "auto",
		buttons: [
			{
				text: "Cancel",
				style: "float:right",
				click: function() {
					closeDialog();
				}
			},
			{
				text: "Add",
				style: "float:left",
				click: function() {

					var val = {"text": $itemData.val(), "isDone" : false };
					var id = Date.now();
					LSlistAdd(id, JSON.stringify(val));
					addItemToCanvas(val, id);
					closeDialog();	
				}
			}
		]
	});

	function closeDialog() {
		clearForm();
		$addItemDialog.dialog("close");
		document.removeEventListener("backbutton", closeDialog, false);
	}

	//	Dialog handling
    function clearForm() {
    	$itemData.val("");
    }

	//	Add Item dialog initalization
	$addItemDialog.hide();
});
