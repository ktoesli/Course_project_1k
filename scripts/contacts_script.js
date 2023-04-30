// Текущая вкладка меню
document.querySelector("a#menu__page-link-to-contacts").classList.add("you-are-here");

// Для запросов
if (window.XMLHttpRequest)
{ // для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else
{ // для IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// Получение контактов
xmlhttp.open("GET","../xml/contacts.xml", false);
xmlhttp.send();
var xmlDocContacts = xmlhttp.responseXML;

// Создание, заполнение и вставка контактов на страницу
var nDepartments = xmlDocContacts.querySelectorAll("department").length;
for (i = 0; i < nDepartments; i++) {
    var xmlDepartment = xmlDocContacts.querySelectorAll("department")[i];
    var newDepartment = document.createElement("h2");
    newDepartment.innerHTML = xmlDepartment.querySelector("department-name").childNodes[0].nodeValue;
    // Вставка названия отдела на страницу
    document.querySelector("article.main__contacts-article").appendChild(newDepartment);
    
    var nContacts = xmlDepartment.querySelectorAll("contact").length;
    for (j = 0; j < nContacts; j++) {
        var xmlContact = xmlDepartment.querySelectorAll("contact")[j];
        // Должность
        if (xmlContact.querySelector("post")) {
            var pPost = document.createElement("p");
            pPost.classList.add("main__contacts-article__post");
            pPost.innerHTML = xmlContact.querySelector("post").childNodes[0].nodeValue;
            // Вставка должности на страницу
            document.querySelector("article.main__contacts-article").appendChild(pPost);
        }
        // Имя
        var pPerson = document.createElement("p");
        pPerson.classList.add("main__contacts-article__person");
        pPerson.innerHTML = "<span class='main__contacts-article__person__name'>" +
            xmlContact.querySelector("name").childNodes[0].nodeValue + "</span";
        // Номер телефона
        if (xmlContact.querySelector("phone")) {
            if (xmlContact.querySelector("post")) { pPerson.innerHTML += ","; }
            else { pPerson.innerHTML += ":" };
            pPerson.innerHTML += " <span class='nobr'>" + xmlContact.querySelector("phone").childNodes[0].nodeValue + "</span>";
        }
        // Музыкальный инструмент
        if (xmlContact.querySelector("instrument")) {
            pPerson.innerHTML += " — " + xmlContact.querySelector("instrument").childNodes[0].nodeValue;
        }
        // Вставка контакта на страницу
        document.querySelector("article.main__contacts-article").appendChild(pPerson);
    }
}

// Вставка формы обратной связи
xmlhttp.open("GET","../html_models/feedback_form.html", false);
xmlhttp.send();
document.querySelector("article.main__feedback-article").innerHTML += xmlhttp.responseText;