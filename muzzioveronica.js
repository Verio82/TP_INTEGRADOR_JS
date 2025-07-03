//Sistema de gestion de biblioteca

//PUNTO 1  Estructura de datos
//a)Crear un array de objetos llamado libros que contenga al menos 10 libros

const prompt = require("prompt-sync")(); // Importa la librería prompt-sync para usar prompt

let libros = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    genero: "Realismo mágico",
    disponible: false
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    anio: 1949,
    genero: "Distopía",
    disponible: false
  },
  {
    id: 3,
    titulo: "Jane Eyre",
    autor: "Charlotte Brontë",
    anio: 1841,
    genero: "Novela",
    disponible: false
  },
  {
    id: 4,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    anio: 1943,
    genero: "Fábula",
    disponible: false
  },
  {
    id: 5,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    anio: 1953,
    genero: "Ciencia ficción",
    disponible: false
  },
  {
    id: 6,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    anio: 1813,
    genero: "Romance",
    disponible: true
  },
  {
    id: 7,
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    anio: 1981,
    genero: "Novela",
    disponible: true
  },
  {
    id: 8,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    anio: 1954,
    genero: "Fantasía",
    disponible: false
  },
  {
    id: 9,
    titulo: "La llamada de Cthulhu",
    autor: "H.P. Lovecraft",
    anio: 1929,
    genero: "Terror",
    disponible: true
  },
  {
    id: 10,
    titulo: "Los crimenes de la calle Morgue",
    autor: "Edgar Allan Poe",
    anio: 1841,
    genero: "Misterio",
    disponible: false
  }
];

//console.table(libros);    // Muestra el array de libros en la consola, borrar para entregar el TP!!

//b) Crear un array de objetos llamado usuarios con al menos 5 usuarios

let usuarios = [
  {
    id: 1,
    nombre: "Luca De Castro",
    email: "luca.decastro@email.com",
    librosPrestados: [2, 5]
  },
  {
    id: 2,
    nombre: "Melody De Castro",
    email: "melo.decastro@email.com",
    librosPrestados: []
  },
  {
    id: 3,
    nombre: "Veronica Muzzio",
    email: "vero.muzzio@email.com",
    librosPrestados: [8]
  },
  {
    id: 4,
    nombre: "Norberto Muzzio",
    email: "nr.muzzio@email.com",
    librosPrestados: [1, 3, 4]
  },
  {
    id: 5,
    nombre: "Paula Muzzio",
    email: "paula.muzzio@email.com",
    librosPrestados: [10]
  }
];

//console.table(usuarios);   // Muestra el array de usuarios en la consola, borrar para entregar el TP!!

//PUNTO 2 Funciones de gestion de libros

//a)Implementar una función agregarLibro(id, titulo, autor, anio, genero) que agregue un nuevo libro al array libros.

function agregarLibro(titulo, autor, anio, genero) {
  
  function normalizarTexto(texto) {
    return texto
      .trim()
      .normalize("NFD")                // separa letras de acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
      .toUpperCase();                 // convierte a mayúsculasconst existe = libros.some(libro =>
  }
  
  const tituloNormalizado = normalizarTexto(titulo);
  const autorNormalizado = normalizarTexto(autor);

  const existe = libros.some(libro =>
    normalizarTexto(libro.titulo) === tituloNormalizado &&
    normalizarTexto(libro.autor) === autorNormalizado
  );
    
  if (existe) { // Verifica si el libro ya existe
    console.log(`El libro "${titulo}" de ${autor} ya existe en la biblioteca.`);
    return;
  }
  
  const nuevoId = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1; //Genero el nuevo ID automaticamente

  const nuevoLibro = {
    id: nuevoId,
    titulo: titulo,
    autor: autor,
    anio: anio,
    genero: genero,
    disponible: true
  };

  libros.push(nuevoLibro);
  console.log(`Libro "${titulo}" agregado con ID ${nuevoId}.`); //Muestra que se agregó el libro y el numero de ID
}

