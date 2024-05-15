// Välimuisti
var todo = $.parseJSON(localStorage.getItem("MatoMissio")) || [];

// ladataan aiemmat mahdolliset tehtävät ja esitetään ne konsolissa
$(document).ready(function() {
    tuoTehtavat();
    console.log(todo);
});

//----------------------------
// ToDo Listan toiminta
//----------------------------

// Lisää Tehtävä listaan
//----------------------------
function uusiTehtava() {
    var uusi = $.trim($('#tehtavanimi').val());
    // Jos tehtäväkentässä on yli 2 kirjainta, lisätään tehtävä listaan.
    if (uusi.length > 2) {
        todo.push({
            nimi: uusi,
            valmis: false
        });

        poistoNappi();
        $('#tehtavanimi').val("");
        tallenna();
        console.log("Tehtävä lisätty");
    } 
    // ...Muuten soitetaan äänimerkki ja lyödään punainen reuna tehtävälistan ympärille kahdeksi sekunniksi.
    else {
        merkkiaani('/gallery/audio/Metallic.mp3');
        $('#tehtavanimi').css({"border":"1px solid #ec7166", "border-radius":"10px"});

        setTimeout(function() {
            $('#tehtavanimi').css("border","");
        }, 2000);

        console.log("Tyhjä kenttä tai liian lyhyt teksti!");
    }
}
// Tehtävien merkkaaminen ja poistaminen listalta
//----------------------------
$(document).on('click', '#tehtavapohja', function(event) {
    var target = event.target;

    if (target.tagName === "LI") {
        // Merkataan onko tehtävä tehty, default=false
        var tehtava = target;
        var tieto = Array.from(tehtavapohja.children).indexOf(tehtava);

        todo[tieto].valmis = !todo[tieto].valmis;

        // CSS & Äänimerkki
        tehtava.classList.toggle("valmis");
        merkkiaani('gallery/audio/Wood.mp3')
        console.log("Tehtävän tila muuttunut");
        tallenna();

    } else if (target.tagName === "SPAN") {
        // Poista tehtävä
        var tehtava = target.parentElement;
        var tieto = Array.from(tehtavapohja.children).indexOf(tehtava);

        // Poistetaan tiedot
        todo.splice(tieto, 1);
        tehtava.remove();

        tallenna();
        console.log("Tehtävä poistettu");
    }
}, false);


// Poistonappi
function poistoNappi() {
    var tehtavaInput = $('#tehtavanimi').val();
    
    // Poistonappi tehtävien perään
    var delText = '❌';
    var del = "<span>" + delText + "</span>";
    var li = "<li>" + tehtavaInput + del + "</li>";

    // Tehtävät listaan
    $('#tehtavapohja').append(li);
}

// Tuo Tehtavat
function tuoTehtavat() {
    // Tyhjennetään lista, ei haluta dublikaatteja
    $('#tehtavapohja').html('');

    //Lisätään järjestyksessä lista takaisin sivulle näkyville
    todo.forEach(function(tehtava) {
        var li = document.createElement("li");
        li.textContent = tehtava.nimi;

        // Poistonappi tehtävien perään
        var del = document.createElement("span");
        del.innerHTML = "❌";
        li.appendChild(del);

        // Jos tehtävä jo tehty, näytetään valmiina
        if (tehtava.valmis) {
            li.classList.add("valmis");
        }

        // Tehtävät listaan ja konsoliin logia
        $(tehtavapohja).append(li);
        console.log("Tiedot palautettu välimuistista");
    });
}

// Tallennus välimuistiin
function tallenna() {
    localStorage.setItem("MatoMissio", JSON.stringify(todo));
}

// "Unohda minut" -toiminto
function forgetMe() {;
    alert("Nollataan sivu...");
    localStorage.clear();
    location.reload();
}

// Ilmoitetaan, ettei voi kirjautua
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
}

// Hampparimenu! :D, vain puhelimelle, muuten heittää varoitusta konsoliin.
function openMenu() {
    var navbar = document.getElementById('navbar');

    if (window.innerWidth <= 768) {
        navbar.classList.toggle('show');
        merkkiaani('/gallery/audio/Cartoon.mp3');
    }
    else {
        console.warn("Jätä Gilbert rauhaan!");
    }
}

// Merkkiääni toiminto
function merkkiaani(polku) {
    var merkki = new Audio(polku)
    merkki.loop = false;
    merkki.play();
}