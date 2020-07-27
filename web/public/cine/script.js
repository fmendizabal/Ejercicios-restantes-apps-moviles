var dataSource = 'https://api.movie.com.uy/api/shows/rss/data';
var movies;

$(document).ready(function() {


	$('.back').click(function(){
		$('.second').hide();
		$('.first').show();
		$('#content').html('');
	})
	$('.first div').click(function(event){
		$('.first').hide();
		$('.second').show();
		getData(event.currentTarget.innerText);
		$('#mySpinner').addClass('spinner');
	});
	// getData();
	$('.container').click(function(event){
		if (event.target.id === 'cont') {
			$('.container').fadeOut('fast');
			$('.back').fadeIn();
		}
		//$('.container').removeClass('show-info').addClass('hide-info');
	});
	// console.log('hola');
});

function getData(cinema) {
	$.ajax({
		method: 'GET',
		url: dataSource,
		crossDomain: true,
		dataType: 'json'
	})
	.done(function(data) {
		movies = data.contentCinemaShows.filter(function(element) {
			for(shows of element.cinemaShows) {
				if(shows.cinema === cinema) {
					console.log('hi');
					
					return true;
				}
			}
			return false;
		});
		if(movies.length === 0) {
			$('#mySpinner').removeClass('spinner');
			alert('No hay películas disponibles para este cine');
			$('.second').hide();
			$('.first').show();
			return;
		}
		let counter = 0;
		let element;
		for(element of movies) {
			let id = 'movie'+counter;
			let cardid = 'card'+counter;
			//let html = '<div id='+cardid+'><div class="front img" id='+id+'></div> <div class=back> Hola</div></div>';
			let html = '<div class="img" id='+id+'></div>';
			$('#content').append(html);
			$('#'+id).css('background-image', 'url('+element.posterURL+')');
			$('#'+id).click(
				function(event) {
					//$('.hide-info').removeClass('hide-info').addClass('show-info')
					$('.container').fadeIn('fast');
					$('.container').css('display','flex');
					displayInfo(movies[event.target.id.substring(5)]);
					$('.back').hide();
				}
			);
			//$('#'+cardid).flip('true');
			counter++;
		}
		$('#mySpinner').removeClass('spinner');
	})
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert(textStatus);
		$('#mySpinner').removeClass('spinner');
	});

	return false;
}

function displayInfo(element) {
	$('#name').html(element.movie);
	$('#description').html(element.description);
	$('#genre').html('Género: '+element.genre);
	$('#img').css('background-image', 'url('+element.posterURL+')');
	let html = "<h2>Funciones</h2><div class=cs_container>"
	for(cinema of element.cinemaShows) {
		html += "<div><h3>"+cinema.cinema+"</h3><div class=cinemaShow>";
		
		for (shows of cinema.shows) {
			html += "<div>"+shows.timeToDisplay+"</div>";
		}
	}
	html += "</div></div></div>";

	$('#shows').html(html);
}
