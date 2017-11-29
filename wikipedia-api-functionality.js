
var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var cb = '&callback=JSON_CALLBACK';
var page = 'https://en.wikipedia.org/?curid=';

$(document).ready(function(){
//OnClicks
	$("form").click(function() {
		if($("form").hasClass("open") == false){
		$("form").addClass("open");
		$("form").removeClass("closed");
		$("#word").focus();
	}
	});

	$("#close-button").click(function() {
		$("#inf").removeClass("hide");
		$("li").remove();
		$("form").removeClass("open");
		$("form").addClass("closed");
		$("#word").val("");

		if($("#main-box").hasClass("submitted")){
			$("#main-box").removeClass("submitted");
			$("#main-box").addClass("not-submitted");
		}

		if (!e) var e = window.event;
    	 e.cancelBubble = true;
   		 if (e.stopPropagation) e.stopPropagation();
	});

	$("#wiki-input").submit(function(event) {
		$("li").remove();
		$("#inf").addClass("hide");
		if(($("#word").val().trim()).length != 0){
  			$("#main-box").removeClass("not-submitted");
			$("#main-box").addClass("submitted");
			var title = $("#word").val();
			var urlString = api + title + cb;
			$.ajax({
			    url: urlString, 
			    dataType:"jsonp",
			    success: function (result) {
			    	var results = result.query.pages;
			    	$.each(results,function(i,element){
			    		var id ="#"+i;
			    		$('<h1/>').text(element.page).appendTo("body");
			    		$('<li/>').attr("id",i).appendTo('ul');
			    		$('<a/>').attr("href",page+element.pageid).attr("id",i+"a").appendTo(id);
			    		$('<h1/>').text(element.title).appendTo(id+'a');
			    		$('<p/>').text(element.extract).appendTo(id+'a');
			    	});			    	
    			}
  			});
		}
  		return false;
	});
	
})