//agregarLibro("Rayuela", "Julio Cortázar", 1963, "Ficción"); //Se agrega el libro Borrar para entregar el TP!!

//console.table(libros);

//agregarLibro("Rayuela", "Julio Cortázar", 1963, "Ficción"); //Se detecta que ya existe el libro Borrar para entregar el TP!!

//b) Crear una función buscarLibro(criterio, valor) que permita buscar libros por título, autor o género utilizando el algoritmo de búsqueda lineal.

function buscarLibro(criterio, valor) {

  const criteriosValidos = ["titulo", "autor", "genero"];
if (!criteriosValidos.includes(criterio)) {
  console.log("Criterio inválido. Usa 'titulo', 'autor' o 'genero'.");
  return [];
}  
  const resultados = [];

  for (let i = 0; i < libros.length; i++) {
    
    let libro = libros[i];

    let campo = libro[criterio]?.toString().toLocaleUpperCase();  // Comparación insensible a mayúsculas/minúsculas/todo a letras
    if (campo && campo.includes(valor.toLocaleUpperCase())) {     //Buscar mas metodos o crear funcion para igualar todo lo ingresado
      resultados.push(libro);
    }
  }

  if (resultados.length > 0) {
    console.log(`Resultados para ${criterio} = "${valor}":`);
    resultados.forEach(libro => {
      if (libro.disponible) {
        console.log(`✔ "${libro.titulo}" de ${libro.autor} (${libro.anio}) — DISPONIBLE`);
      } else {
        console.log(`✖ "${libro.titulo}" de ${libro.autor} (${libro.anio}) — NO disponible`);
      }
    });
  } else {
    console.log(`No se encontraron libros con ${criterio} = "${valor}".`);
  }

  return resultados;
}

//buscarLibro("titulo", "1984");                     //Distintas pruebas de búsqueda Borrar para entregar el TP!!
//buscarLibro("autor", "Gabriel García Márquez");
//buscarLibro("genero", "fantasía");
//buscarLibro("anio", "2001");

//c) Desarrollar una función ordenarLibros(criterio) que ordene los libros por título o año utilizando el algoritmo de ordenamiento burbuja (bubble sort) y luego muestre los libros ordenados en la consola

function ordenarLibros(criterio) {
  const criteriosValidos = ["titulo", "anio"];
  if (!criteriosValidos.includes(criterio)) {
    console.log("Criterio inválido. Usa 'titulo' o 'anio'.");
    return;
  }

  const librosOrdenados = [...libros]; // Copia el array original para no modificarlo directamente

  for (let i = 0; i < librosOrdenados.length - 1; i++) {
    for (let j = 0; j < librosOrdenados.length - i - 1; j++) {
      let a = librosOrdenados[j][criterio];
      let b = librosOrdenados[j + 1][criterio];

      // Si el criterio es título, usa orden alfabético
      if (criterio === "titulo") {
        a = a.toLocaleUpperCase();
        b = b.toLocaleUpperCase();
        if (a > b) {
          [librosOrdenados[j], librosOrdenados[j + 1]] = [librosOrdenados[j + 1], librosOrdenados[j]];
        }
      }

      // Si el criterio es año, compara numéricamente
      if (criterio === "anio") {
        if (a > b) {
          [librosOrdenados[j], librosOrdenados[j + 1]] = [librosOrdenados[j + 1], librosOrdenados[j]];
        }
      }
    }
  }

const tablaFormateada = librosOrdenados.map(libro => ({
  Título: libro.titulo,
  Autor: libro.autor,
  Año: libro.anio,
  Género: libro.genero,
  Disponible: libro.disponible ? "Sí" : "No"
}));

console.log(`📚 Libros ordenados por ${criterio === "titulo" ? "Título" : "Año"}:\n`);
console.table(tablaFormateada);
};

