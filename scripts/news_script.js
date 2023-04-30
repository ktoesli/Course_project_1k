// Текущая вкладка меню
document.querySelector("a#menu__page-link-to-news").classList.add("you-are-here");

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// Получение новостной информации
xmlhttp.open("GET","../xml/news_list.xml", false);
xmlhttp.send();
var xmlDocNewsList = xmlhttp.responseXML;

// Получение шаблона структуры новости
xmlhttp.open("GET", "../html_models/news_news_block.html", false);
xmlhttp.send();
var newsBlock = xmlhttp.responseText;

// Вставка новостей на страницу
var nNews = xmlDocNewsList.querySelectorAll("news").length;
for (i = nNews - 1; i >= 0; i--) {
    // Метка перед новостью
    var newsLink = document.createElement("a");
    newsLink.setAttribute("name", `news${i}`);
    newsLink.classList.add("main__news-article__link-to-news");
    document.querySelector(".main__news-article").appendChild(newsLink);
    // Заполнение новостного блока
    var xmlNewsBlock = xmlDocNewsList.querySelectorAll("news")[i];
    var newNewsBlock = document.createElement("div");
    newNewsBlock.innerHTML = newsBlock;
    newNewsBlock.querySelector(".news-block__title").innerHTML =
        xmlNewsBlock.querySelector("title").childNodes[0].nodeValue;
    newNewsBlock.querySelector(".news-block__figure img").setAttribute("src",
        xmlNewsBlock.querySelector("image").childNodes[0].nodeValue);
    newNewsBlock.querySelector(".news-block__date").innerHTML =
        xmlNewsBlock.querySelector("date").childNodes[0].nodeValue;
    var newsDate = newNewsBlock.querySelector(".news-block__date");
    var nParagraphs = xmlNewsBlock.querySelectorAll("paragraph").length;
    for (j = 0; j < nParagraphs; j++) {
        var pPar = document.createElement("p");
        pPar.classList.add("news-block__text");
        pPar.innerHTML = xmlNewsBlock.querySelectorAll("paragraph")[j].childNodes[0].nodeValue;
        newNewsBlock.querySelector(".news-block").insertBefore(pPar, newsDate);
    }
    // Вставка новостного блока на страницу
    document.querySelector(".main__news-article").appendChild(
        newNewsBlock.querySelector(".news-block"));
}