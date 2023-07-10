document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submit', function(e){
        e.preventDefault();
        let numeroMax = document.getElementById('numero-maximo').value;
        numeroMax = parseInt(numeroMax);

        let numeroAleatório = Math.random()* numeroMax;
        numeroAleatório = Math.floor(numeroAleatório + 1);
        // Arrendondou pra baixo porque foi acrescentado + 1.
        //Math.floor -> arrendonda pra baixo
        // Math.ceil -> arrendonda pra cima
        // Math.round -> .5+ arrendonda pra cima, e .4- arrendonda pra baixo
      
        console.log("O valor é: " + numeroMax)


        document.getElementById('resultado-valor').innerText = `A pessoa sortuda está com número ${numeroAleatório}! Parabéns!`;
        document.querySelector('.resultado').style.display = 'block';
    })
})
