// Create in HTML una griglia di 36 quadratini (6x6).
// Ad ogni click su un quadratino, parte una richiesta ajax per recuperare un numero random tra 1 e 9.
// Se il numero restituito dall'api è <= 5, il quadrato su cui l'utente ha cliccato diventa giallo; se invece il numero restituito dall'api è > 5, il quadrato su cui l'utente ha cliccato diventa verde.
// In entrambi i casi, andiamo ad inserire nel quadrato il numero restituito dall'api.

$(document).ready(function() {

    // utilizziamo handlebars per inserire dinamicamente i quadrati nella griglia
    var html_template = $('#quadrato-template').html();
    var template_function = Handlebars.compile(html_template);
    // N.B.: i quadrati sono tutti uguali!
    var placeholder = {
        'classe': 'quadrato',
        'data': 0
    }
    var html_finale = template_function(placeholder);

    for (var i = 0; i < 36; i++) {
        // appendo 36 quadratini tutti uguali
        $('#griglia').append(html_finale);
    }

    // intercetto il click sul quadrato
    $('.quadrato').click(function() {

        // salvo il riferimento al quadrato su cui ho cliccato
        var quadrato_cliccato = $(this);

        // verifico se il quadrato era già stato cliccato in precedenza
        if(quadrato_cliccato.attr('data-cliccato') == 0) {
            // segno il quadrato come già cliccato
            quadrato_cliccato.attr('data-cliccato', 1);

            // Ad ogni click su un quadratino, parte una richiesta ajax per recuperare un numero random tra 1 e 9.
            $.ajax({
                'url': 'https://flynn.boolean.careers/exercises/api/random/int',
                'method': 'GET',
                'success': function(data) {
                    // recupero il numero restituito dall'api
                    var numero = data.response;
                    console.log(numero);
                    if(numero <= 5) {
                        // Se il numero restituito dall'api è <= 5, il quadrato su cui l'utente ha cliccato diventa giallo;
                        quadrato_cliccato.addClass('giallo');
                    } else {
                        // se invece il numero restituito dall'api è > 5, il quadrato su cui l'utente ha cliccato diventa verde.
                        quadrato_cliccato.addClass('verde');
                    }
                    // In entrambi i casi, andiamo ad inserire nel quadrato il numero restituito dall'api.
                    quadrato_cliccato.text(numero);
                },
                'error': function() {
                    alert('error');
                }
            });
        }
    });
});
