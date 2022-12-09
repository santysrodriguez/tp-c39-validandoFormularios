const $ = (elemento) =>  document.getElementById(elemento)

window.onload = function(){
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

//------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
//-------------------DE REGISTRO DE PELÍCULAS------------------//   

let inputs = document.querySelectorAll("#formularioMoviesAdd input")
inputs = [...inputs, document.querySelector("#formularioMoviesAdd select")]

    $("title").focus()



    const campo = (target, campo, message, valEspecial) => {
        if (target.value === "" || valEspecial) {
            $(`span-${campo}`).innerHTML = `${message}`
            $(`span-${campo}`).classList.add("is-invalidText")
            $(`${campo}`).classList.add("is-invalidBorder")
            $(`${campo}`).classList.remove("is-validBorder")
        } else {
            $(`span-${campo}`).innerHTML = ""
            $(`span-${campo}`).classList.remove("is-invalidText")
            $(`${campo}`).classList.remove("is-invalidBorder")
            $(`${campo}`).classList.add("is-validBorder")
        }
    }


    const form = (e) => {
        switch (e.target.name) {
            case "title":
                campo(e.target, "titulo", "Debes completar este campo")
                break;
            case "rating":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    campo(e.target, "calificacion", "Entre 0 y 10", true)
                }else{
                    campo(e.target, "calificacion", "Debes completar este campo")
                }
                
                break;
            case "awards":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    campo(e.target, "premios", "Entre 0 y 10", true)
                }else{
                    campo(e.target, "premios", "Debes completar este campo")
                }
                break;
            case "release_date":
                campo(e.target, "fecha", "Debes completar este campo")
                break;
            case "length":
                if (+e.target.value < 60 || +e.target.value > 360) {
                    campo(e.target, "duracion", "Entre 60 y 360 minutos", true)
                }else{
                    campo(e.target, "duracion", "Debes completar este campo")
                }
                break;
            case "genre_id":
                campo(e.target, "genero", "Debes completar este campo")
                break;
            default:
                break;
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", form)
        input.addEventListener("blur", form)
    });

    $("formularioMoviesAdd").addEventListener("submit", (e) =>{
        let ulErrores = document.querySelector(".errores")
        let errores = []
        for (let i = 0; i < 6; i++) {
            if (e.target[i].value === "" || e.target[i].classList.contains("is-invalidBorder")) {
                if (e.target[i].value === "") {
                    campo(e.target[i], e.target[i].name, "Debes completar este campo")
                    errores.push( `${e.target[i].name}: Debes completar este campo`)
                } else if (e.target[i].name === "length") {
                    campo(e.target[i], e.target[i].name, "Entre 60 y 360 minutos", true)
                    errores.push( `${e.target[i].name}: Entre 60 y 360 minutos`)
                } else if (e.target[i].name === "rating" || e.target[i].name === "awards"){
                    campo(e.target[i], e.target[i].name, `Entre 0 y 10`, true)
                    errores.push( `${e.target[i].name}: Entre 0 y 10`)
                }
            }
        }

        if (errores.length > 0) {
            e.preventDefault()
            
            ulErrores.classList.add("alert-warning")
            ulErrores.innerHTML = ""
            errores.forEach(error => {
                ulErrores.innerHTML += `<li>${error}</li>`
            });
            setTimeout(() => {
                ulErrores.innerHTML = ""
            }, 5000)
        }else{
            ulErrores.classList.remove("alert-warning")
            ulErrores.classList.add("alert-exito")
            ulErrores.innerHTML = "La película se guardó satisfactoriamente."
        }
    })
}




















    /* ---------------title----------------------- */
    /* $('title').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.title = "El nombre es obligatorio"
            this.classList.add('is-invalid')
            $('titulo').innerHTML = errores.title
        }else{
            delete errores['title']
            $('titulo').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        } 
    }) */


    /* --------------------rating----------------- */

    /* $('rating').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.rating = "El rating es obligatorio"
            this.classList.add('is-invalid')
            $('calificacion').innerHTML = errores.rating
        }else if(this.value <0 || this.value >10 ) {
            errores.rating = "Debe ingresar valor entre 0 y 10"
            $('calificacion').innerHTML = errores.rating
            this.classList.add('is-invalid')
        }else{
            delete errores['rating']
            $getId('calificacion').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        } 
    }) */

    /* -------------------awards--------------------- */

    /* $('awards').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.awards = "El awards es obligatorio"
            this.classList.add('is-invalid')
            $('premios').innerHTML = errores.awards
        }else if(this.value <0 || this.value >10 ) {
            errores.awards = "Debe ingresar valor entre 0 y 10"
            $('premios').innerHTML = errores.awards
            this.classList.add('is-invalid')
        }else{
            delete errores['awards']
            $('premios').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        } 
    }) */


    /* -------------------------release_date------------------- */

    /* $getId('release_date').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.release_date = "El release_date es obligatorio"
            this.classList.add('is-invalid')
            $('fecha').innerHTML = errores.release_date
        }else{
            delete errores['release_date']
            $('fecha').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        }
    }) */


    /* -----------------------length-------------------- */

    /* $getId('length').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.length = "El length es obligatorio"
            this.classList.add('is-invalid')
            $('duracion').innerHTML = errores.length
        }else if(this.value <60 || this.value >360 ) {
            errores.length = "Debe ingresar valor entre 60 y 360"
            $('duracion').innerHTML = errores.length            
            this.classList.add('is-invalid')
        }else{
            delete errores['length']
            $('duracion').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        } 
    }) */


    /* ----------------------genre-id----------------- */

   /*  $('genre_id').addEventListener('blur', function(){
        if(this.value.length < 1){
            errores.genre_id = "El gernero es obligatorio"
            this.classList.add('is-invalid')
            $('genero').innerHTML = errores.genre_id
        }else{
            delete errores['genre_id']
            $('genero').innerHTML = ""
            this.classList.remove('is-invalid')
            this.classList.add('is-valid')
        }
    }) */




    /* $('agregar').addEventListener('click', function(event){
        event.preventDefault()
        for (i=0; i < elementosFormulario.length-1; i++ ){
            if (!elementosFormulario[i].value){
                elementosFormulario[i].classList.add('is-invalid')
                switch (i) {
                    case 0:
                        errores.title = "El nombre es obligatorio"
                        $('titulo').innerHTML = errores.title
                        $('titulo').classList.add('is-invalid')
                        break;
                    case 1:
                        errores.rating = "El rating es obligatorio"
                        $('calificacion').innerHTML = errores.rating
                        $('calificacion').classList.add('is-invalid')
                        break;
                    case 2:
                        errores.awards = "El award es obligatorio"
                        $('premios').innerHTML = errores.awards
                        $('premios').classList.add('is-invalid')
                        break;
                    case 3:
                        errores.release_date = "El release date es obligatorio"
                        $('fecha').innerHTML = errores.release_date
                        $('fecha').classList.add('is-invalid')
                        break;
                    case 4:
                        errores.length = "El length es obligatorio"
                        $('duracion').innerHTML = errores.length
                        $('duracion').classList.add('is-invalid')
                        break;
                    default:
                        errores.genre_id = "El genero es obligatorio"
                        $('genero').innerHTML = errores.genre_id
                        $('genero').classList.add('is-invalid')
                    break;
                }
            }else{
                elementosFormulario[i].classList.add('is-valid')
            }
        }

    if(Object.keys(errores).length < 1){
        console.log('sin errores')
        $('formularioMoviesAdd').submit()
    } else{
        console.log(errores)        
        console.log('se detectaron errores')
} 

    }) */


