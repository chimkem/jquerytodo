// Välimuisti
var todo = $.parseJSON(localStorage.getItem("MatoMissio")) || [];

// ladataan aiemmat mahdolliset tehtävät ja esitetään ne konsolissa
$(document).ready(function() {
    // Kutsutaan funtio
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
        $('#tehtavapohja li').fadeIn(400);
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

    if ($(target).prop("tagName") === "LI") {
        // Merkataan onko tehtävä tehty, default=false
        var tehtava = target;
        var tieto = Array.from($('#tehtavapohja').children()).indexOf(tehtava);

        todo[tieto].valmis = !todo[tieto].valmis;

        // CSS & Äänimerkki
        tehtava.classList.toggle("valmis");
        $(tehtava).hide();
        $(tehtava).fadeToggle(400);

        merkkiaani('gallery/audio/Wood.mp3')
        tallenna();
        console.log("Tehtävän tila muuttunut");
        

    } else if ($(target).prop("tagName") === "SPAN") {
        // Poista tehtävä
        var tehtava = target.closest('li');
        var tieto = Array.from($('#tehtavapohja').children()).indexOf(tehtava);

        // Poistetaan tiedot
        todo.splice(tieto, 1);
        $(tehtava).fadeOut(400);
        setTimeout( function() {
            $(tehtava).remove();
        }, 500);
        tallenna();
        console.log("Tehtävä poistettu");
    }
});


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

function tuoTehtavat() {
        $('#tehtavapohja').html('');  // Clear the list

        todo.forEach(function(tehtava) {
            var li = $("<li>").html(tehtava.nimi);

            var del = $("<span>").html("❌");
            $(li).append(del);

            if (tehtava.valmis) {
                $(li).addClass("valmis");
            }

            // Fade listalle
            $('#tehtavapohja').append(li);
            $(li).fadeIn(1500);

            console.log("Tiedot palautettu välimuistista");
        });
}

// Tallennus välimuistiin
function tallenna() {
    localStorage.setItem("MatoMissio", JSON.stringify(todo));
}

// "Unohda minut" -toiminto
function forgetMe() {
    alert("Nollataan sivu...");
    localStorage.clear();
    location.reload();
}

// Ilmoitetaan, ettei voi kirjautua
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
    return false;
}

// Hampparimenu! :D, vain puhelimelle, muuten heittää varoitusta konsoliin.
function openMenu() {
    var $navi = $('#navbar');

    if ($(window).width() <= 768) {
        $navi.toggleClass('show');
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