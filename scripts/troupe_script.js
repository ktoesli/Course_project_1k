// Текущая вкладка меню
document.querySelector("a#menu__page-link-to-troupe").classList.add("you-are-here");

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// Получение состава труппы
xmlhttp.open("GET","../xml/troupe_list.xml", false);
xmlhttp.send();
xmlDocTroupeList = xmlhttp.responseXML;

// Создание и вставка блоков на страницу
var nPersons = xmlDocTroupeList.querySelectorAll("person").length;
for (i = 0; i < nPersons; i++) {
    var xmlPerson = xmlDocTroupeList.querySelectorAll("person")[i];
    var newPerson = document.createElement("figure");
    newPerson.appendChild(document.createElement("img"));
    newPerson.appendChild(document.createElement("figcaption"));
    newPerson.querySelector("img").setAttribute("src", xmlPerson.querySelector("image").childNodes[0].nodeValue);
    newPerson.querySelector("figcaption").innerHTML =
        xmlPerson.querySelector("name").childNodes[0].nodeValue;
    // Вставка блока на страницу
    document.querySelector("div.main__troupe-article__div").appendChild(newPerson);
}