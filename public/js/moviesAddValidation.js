const $ = (elemento) =>  document.getElementById(elemento)

window.onload = function () {
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE REGISTRO DE PELÍCULAS------------------//    

    $("title").focus()

    let inputs = document.querySelectorAll("#formMoviesAdd input")
    inputs = [...inputs, document.querySelector("#formMoviesAdd select")]


    const validacionCampo = (target, campo, message, valEspecial) => {
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


    const validacionForm = (e) => {
        switch (e.target.name) {
            case "title":
                validacionCampo(e.target, "title", "Debes completar este campo")
                break;
            case "rating":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    validacionCampo(e.target, "rating", "Entre 0 y 10", true)
                }else{
                    validacionCampo(e.target, "rating", "Debes completar este campo")
                }
                
                break;
            case "awards":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    validacionCampo(e.target, "awards", "Entre 0 y 10", true)
                }else{
                    validacionCampo(e.target, "awards", "Debes completar este campo")
                }
                break;
            case "release_date":
                validacionCampo(e.target, "release_date", "Debes completar este campo")
                break;
            case "length":
                if (+e.target.value < 60 || +e.target.value > 360) {
                    validacionCampo(e.target, "length", "Entre 60 y 360 minutos", true)
                }else{
                    validacionCampo(e.target, "length", "Debes completar este campo")
                }
                break;
            case "genre_id":
                validacionCampo(e.target, "genre_id", "Debes completar este campo")
                break;
            default:
                break;
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", validacionForm)
        input.addEventListener("blur", validacionForm)
    });

    $("formMoviesAdd").addEventListener("submit", (e) =>{
        let erroresUl = document.querySelector(".errores")
        let errores = []
        for (let i = 0; i < 6; i++) {
            if (e.target[i].value === "" || e.target[i].classList.contains("is-invalidBorder")) {
                if (e.target[i].value === "") {
                    validacionCampo(e.target[i], e.target[i].name, "Debes completar este campo")
                    errores.push( `${e.target[i].name}: Debes completar este campo`)
                } else if (e.target[i].name === "length") {
                    validacionCampo(e.target[i], e.target[i].name, "Entre 60 y 360 minutos", true)
                    errores.push( `${e.target[i].name}: Entre 60 y 360 minutos`)
                } else if (e.target[i].name === "rating" || e.target[i].name === "awards"){
                    validacionCampo(e.target[i], e.target[i].name, `Entre 0 y 10`, true)
                    errores.push( `${e.target[i].name}: Entre 0 y 10`)
                }
            }
        }

        if (errores.length > 0) {
            e.preventDefault()
            
            erroresUl.classList.add("alert-warning")
            erroresUl.innerHTML = ""
            errores.forEach(error => {
                erroresUl.innerHTML += `<li>${error}</li>`
            });
            setTimeout(() => {
                erroresUl.innerHTML = ""
            }, 10000)
        }else{
            erroresUl.classList.remove("alert-warning")
            erroresUl.classList.add("alert-exito")
            erroresUl.innerHTML = "La película se guardó satisfactoriamente."
        }
    })
}