//ordenarLibros("titulo"); // Orden alfabético por título Borrar para entregar el TP!!
//ordenarLibros("anio");   // Orden cronológico por año Borrar para entregar el TP!!

//d) Desarrollar una función borrarLibro(id) que elimine el libro que se le pase por parámetro.

function borrarLibro(id) {
  
  const index = libros.findIndex(libro => libro.id === id);

  if (index === -1) {
    console.log(`❌ No se encontró ningún libro con ID ${id}.`);
    return;
  }

  const libro = libros[index];

  
  if (!libro.disponible) {      //Verifica si el libro está prestado 
    console.log(`⚠ El libro "${libro.titulo}" no puede eliminarse porque está actualmente prestado.`);
    return;
  }
  if (index !== -1) {
    const libroEliminado = libros.splice(index, 1)[0];
    console.log(`✅ Libro "${libroEliminado.titulo}" eliminado correctamente.`);
  } else {
    console.log(`❌ No se encontró ningún libro con ID ${id}.`);
  }
}

//borrarLibro(5);  // Elimina el libro con id 5, si existe  Borrar para entregar el TP!!
//borrarLibro(100); // Muestra que no se encontró el libro   Borrar para entregar el TP!!


//PUNTO 3 Gestion de usuarios

//a) Implementar una función registrarUsuario(nombre, email) que agregue un nuevo usuario al array usuarios.

function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    //Inicializo regex para validar el formato del email
  return regex.test(email);
}

function registrarUsuario(nombre, email) {
  if (!esEmailValido(email)) {
    console.log("❌ Formato de email inválido. Ejemplo válido: usuario@dominio.com");  //Chequea que el formato de email sea valido
    return;
  }  
  const existe = usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase()); // Verifica si ya existe un usuario con el mismo email

  if (existe) {
    console.log(`❌ Ya existe un usuario registrado con el email: ${email}`);
    return;
  }

  const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;   // Genera el nuevo ID automaticamente

  const nuevoUsuario = {          //Crea el nuevo usuario
    id: nuevoId,
    nombre: nombre,
    email: email,
    librosPrestados: []
  };

  usuarios.push(nuevoUsuario);
  console.log(`✅ Usuario "${nombre}" registrado correctamente con ID ${nuevoId}.`);
}

//registrarUsuario("Valeria Soto", "valeria.soto@email.com");      //Borrar para entregar el TP!!
//registrarUsuario("Melody De Castro", "melo.decastro@email.com"); // Muestra que ya existe el usuario Borrar para entregar el TP!!

//b)Implementar una funcion que me devuelva el array completo de usuarios.

function mostrarTodosLosUsuarios() {
  if (usuarios.length === 0) {
    console.log("⚠ No hay usuarios registrados.");
  } else {
    console.log("📋 Lista de usuarios registrados:");
    usuarios.forEach(usuario => {                      // Busca los títulos de los libros prestados
        let titulosPrestados = usuario.librosPrestados.map(idLibro => {
        const libro = libros.find(libro => libro.id === idLibro);
        return libro ? libro.titulo : `Libro no encontrado (ID: ${idLibro})`;
      });

      if (titulosPrestados.length === 0) {        // Si no tiene libros prestados muestra un mensaje 
        titulosPrestados = ["Ninguno"];
      }

      console.log(`- ID: ${usuario.id}`);
      console.log(`  Nombre: ${usuario.nombre}`);
      console.log(`  Email: ${usuario.email}`);
      console.log(`  Libros Prestados: ${titulosPrestados.join(", ")}`);
    });
  }

  return usuarios;
}
//mostrarTodosLosUsuarios(); // Muestra todos los usuarios registrados

//console.log(esEmailValido("ejemplo@gmail.com"));     // true  Borrar para entregar el TP!!
//console.log(esEmailValido("sinarroba.com"));         // false  Borrar para entregar el TP!!
//esEmailValido("otra@mal@direccion.com"); // false  Borrar para entregar el TP!!

