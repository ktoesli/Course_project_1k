// Текущая вкладка меню
document.querySelector("a#menu__page-link-to-performances").classList.add("you-are-here");

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// Получение информации о представлениях 
xmlhttp.open("GET","../xml/performances_info.xml", false);
xmlhttp.send();
var xmlDocPerformancesInfo = xmlhttp.responseXML;

xmlhttp.open("GET", "../html_models/performances_perf_block.html", false);
xmlhttp.send();
var perfBlock = xmlhttp.responseText;

// Заполнение шаблона представления и вставка блока на страницу
var nPerformances = xmlDocPerformancesInfo.querySelectorAll("performance").length;
for (i = 0; i < nPerformances; i++) {
    if (i) {
        var hrSeparator = document.createElement("hr");
        hrSeparator.classList.add("main__performances-article__separator");
        document.querySelector(".main__performances-article").appendChild(hrSeparator);
    }
    var newPerfBlock = document.createElement("div");
    newPerfBlock.innerHTML = perfBlock;
    var xmlPerfBlock = xmlDocPerformancesInfo.querySelectorAll("performance")[i];
    newPerfBlock.querySelector(".performance-block").setAttribute("id", `performance${i}`);
    newPerfBlock.querySelector("figure.performance-block__figure img").setAttribute("src",
        xmlDocPerformancesInfo.querySelectorAll("performance")[i].querySelector("image").childNodes[0].nodeValue);
    newPerfBlock.querySelector(".performance-block__grid__name").innerHTML =
        xmlPerfBlock.querySelector("name").childNodes[0].nodeValue +
        " (" + xmlPerfBlock.querySelector("age").childNodes[0].nodeValue + "+)";
    newPerfBlock.querySelector(".performance-block__grid__description").innerHTML =
        xmlPerfBlock.querySelector("description").childNodes[0].nodeValue;                                                                                                
    newPerfBlock.querySelector(".performance-block__grid__author-before").innerHTML =
        xmlPerfBlock.querySelector("author-before").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__author").innerHTML =
        xmlPerfBlock.querySelector("author").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__director-before").innerHTML =
        xmlPerfBlock.querySelector("director-before").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__director").innerHTML =
        xmlPerfBlock.querySelector("director").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__painter-before").innerHTML =
        xmlPerfBlock.querySelector("painter-before").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__painter").innerHTML =
        xmlPerfBlock.querySelector("painter").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__duration").innerHTML =
        xmlPerfBlock.querySelector("duration").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__price").innerHTML =
        xmlPerfBlock.querySelector("price").childNodes[0].nodeValue;
    newPerfBlock.querySelector(".performance-block__grid__date").innerHTML =
        xmlPerfBlock.querySelector("date").childNodes[0].nodeValue;
    newPerfBlock.querySelector("button").setAttribute("onclick", `buyTicket(${i})`)
    // Вставка блока представления
    document.querySelector(".main__performances-article").appendChild(
        newPerfBlock.querySelector(".performance-block"));
}

// Функция кнопки заказа билета 
function buyTicket(i) {
    alert("Вы заказалі квіток на спектакль \"" +
        xmlDocPerformancesInfo.querySelectorAll("performance")[i].querySelector("name").childNodes[0].nodeValue +
        "\".");
}