$(window).on('load', function () {
    var $preloader = $('#p_prldr'),
        $svg_anm   = $preloader.find('.svg_anm');
    $svg_anm.fadeOut();
    $preloader.delay(200).fadeOut('slow');
});

$( ".select" ).click(function(){ 
	    $( "li").slideToggle('fast'); 
	  });
	  
	  
$(".first ").hover(function () {
    $(this).find("#select2 li").toggle('fast');
  });



var city;
var city3 = $(input).text();
var city2;
var input = $('#city'),
inpVal = input.val();   	 	      
 $(document).on('click', 'span[class^="k"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
 $('#selected2').css('display','block');	
}); 
 $(document).on('click', 'span[class^="s"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
  $('#selected2').css('display','block');	
});
$(document).on('click', 'input[id^="city"]', function(e) {
    e.preventDefault();       
	input.val(inpVal + $(this).attr('value'));
	city2 = $(this).text();
  $('#selected2').css('display','none');
});






		// перевод на украинский описания погоды
var znak = ['overcast clouds','clear sky','few clouds','scattered clouds','broken clouds','shower rain','rain','thunderstorm','snow','mist','thunderstorm with light rain','thunderstorm with rain','thunderstorm with heavy rain','light thunderstorm','thunderstorm','heavy thunderstorm','ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle','light intensity drizzle','drizzle','heavy intensity drizzle','light intensity drizzle rain','drizzle rain','heavy intensity drizzle rain','shower rain and drizzle','heavy shower rain and drizzle','shower drizzle','light rain','moderate rain','heavy intensity rain','very heavy rain','extreme rain','freezing rain','light intensity shower rain','shower rain','heavy intensity shower rain','ragged shower rain','light snow','Snow','Heavy snow','Sleet','Light shower sleet','Shower sleet','Light rain and snow','Rain and snow','Light shower snow','Shower snow','Heavy shower snow'];

var znakUA = ['Затяжна хмарність','Чисте небо','Невелика хмарність','Мінлива хмарність','Хмарність','Зливовий дощ','Дощ','Гроза','Сніг','Туман','Гроза з невеликим дощем','Гроза з дощем','гроза з сильним дощем','Легка гроза','Гроза','Сильна гроза','Місцями гроза','гроза з легким дощем','гроза з дощем, що мрячить','гроза, сильно дрібний дощ','Слабка мряка','Мряка','Сильна мряка','Слабо дрібний дощ','дрібний дощ','Сильна мряка','Короткочасні зливи, мряка','Проливний короткочасний дощ, мряка','Щільна мряка','Невеликий дощ','Помірний дощ','Сильний дощ','Дуже сильний дощ','Злива','Крижаний дощ','Помірний дощ','Проливний дощ','Сильна злива','Змінний злива','Легкий снігопад','Сніг','Сильний снігопад','Мокрий сніг','невеликий дощ зі снігом','Сльота, дощ зі снігом','Легкий змінний дощ/ сніг','дощ зі снігом','невеликий снігопад','Безперервний снігопад','Рясний снігопад'];	   
$('#cityB').on('click', function(){
	$('#mapsShow').css('display','block');
	 $('.p').css('display','block');
    $('#adress').css('display','block');	 
	$('#tablo').css('display','flex');
    $('#OUT1').css('display','block');	
	 $('#OUT11').css('display','block');	
	city=$('#city').val();

//Карта

$('#map2').replaceWith('<div id="map2" style="height:500px;width:80%;"></div>');


var apiURI112 = `https://nominatim.openstreetmap.org/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1`;
 console.log(apiURI112);
$.ajax({
		  url: apiURI112,
		  dataType: "json",
		  type: "GET",
		  async: "true",		 
	      timeout : 600,		  
		}).done(dataHandler4);

function dataHandler4(d) {
	if(d.length == 0){
		console.log('ERROR');
		$('iframe').attr('src','https://nominatim.openstreetmap.org/search/'+city2);
		$('#map2').css('display','none');
		$('#OUT1').css('display','none');
		$('#OUT11').css('display','none');
		$('.p').css('display','none');
		$('#adress').css('display','none');
		}else{
$('iframe').attr('src','');
$('#mapsShow').css('display','none');
console.log(city2);	
	var lattit = d[0].lat;	
    var longit = d[0].lon;
	var address = d[0].display_name;
	$('#adress').text(address);
	
console.log(address);	
console.log(lattit);
console.log(longit);
var center = [lattit, longit];

// Создаём карту
var map2 = L.map('map2').setView(center, 17);

// Настраиваем OSM
L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	zoom:9,
    maxZoom: 12,
  }).addTo(map2);

// добавляем маркер в указанном месте
L.marker(center).addTo(map2);
		}


 }

		


	var apiURI2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ua, uk&units=metric&appid=5b58aee62c41eb64fcab16edce2e5cc1`;
		console.log("success getWeather2");
		console.log(apiURI2);
		$.ajax({
		  url: apiURI2,
		  dataType: "jsonp",
		  type: "GET",
		  async: "true",		 
	      timeout : 500,
                    success : function(data) {
                        console.log("Success");
                    },
                    error : function(e) {
                        console.log("Error");
						$('#cityC').html('<p style="color:red";>ERROR</p><p style="color:#bef7f1";>Перевірте коректність назви</p>');
						$('#tablo').css('display','none');
						$('#map2').css('display','none');
		                $('#OUT1').css('display','none');
		                $('#OUT11').css('display','none');
		                $('.p').css('display','none');
		                $('#adress').css('display','none');
                    },
                    done : function(e) {
                        console.log("DONE");
                    },  
		}).done(dataHandler3),getWeather2();

$('.text-center').css('display','block');	

$('#selected').text(city);
$('#selected2').html('<p>('+city2+')</p>');
function getWeather2() {
var city4=$('#city').val();	
    var apiURI4 = `https://api.openweathermap.org/data/2.5/weather?q=${city4}&units=metric&appid=5b58aee62c41eb64fcab16edce2e5cc1`;
    //делаем запрос на данные о погоде
    console.log("success getWeather22");
    console.log(apiURI4);
    return $.ajax({
      url: apiURI4,
      dataType: "jsonp",
      type: "GET",
      async: "true",
	  timeout : 800,
    }).done(dataHandler2);
  }  