//c) Crear una función buscarUsuario(email) que devuelva la información de un usuario dado su email.

function buscarUsuario(email) {
  // Validar el formato del email antes de buscar
  if (!esEmailValido(email)) {
    return("❌ Formato de email inválido. Ejemplo válido: usuario@dominio.com");
  }

  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!usuario) {
    return(`❌ No se encontró ningún usuario con el email: ${email}`);
  }

  const titulosPrestados = usuario.librosPrestados.map(idLibro => {
    const libro = libros.find(l => l.id === idLibro);
    return libro ? libro.titulo : `Libro no encontrado (ID: ${idLibro})`;
  });

  const resultadoFormateado =              //Lo uso para que salga el mensaje en un formato bonito
    `✅ Usuario encontrado:\n` +
    `- ID: ${usuario.id}\n` +
    `- Nombre: ${usuario.nombre}\n` +
    `- Email: ${usuario.email}\n` +
    `- Libros Prestados: ${titulosPrestados.length > 0 ? titulosPrestados.join(", ") : "Ninguno"}`;

  return resultadoFormateado;
}

//console.log(buscarUsuario("usuario@correo.com"));   // Buscar si es válido
//console.log(buscarUsuario("usuariomalcorreo.com"));  //Borrar para entregar el TP!! los 3
//console.log(buscarUsuario("vero.muzzio@email.com"));   //Borrar para entregar el TP!! 

//d) Implementar una funcion que elimine el usuario determinado 

function borrarUsuario(nombre, email) {
 
  if (!esEmailValido(email)) {
    console.log("❌ Formato de email inválido. Ejemplo válido: usuario@dominio.com");   //Chquea que el formato de email sea valido
    return;
  }

  const usuario = usuarios.find(
    u =>
      u.nombre.toLocaleUpperCase() === nombre.toLocaleUpperCase() &&  //Busca al usuario por nombre y email pasando todo a mayusculas y corrigiendo la ñ
      u.email.toLowerCase()  === email.toLowerCase()
  );

 
  if (!usuario) {
    console.log(`❌ No se encontró un usuario con nombre "${nombre}" y email "${email}".`);
    return;
  }

  if (usuario.librosPrestados.length > 0) {          //Verifico si el usuario tiene libros prestados
    console.log(`⚠ No se puede eliminar al usuario "${usuario.nombre}" porque tiene libros prestados.`);
    const titulosPrestados = usuario.librosPrestados.map(id => {
    const libro = libros.find(l => l.id === id);
    return libro ? libro.titulo : `(ID ${id} no encontrado)`;
  });

  console.log(`📚 Libros prestados: ${titulosPrestados.join(", ")}`);
  return;
}

  usuarios.splice(index, 1);
  console.log(`✅ Usuario "${usuario.nombre}" eliminado correctamente.`);  //Elimino al usuario si no tiene libros prestados
}

//borrarUsuario("Lucía Fernández", "lucia.fernandez@email.com"); // Elimina si existe
//borrarUsuario("David", "david@correo.com");   
//borrarUsuario("Veronica Muzzio", "vero.muzzio@email.com"); // Elimina si existe Borrar para entregar el TP!!


//PUNTO 4 Sistema de préstamos

//a) Desarrollar una funcion que marque un libro como no disponible y lo agregue a la lista de libros prestados del usuario.

