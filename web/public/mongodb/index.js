var dataSource = 'http://localhost:3000/personas';
var personas;
$(document).ready(function () {
	getData();
});

function getData() {

	$.ajax({
		method: 'GET',
		url: dataSource,
		crossDomain: true,
		dataType: 'json'
	})
		.done(function (data) {
			console.log(data);
			
			personas = data;
			cargarData(data);
		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			alert(textStatus);
		});
}

function cargarData(data) {
	let html = '';
	let i = 0;
	for (element of data) {
		html += `<tr class="row100 body"><td class="cell100 column1"> ${element.nombre}</td>`;
		html += `<td class="cell100 column2"> ${element.apellido}</td>`;
		html += `<td class="cell100 column3"> ${element.edad}</td>`;
		html += `<td class="cell100 column4" ><span onclick = editarElemento(${i})>Editar </span> | <span onclick = eliminar(${i})> Eliminar<span/></td></tr>`;
		i++;
	}


	$('#datos').html(html);
}

function eliminar(index) {
	$.ajax({
		method: 'DELETE',
		url: dataSource + `/${personas[index]._id}`,
		crossDomain: true,
	}).done(() => {
		console.log('TERMINO DELETE');
		
		getData();
	});
}

function editarElemento(index) {

	$('#opcion2').removeClass('hidden');
	$('#opcion1').addClass('hidden');
	

	$('#in_name')[0].value = personas[index].nombre;
	$('#in_surname')[0].value = personas[index].apellido;
	$('#in_age')[0].value = personas[index].edad;
	$('#in_id')[0].value = personas[index]._id;
	
}
function editar() {
	let id = $('#in_id')[0].value;
	let nombre = $('#in_name')[0].value;
	let apellido = $('#in_surname')[0].value;
	let edad = $('#in_age')[0].value;

	if (nombre !== '' && apellido !== '' && edad !== '') {
		let data = {
			_id: id,
			nombre: nombre,
			apellido: apellido,
			edad: edad
		}
		console.log(data);
		

		$.ajax({
			method: 'PUT',
			url: dataSource,
			crossDomain: true,
			dataType: 'json',
			data: data
		}).done(() => {
			
		}).fail(() => {
			getData();
		});
	} else {
		alert('Faltan datos');
	}
}


function agregar() {
	let nombre = $('#in_name')[0].value;
	let apellido = $('#in_surname')[0].value;
	let edad = $('#in_age')[0].value;

	if (nombre !== '' && apellido !== '' && edad !== '') {
		let data = {
			nombre: nombre,
			apellido: apellido,
			edad: edad
		}

		$.ajax({
			method: 'POST',
			url: dataSource,
			crossDomain: true,
			dataType: 'json',
			data: data
		}).done(() => {
			
			console.log('AHORA DEBERIA TIRAR GET');
			
		}).fail(() => {
			console.log('LA WEA');
			getData();
		});
	} else {
		alert('Faltan datos');
	}
}


function cancelar() {
	$('#opcion1').removeClass('hidden');
	$('#opcion2').addClass('hidden');
	

	$('#in_name')[0].value = '';
	$('#in_surname')[0].value = '';
	$('#in_age')[0].value = '';
}