function dataHandler2(data) {
dataString = JSON.stringify(data);
var tempMode = Math.round(data.main.temp);
var m4 = znak.indexOf(data.weather[0].description);	    
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		document.getElementById("demo27").innerHTML = "Погода: " + " " + znakUA[m4];
		document.getElementById("demo125").innerHTML = "Температура: " + " " + tempMode+"°C";
        $("#tmp24").attr("src", imgURL);
       
      }      	   	
  }
} 
 
	 
function dataHandler3(data) {
	dataString = JSON.stringify(data);
	var now = new Date();
	let h = now.getHours();
    var num = 8-(Math.floor(h/3));
	var m = znak.indexOf(data.list[num+5].weather[0]["description"]);
    var m1 = znak.indexOf(data.list[num+13].weather[0]["description"]);
    var m2 = znak.indexOf(data.list[num+21].weather[0]["description"]);
    var m3 = znak.indexOf(data.list[num+29].weather[0]["description"]);
    var name =  data.city.name;
console.log('Город: '+ name);
$('#cityC').text('в' + ' ' + name);  	
	
//завтра
		document.getElementById("demo6").innerHTML = data.list[num+5].dt_txt;
		document.getElementById("demo4").innerHTML = "Вдень" + " " + Math.floor(data.list[num+5].main["temp"])+"°C";
		document.getElementById("demo7").innerHTML = data.list[num+1].dt_txt;
		document.getElementById("demo5").innerHTML = "Вночі" +  " " + Math.floor(data.list[num+1].main["temp"])+"°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num+5].weather[0].icon + ".png";
		$("#tmp4").attr("src", imgURL);
		$("#demo71").text(znakUA[m]);
		console.log(data.list[num+5].weather[0]["description"]);
//послезавтра
		document.getElementById("demo8").innerHTML = data.list[num+13].dt_txt;
		document.getElementById("demo9").innerHTML = "Вдень " + " " + Math.floor(data.list[num+13].main["temp"])+"°C";
		document.getElementById("demo10").innerHTML = data.list[num+9].dt_txt;
		document.getElementById("demo11").innerHTML = "Вночі" +  " " + Math.floor(data.list[num+9].main["temp"])+"°C";
		var imgURL = "https://openweathermap.org/img/w/" + data.list[num+13].weather[0].icon + ".png";
		$("#tmp5").attr("src", imgURL);
		$("#demo72").text(znakUA[m1]);
//после-послезавтра
		document.getElementById("demo12").innerHTML = data.list[num+21].dt_txt;
		document.getElementById("demo13").innerHTML = "Вдень" + " " + Math.floor(data.list[num+21].main["temp"])+"°C";
		document.getElementById("demo14").innerHTML = data.list[num+17].dt_txt;
		document.getElementById("demo15").innerHTML = "Вночі" +  " " + Math.floor(data.list[num+17].main["temp"])+"°C";
        var imgURL = "https://openweathermap.org/img/w/" + data.list[num+21].weather[0].icon + ".png";
		$("#tmp6").attr("src", imgURL);
        $("#demo73").text(znakUA[m2]);		
//после-после-послезавтра	
		document.getElementById("demo16").innerHTML = data.list[num+29].dt_txt;
		document.getElementById("demo17").innerHTML = "Вдень" + " " + Math.floor(data.list[num+29].main["temp"])+"°C";
		document.getElementById("demo18").innerHTML = data.list[num+25].dt_txt;
		document.getElementById("demo19").innerHTML = "Вночі" +  " " + Math.floor(data.list[num+25].main["temp"])+"°C";
        var imgURL = "https://openweathermap.org/img/w/" + data.list[num+29].weather[0].icon + ".png";
		$("#tmp7").attr("src", imgURL);
        $("#demo74").text(znakUA[m3]);
        console.log(data.list[num+29].weather[0]["description"]);		
				
   }
 
   });
   



 //Показ дни недели 
  function showDateTime() {
				
				
				var d = new Date();
				var n1, n2, n3, n4, n5;
				var weekday = new Array(7);
					weekday[0] = "Неділя";
					weekday[1] = "Понеділок";
					weekday[2] = "Вівторок";
					weekday[3] = "Середа";
					weekday[4] = "Четвер";
					weekday[5] = "П'ятница";
					weekday[6] = "Субота";
					 
					 if(d.getDay() >= 3){
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[7-(d.getDay()+4)];} if(d.getDay() >= 4)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[7-(d.getDay()+3)];
						   n4 = weekday[9-(d.getDay()+4)];} if(d.getDay() >= 5)
					     {
						   n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[7-(d.getDay()+2)];
						   n3 = weekday[9-(d.getDay()+3)];
						   n4 = weekday[11-(d.getDay()+4)];} if(d.getDay() >= 6)
					     {
						   n1 = weekday[7-(d.getDay()+1)];
						   n2 = weekday[9-(d.getDay()+2)];
						   n3 = weekday[11-(d.getDay()+3)];
						   n4 = weekday[13-(d.getDay()+4)];}  if(d.getDay() < 3) 
						 {
					       n1 = weekday[(d.getDay()+1)];
						   n2 = weekday[(d.getDay()+2)];
						   n3 = weekday[(d.getDay()+3)];
						   n4 = weekday[(d.getDay()+4)];
						  
					     }
						
								document.getElementById("day1").innerHTML = n1;
								document.getElementById("day2").innerHTML = n2;
								document.getElementById("day3").innerHTML = n3;
								document.getElementById("day4").innerHTML = n4;								
			}
				