function prestarLibro(idLibro, idUsuario) {
 
  const libro = libros.find(l => l.id === idLibro);       //primero busca el libro por ID para verificar si existe
  if (!libro) {
    console.log(`❌ No se encontró un libro con ID ${idLibro}`);
    return;
  }

  const usuario = usuarios.find(u => u.id === idUsuario);             // Busca al usuario por ID para verificar si existe
  
  if (!usuario) {
    console.log(`❌ No se encontró un usuario con ID ${idUsuario}`);
    return;
  }

  if (usuario.librosPrestados.includes(idLibro)) {          // Verifica si el usuario ya tiene prestado el libro
  console.log(`⚠ El usuario ya tiene prestado el libro "${libro.titulo}".`);
  return;
  }
  
  if (!libro.disponible) {                                            //chequea si el libro está disponible
    console.log(`⚠ El libro "${libro.titulo}" no está disponible.`);
    return;
  }

  usuario.librosPrestados.push(idLibro)      // Registra el préstamo
  
  libro.disponible = false;

  console.log(`✅ El libro "${libro.titulo}" fue prestado a ${usuario.nombre}.`);  //Muestra un mensaje 
  
};  

//prestarLibro(3, 2); // Presta el libro con ID 3 al usuario con ID 2 Borrar para entregar el TP!!
//prestarLibro(6, 2); // Presta el libro con ID 3 al usuario con ID 2 Borrar para entregar el TP!!
//prestarLibro(100, 2); // Presta el libro con ID 3 al usuario con ID 2 Borrar para entregar el TP!!
//prestarLibro(7, 100); // Presta el libro con ID 3 al usuario con ID 2 Borrar para entregar el TP!!
//prestarLibro(6, 3);



//b) Implementar una funcion devolverLibro que marque un libro como disponible y lo elimine de la lista de libros prestados del usuario.

function devolverLibro(idLibro, idUsuario) {
 
  const libro = libros.find(l => l.id === idLibro);    //Busca el libro y chequea si existe
  if (!libro) {
    console.log(`❌ No se encontró un libro con ID ${idLibro}`);
    return;
  }

  const usuario = usuarios.find(u => u.id === idUsuario);    //Busca el usuario y chequea si existe
  if (!usuario) {
    console.log(`❌ No se encontró un usuario con ID ${idUsuario}`);
    return;
  }

  const indexPrestamo = usuario.librosPrestados.findIndex(p => p === idLibro);  //Chequea si el usuario tiene ese libro prestado
  if (indexPrestamo === -1) {
    console.log(`⚠ El usuario "${usuario.nombre}" no tiene prestado el libro "${libro.titulo}".`);
    return;
  }

  libro.disponible = true;      //Marca el libro como disponible

  usuario.librosPrestados.splice(indexPrestamo, 1);   //Elimina el préstamo de la lista

  console.log(`✅ El libro "${libro.titulo}" fue devuelto por ${usuario.nombre}.`);   //Muestra un mensaje de confirmación
}

//devolverLibro(3, 2);
//devolverLibro(100, 2); // Muestra que no se encontró el libro Borrar para entregar el TP!!
//devolverLibro(7, 100); // Muestra que no se encontró el usuario Borrar para entregar el TP!!

// PUNTO 5 Sistema de prestamos

//a) Crear una funcion para generar un reporte con la cantidad total de libros, la cantidad de libros prestados, la cantidad de libros por genero y el libro mas antiguo y mas nuevo.

