const txtName = document.getElementById("Name"); //Nombre
const txtNumber = document.getElementById("Number"); //Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


let cont = 0; //Numeración de la primera columna de la tabla
let costoTotal = 0;
let totalEnProductos = 0;

//Jueves 10 abril: agregamos la siguiente función para validar la cantidad
//////////////////////////////////

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    } //length<=0

    if(isNaN(txtNumber.value)){
        return false;
    } //is NaN

    if (Number(txtNumber.value)<=0){
        return false;
    } //<=0
    //número
    //Mayor que 0
    return true;
} //Validar cantidad

function getPrecio(){
    return Math.round((Math.random()*10000)) / 100;
}//getPrecio

//////////////////////////////////

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    //Esta bandera, al ser True, permite que se agreguen los datos a la tabla.
    let isValid = true;

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";


    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3 ){
        txtName.style.border="solid medium red"; // thin, medium, thick o 3px (ejemplo)
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }
 /////////////////////////////////
 //Agregamos este if para la cantidad

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red"; // thin, medium, thick o 3px (ejemplo)
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es válida.</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if(isValid){
        cont ++ ;
        let precio = getPrecio();
        let row = `<tr>
        <td>${cont}</td>
        <td>${txtName.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend", row);   
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus(); 
    }//if isValid

}); //length>=3
