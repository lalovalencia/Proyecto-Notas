const formulario = document.querySelector('#formulario');
const mitad_dos = document.querySelector('.mitad_dos');
let notas = [];

eventos();

function eventos(){
    formulario.addEventListener('submit',agregarNota);

    document.addEventListener('DOMContentLoaded',() => {
        notas = JSON.parse(localStorage.getItem('Notas')) || [];
        console.log(notas);
        crearHTML();
    });
}

function agregarNota(n){
    n.preventDefault();

    const nomTitulo = document.querySelector('#titulo').value;
    const mensaje = document.querySelector('#mensaje').value;
    const categoria = document.querySelector('#field').value;

    if(mensaje === '' && nomTitulo === '' && categoria === ''){
        mensajeError('No puede estar vacio');
        return;
    }
    else if(mensaje === ''){
        mensajeError('Debe llevar algo en el mensaje');
        return;
    }
    else if(nomTitulo === ''){
        mensajeError('Tiene que tener titulo');
        return;
    }
    else if(categoria === ''){
        mensajeError('Tiene que tener una categoria');
        return;
    }

    const objetoMensaje = {
        id: Date.now(),
        titulo: nomTitulo,
        texto: mensaje,
        tipo: categoria 
    }

    notas = [...notas,objetoMensaje];

    crearHTML();

    formulario.reset();
}

function mensajeError(error){
    const msjError = document.createElement('p');
    msjError.textContent = error;
    msjError.classList.add('msjError');


    const mitad_uno = document.querySelector('.mitad_uno');
    mitad_uno.appendChild(msjError);

    setTimeout(()=>{
        msjError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();

    if(notas.length > 0){
        notas.forEach(nota => {
            const botonEliminar = document.createElement('a');
            botonEliminar.innerText = 'X';
            botonEliminar.classList = 'borrarNota';
            
            const postics = document.createElement('div');
            const notaTitulo = document.createElement('h2');
            const notaMensaje = document.createElement('p');

            postics.appendChild(botonEliminar);
            
            postics.classList = 'notas '+nota.tipo;

            postics.setAttribute('lang','hyphens:auto');

            notaTitulo.innerText = nota.titulo;
            notaMensaje.innerText = nota.texto;

            postics.appendChild(notaTitulo);
            postics.appendChild(notaMensaje);
            //postics.innerHTML = "<div class='notas "+nota.tipo+"' lang='hyphens:auto'><h2>"+nota.titulo+"</h2><p>"+nota.texto+"</p></div>";

            mitad_dos.appendChild(postics);

            botonEliminar.onclick = () => {
                borrarNota(nota.id);
            }
        });
    }

    agregarAlLocalStorage();
}

function agregarAlLocalStorage(){
    localStorage.setItem('Notas',JSON.stringify(notas));
}

function borrarNota(id){
    notas = notas.filter(nota => nota.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while(mitad_dos.firstChild){
        mitad_dos.removeChild(mitad_dos.firstChild);
    }
}