function generarReporteLibros() {     //Chequea si hay libros registrados
  if (libros.length === 0) {
    console.log("⚠ No hay libros registrados en el sistema.");
    return;
  }

  const totalLibros = libros.length;  //Cantidad total de libros

  const disponibilidad = libros.map(libro => libro.disponible);  //Cantidad de libros prestados usando map y filter
  const librosPrestados = disponibilidad.filter(disponible => !disponible).length;

  const generos = libros.map(libro => libro.genero);      //Cantidad de libros por género con map y reduce
  const librosPorGenero = generos.reduce((acc, genero) => {
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});
 
  const libroMasAntiguo = libros.reduce((antiguo, actual) => { //Libro más antiguo (menor año)
    return actual.anio < antiguo.anio ? actual : antiguo;
  });

  const libroMasNuevo = libros.reduce((nuevo, actual) => { //Libro más nuevo (mayor año)
    return actual.anio > nuevo.anio ? actual : nuevo;
  });

  const tablaGenero = Object.entries(librosPorGenero).map(([genero, cantidad]) => ({
  Género: genero,
  Cantidad: cantidad
}));

  console.log("📊 Reporte de Biblioteca:");         //Mostrando el reporte  
  console.log(`📚 Total de libros: ${totalLibros}`);
  console.log(`📕 Libros prestados: ${librosPrestados}`);
  console.log("📘 Cantidad de libros por género:");
  console.table(tablaGenero);
  console.log(`📖 Libro más antiguo: "${libroMasAntiguo.titulo}" (${libroMasAntiguo.anio})`);
  console.log(`📗 Libro más nuevo: "${libroMasNuevo.titulo}" (${libroMasNuevo.anio})`);
}
//generarReporteLibros(); // Llama a la función para generar el reporte 

//PUNTO 6 Identificacion avanzada de libros

// Implementar una función que identifique y muestre todos los libros cuyo título contiene más de una palabra (no títulos que contengan números ni otros caracteres). La función debe devolver un array con los títulos de esos libros y mostrarlo en la consola.

function librosConPalabrasEnTitulo() {
  
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;   // Expresión regular: solo letras (mayúsculas o minúsculas) y espacios

  const librosValidos = libros
    .filter(libro => {
      const titulo = libro.titulo.trim();
      const palabras = titulo.split(/\s+/);
      return (
        palabras.length > 1 &&    //Más de una palabra
        regex.test(titulo)        //Solo letras y espacios
      );
    })
    .map(libro => ({      //Devuelve los títulos
       Titulo: libro.titulo
    })) 
  
  if (librosValidos.length > 0) {
    console.log("📚 Libros con títulos válidos de más de una palabra:");    //Muestra por consola
    console.table(librosValidos);
  } else {
    console.log("❌ No se encontraron libros con títulos válidos de más de una palabra.");
  }

  return librosValidos;
}

//const titulosValidos = librosConPalabrasEnTitulo(); //Llama a la función para obtener los títulos válidos.

//PUNTO 7 Calculos estadisticos

//a)Desarrollar una función que utilice el objeto Math para calcular y mostrar: elpromedio de años de publicación de los libros, el año de publicación más frecuente y la diferencia en años entre el libro más antiguo y el más nuevo.

function calcularEstadisticas() {
  if (libros.length === 0) {        //Chequea si hay libros registrados
    console.log("⚠ No hay libros registrados para calcular estadísticas.");
    return;
  }

  const anios = libros.map(libro => libro.anio);  //Obtiene todos los años de publicación

  const suma = anios.reduce((acc, anio) => acc + anio, 0);
  const promedio = Math.round(suma / anios.length);     //Saca el promedio

  const frecuencia = {};
  anios.forEach(anio => {
    frecuencia[anio] = (frecuencia[anio] || 0) + 1;   //Cuenta la frecuencia de cada año
  });

  let moda = null;
  let maxFrecuencia = 0;
  for (const anio in frecuencia) {
    if (frecuencia[anio] > maxFrecuencia) {   //Encuentra el año más frecuente
      maxFrecuencia = frecuencia[anio];
      moda = anio;
    }
  }

  const anioMin = Math.min(...anios);
  const anioMax = Math.max(...anios);
  const diferencia = anioMax - anioMin;    //Calcula la diferencia entre el más nuevo y el más antiguo

  console.log("📈 Estadísticas de los años de publicación:");   //Mostrando los resultados
  console.log(`🔢 Promedio de publicación: ${promedio}`);
  console.log(`🔁 Año más frecuente: ${moda} (repetido ${maxFrecuencia} veces)`);
  console.log(`📏 Diferencia entre el libro más antiguo (${anioMin}) y el más nuevo (${anioMax}): ${diferencia} años`);
}
//calcularEstadisticas();     // Llama a la función para calcular las estadísticas 


