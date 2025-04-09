let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid medium red"; // thin, medium, thick o 3px (ejemplo)
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto></strong>";
        alertValidaciones.style.display = "block";
    }
}); //length>=3
