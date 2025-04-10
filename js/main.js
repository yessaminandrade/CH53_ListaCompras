const txtName = document.getElementById("Name"); //Nombre
const txtNumber = document.getElementById("Number"); //Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const btnLimpiarTodo = document.getElementById("btnClear");


const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


let cont = 0; //Numeración de la primera columna de la tabla
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array(); //almacena los elementos de la tabla

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

    let elemento = {
            "cont" : cont,
            "nombre" : txtName.value,
            "cantidad" : txtNumber.value,
            "precio" : precio
        }

    datos.push(elemento);
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row); 

    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;

    let resumen = {
        "cont" : cont,
        "totalEnProductos" : totalEnProductos,
        "costoTotal" : costoTotal
    };
    localStorage.setItem("resumen", JSON.stringify(resumen));

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus(); 
    } //if isValid

}); //btnAgregar

window.addEventListener("load", function(event) {
    event.preventDefault();
    
    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));
    } // datos != null

    datos.forEach((d) => {
        let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>
                   </tr>`;
                   
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    if (this.localStorage.getItem("resumen") != null) {
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
    } // resumen != null

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
}); // window.addEventListener load

//Agregar la funcionalidad del botón Limpiar todo:
//Resumen
//Tabla
//Campos
//Alerta
//localStorage


btnLimpiarTodo.addEventListener("click", function () {
    //Resumen
    contadorProductos.innerText = 0;
    productosTotal.innerText = 0;
    precioTotal.innerText = "$ 0.00";

    //Tabla 
    cuerpoTabla.innerHTML = "";

    //Campos
    txtName.value = "";
    txtNumber.value = "";

    //Alertas
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.style.border = "";
    txtNumber.style.border = "";

    //localStorage
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    //Reiniciar variables
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    datos = [];
});