//PUNTO 8 Manejo de cadenas

//a)Crear una función que utilice métodos de strings para: convertir todos los títulos a mayúsculas, eliminar espacios en blanco al inicio y final de los nombres de autores y formatear los emails de los usuarios a minúsculas.

function normalizarDatos() {
 
  libros.forEach(libro => {
    libro.titulo = libro.titulo.toLocaleUpperCase();        // Mayúsculas en título
    libro.autor = libro.autor.trim();                 // Eliminar espacios en autor
  });

    usuarios.forEach(usuario => {
    usuario.email = usuario.email.toLowerCase();      // Email en minúsculas
  });

  console.log("✅ Datos normalizados correctamente.");  //Mensaje de confirmación
}
//normalizarDatos(); // Llama a la función para normalizar los datos 

//PUNTO 9 Interfaz de usuario por consola 

//a) Implementar una función que muestre un menú de opciones al usuario y permita interactuar con el sistema utilizando prompt().

function menuPrincipal() {
  let opcion;
  let opcionNum = Number(opcion);

  do {
    opcion = prompt(
      "📚 MENÚ PRINCIPAL - Sistema de Biblioteca\n\n" +
      "1. Agregar libro\n" +
      "2. Buscar libro\n" +
      "3. Ordenar libros\n" +
      "4. Borrar libro\n" +
      "5. Registrar usuario\n" +
      "6. Mostrar todos los usuarios\n" +
      "7. Buscar usuario\n" +
      "8. Borrar usuario\n" +
      "9. Prestar libro\n" +
      "10. Devolver libro\n" +
      "11. Generar reporte de libros\n" +
      "12. Libros con títulos de más de una palabra\n" +
      "13. Calcular estadísticas de publicación\n" +
      "14. Normalizar datos\n" +
      "15. Salir\n\n" +
      "Ingrese el número de la opción: "
    )?.trim();

    if (!/^\d+$/.test(opcion)) {        // Verifica si la opción es un número
      console.log("⚠ Ingrese un número válido (1 al 15).");
      continue;
  
  }
  opcionNum = Number(opcion);
  
  switch (opcionNum) {
    case 1:
        console.clear();

        const titulo = prompt("📖 Ingrese el título del libro:")?.trim();
        const autor = prompt("✍ Ingrese el autor del libro:")?.trim();
        const anioStr = prompt("📅 Ingrese el año de publicación:");
        const genero = prompt("🏷️ Ingrese el género del libro:")?.trim();

         // Validaciones
        const anio = parseInt(anioStr);

        if (!titulo || !autor || !genero || isNaN(anio)) {
          console.log("⚠ Todos los campos son obligatorios y el año debe ser un número válido.");
          break;
        }

        agregarLibro(titulo, autor, anio, genero);
        break;

    case 2:
         console.clear();

         const criterioBuscar = prompt(
         "🔍 Buscar por (titulo, autor, genero): "
         ).trim().toLowerCase();

         const criteriosValidos = ["titulo", "autor", "genero"];
         if (!criteriosValidos.includes(criterioBuscar)) {
          console.log("⚠ Criterio inválido. Solo se permite: titulo, autor o genero.");
          break;
        }

         const valorBuscar = prompt(`Ingrese el valor a buscar por ${criterioBuscar}:`).trim();

         if (!valorBuscar) {
          console.log("⚠ No se ingresó ningún valor de búsqueda.");
          break;
        }

        buscarLibro(criterioBuscar, valorBuscar);
        break;

    case 3:
        console.clear();

        const criterioOrden = prompt(
          "¿Por qué criterio desea ordenar los libros?\nEscriba 'titulo' o 'anio':"
          ).trim().toLowerCase();

        if (criterioOrden !== "titulo" && criterioOrden !== "anio") {
          console.log("⚠ Criterio inválido. Debe ser 'titulo' o 'anio'.");
        } else {
          ordenarLibros(criterioOrden);
        }

        break;

    case 4:
        console.clear();

        if (libros.length === 0) {
          console.log("⚠ No hay libros en la biblioteca para borrar.");
          break;
        }

        console.log("📚 Lista de libros actuales:");
        console.table(libros);

        const idABorrar = parseInt(prompt("Ingrese el ID del libro que desea borrar:"));

        if (isNaN(idABorrar)) {
          console.log("⚠ Debe ingresar un número válido como ID.");
        } else {
          borrarLibro(idABorrar);
        }

        break;

    case 5:
        const nombreUsuario = prompt("Nombre del usuario:");
        const emailUsuario = prompt("Email del usuario:");
        registrarUsuario(nombreUsuario, emailUsuario);
        break;

    case 6:
        mostrarTodosLosUsuarios();
        break;

    case 7:
        console.clear();

        const emailBuscado = prompt("Ingrese el email del usuario a buscar:");

        if (!emailBuscado) {
          console.log("⚠ No se ingresó ningún email.");
          break;
        }

        const resultado = buscarUsuario(emailBuscado);

        console.log(resultado);   // Mostrar en consola para desarrollador
        break;

    case 8:
        const nombreBorrar = prompt("Nombre del usuario a borrar:");
        const emailBorrar = prompt("Email del usuario a borrar:");
        borrarUsuario(nombreBorrar, emailBorrar);
        break;

    case 9:
        console.clear();

        const librosDisponibles = libros.filter(l => l.disponible);
        if (librosDisponibles.length === 0) {
          console.log("⚠ No hay libros disponibles para prestar.");
          break;
        }

        console.log("📚 Libros disponibles:");
        console.table(librosDisponibles);

        console.log("👤 Usuarios registrados:");
        console.table(usuarios);

        const idLibroPrestar = parseInt(prompt("Ingrese el ID del libro a prestar:"));
        const idUsuarioPrestar = parseInt(prompt("Ingrese el ID del usuario:"));

        if (isNaN(idLibroPrestar) || isNaN(idUsuarioPrestar)) {
          console.log("⚠ Debe ingresar números válidos para ID de libro y usuario.");
        } else {
          prestarLibro(idLibroPrestar, idUsuarioPrestar);
      }
      break;

    case 10:
        console.clear();
        const librosPrestados = libros.filter(l => !l.disponible);

        if (librosPrestados.length === 0) {
        console.log("✅ No hay libros prestados actualmente.");
        break;
        }

        console.log("📚 Libros actualmente prestados:");
        console.table(librosPrestados);

        console.log("👤 Lista de usuarios:");
        console.table(usuarios);

        const idLibro = parseInt(prompt("Ingrese el ID del libro a devolver:"));
        const idUsuario = parseInt(prompt("Ingrese el ID del usuario que devuelve el libro:"));

        if (isNaN(idLibro) || isNaN(idUsuario)) {
          console.log("⚠ Debe ingresar números válidos para el ID del libro y del usuario.");
        } else {
          devolverLibro(idLibro, idUsuario);
       }
       break;

    case 11:
        generarReporteLibros();
        break;

    case 12:
        librosConPalabrasEnTitulo();
        break;

    case 13:
        calcularEstadisticas();
        break;

    case 14:
        normalizarDatos();
        break;

    case 15:
        console.log("👋 Gracias por usar el sistema de biblioteca.");
        break;

    default:
        console.log("⚠ Opción inválida. Por favor, ingrese un número del 1 al 15.");
        break
    }

  } while (opcionNum !== 15);
}
console.clear();
console.log("=======================================");
console.log("📚 Bienvenido al Sistema de Biblioteca");
console.log("=======================================");
menuPrincipal(); // Llama a la función para iniciar el menú principal Borrar para entregar el TP!!
// Fin del sistema de gestión de biblioteca