var $tempMode = $("#tempMode");
var $tempText = $("#temp-text");
var $windText = $("#wind-text");
var $windText2 = $("#wind-text2");
var $windText3 = $("#wind-text3");
var $windText4 = $("#wind-text4");
var $windText5 = $("#wind-text5");
//$(document).ready(function() {
  

  // эта функция берет температуру из обработчика данных и отображает температуру в соответствии с правильной единицей измерения температуры, а также отображает температуру теплой или холодной.
  function formatTemperature(kelvin) {
    
    
    var clicked = false;
    var fahr = ((kelvin * 9 / 5) - 459.67).toFixed(0);
    var cels = (kelvin - 273.15).toFixed(1);
    //инициация индикации температуры
    $tempText.html(cels);

    var firstClick = false;
    //щелкните обработчик, чтобы обновить единицу измерения температуры.
    $tempMode.off("click").on("click", function() {
      firstClick = true;
      console.log(clicked);
      clicked === false ? clicked = true : clicked = false;
      clicked === true ? $tempMode.html("F&deg") : $tempMode.html("C&deg") ;
      if (clicked) {
	  $tempText.html(fahr);
        
      } else
        $tempText.html(cels);
    });

    if (cels > 24) {
      $("#temp-text").css("color", "red");
    } else if (cels < 18) {
      $("#temp-text").css("color", "blue");
    }
  }
  //обрабатывает данные ответа и форматирует их соответствующим образом, поскольку это асинхронный объект ответа, вся обработка и форматирование данных должны выполняться в этой функции.
  
  function dataHandler(data) {
    dataString = JSON.stringify(data);
    console.log(data.main.temp);
    formatTemperature(data.main.temp);
    if (data.main.temp && data.sys) {
      // отображение иконки
      if (data.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $("#weatherImg").attr("src", imgURL);
		 //выводим на украинском
var k = znak.indexOf(data.weather[0].description); 
console.log(k);
        $("#weather-text").text(znakUA[k]);
      }
      // скорость ветра
      if (data.wind) {
        var knots = data.wind.speed;
        $windText.html(knots.toFixed(1) + " М/С");
        var knots2 = data.wind.speed * 1.9438445;
	    $windText2.html(knots2.toFixed(1) + " Вузлів");
      }
	  if (data.main) {
        var hum2 = data.main.pressure;
		var mm = (data.main.pressure * 0.75006).toFixed(0);
        $windText3.html(mm + " мм.рт.ст.");
    }
if (data.main) {
        var hum3 = data.main.humidity;
        $windText4.html(hum3 + " %");
    }

 	
  }
}
  function getWeather(locdata) {
    console.log("getWeather has been called.")
    var lat = locdata.latitude;
    var lon = locdata.longitude;
	
    var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=5b58aee62c41eb64fcab16edce2e5cc1";
	
//выводим данные IP
    if (locdata){ 
      console.log("success");
      $("#city-text").html(locdata.city );
      $("#city-text2").html(locdata.country_name);
      $("#city-text3").html(" Індекс: " + locdata.postal);
      $("#city-text4").html(" Широта: " + locdata.latitude + " Довгота: " + locdata.longitude);
      $("#city-text5").html("Ваш IP: " + locdata.ip);
      $("#city-text6").html(" Провайдер: " + locdata.org);
    } else {
    console.log("fail");
    }

    //делаем запрос на данные о погоде
    console.log("success getWeather");
    console.log(apiURI);
    return $.ajax({
      url: apiURI,
      dataType: "jsonp",
      type: "GET",
      async: "true",
    }).done(dataHandler);

  }

  var counter = 0;

  function getLocation() {
    console.log("Update# " + counter++);
    
    //делаем запрос на локализацию устройства
    return $.ajax({
      url: "https://ipapi.co/jsonp/",
      dataType: "jsonp",
      type: "GET",
      async: "true",
    });
  }

    
  var updateInterval = setInterval(getLocation().done(getWeather), 30000);
//});

 function showDateTime2() {
            var now = new Date();
            date.textContent = `${now.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })} ${now.getFullYear()} року, `
                + now.toLocaleDateString("uk-UA", { weekday: "long" });
            time.textContent = correctTime(now);
        }
        showDateTime2();
        setInterval(showDateTime2, 1000);
 
        let stopwatchId, stopwatch_ms,
            timerId, timer_ms;
                                 
        // Общая функция корректного отображения времени. 
        function correctTime(time) {
            let h = time.getHours(),
                m = time.getMinutes(),
                s = time.getSeconds();
            return `${(h < 10 ? "0" : "") + h}:${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`;
        } 
        // В Opera отображение ведущего нуля часов глючит в Intl.
        function correctTimeIntl(time) {
            let format = Intl.DateTimeFormat("uk-UA", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            return format.format(time);
        }
showDateTime2();
