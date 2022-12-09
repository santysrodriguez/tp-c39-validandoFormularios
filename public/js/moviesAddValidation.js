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

    document.getElementById("title").focus()

    let inputs = document.querySelectorAll("#formMoviesAdd input")
    inputs = [...inputs, document.querySelector("#formMoviesAdd select")]


    const validarCampo = (target, campo, msg, valEsp) => {
        if (target.value === "" || valEsp) {
            document.getElementById(`small-${campo}`).innerHTML = `${msg}`
            document.getElementById(`small-${campo}`).classList.add("is-invalidText")
            document.getElementById(`${campo}`).classList.add("is-invalidBorder")
            document.getElementById(`${campo}`).classList.remove("is-validBorder")
        } else {
            document.getElementById(`small-${campo}`).innerHTML = ""
            document.getElementById(`small-${campo}`).classList.remove("is-invalidText")
            document.getElementById(`${campo}`).classList.remove("is-invalidBorder")
            document.getElementById(`${campo}`).classList.add("is-validBorder")
        }
    }


    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "title":
                validarCampo(e.target, "title", "Debes completar este campo")
                break;
            case "rating":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    validarCampo(e.target, "rating", "Entre 0 y 10", true)
                }else{
                    validarCampo(e.target, "rating", "Debes completar este campo")
                }
                
                break;
            case "awards":
                if (+e.target.value < 0 || +e.target.value > 10) {
                    validarCampo(e.target, "awards", "Entre 0 y 10", true)
                }else{
                    validarCampo(e.target, "awards", "Debes completar este campo")
                }
                break;
            case "release_date":
                validarCampo(e.target, "release_date", "Debes completar este campo")
                break;
            case "length":
                if (+e.target.value < 60 || +e.target.value > 360) {
                    validarCampo(e.target, "length", "Entre 60 y 360 minutos", true)
                }else{
                    validarCampo(e.target, "length", "Debes completar este campo")
                }
                break;
            case "genre_id":
                validarCampo(e.target, "genre_id", "Debes completar este campo")
                break;
            default:
                break;
        }
    }

    inputs.forEach(input => {
        input.addEventListener("keyup", validarFormulario)
        input.addEventListener("blur", validarFormulario)
    });

    document.getElementById("formMoviesAdd").addEventListener("submit", (e) =>{
        let ulErrores = document.querySelector(".errores")
        let errores = []
        for (let x = 0; x < 6; x++) {
            if (e.target[x].value === "" || e.target[x].classList.contains("is-invalidBorder")) {
                if (e.target[x].value === "") {
                    validarCampo(e.target[x], e.target[x].name, "Debes completar este campo")
                    errores.push( `${e.target[x].name}: Debes completar este campo`)
                } else if (e.target[x].name === "length") {
                    validarCampo(e.target[x], e.target[x].name, "Entre 60 y 360 minutos", true)
                    errores.push( `${e.target[x].name}: Entre 60 y 360 minutos`)
                } else if (e.target[x].name === "rating" || e.target[x].name === "awards"){
                    validarCampo(e.target[x], e.target[x].name, `Entre 0 y 10`, true)
                    errores.push( `${e.target[x].name}: Entre 0 y 10`)
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


