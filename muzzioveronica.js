//Sistema de gestion de biblioteca

//PUNTO 1  Estructura de datos
//a)Crear un array de objetos llamado libros que contenga al menos 10 libros

const prompt = require("prompt-sync")(); // Importa la librería prompt-sync para usar prompt

let libros = [            // Array de objetos con los libros        
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

//b) Crear un array de objetos llamado usuarios con al menos 5 usuarios

let usuarios = [                // Array de objetos con los usuarios
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

//PUNTO 2 Funciones de gestion de libros

//a)Implementar una función agregarLibro(id, titulo, autor, anio, genero) que agregue un nuevo libro al array libros.

function agregarLibro(titulo, autor, anio, genero) {
  
  function normalizarTexto(texto) {
    return texto
      .trim()              // elimina espacios al inicio y final  
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

  libros.push(nuevoLibro);        // Agrega el nuevo libro al array
  console.log(`Libro "${titulo}" agregado con ID ${nuevoId}.`); //Muestra que se agregó el libro y el numero de ID
}

//b) Crear una función buscarLibro(criterio, valor) que permita buscar libros por título, autor o género utilizando el algoritmo de búsqueda lineal.

function buscarLibro(criterio, valor) {

  const criteriosValidos = ["titulo", "autor", "genero"];
    if (!criteriosValidos.includes(criterio)) {     // Verifica si el criterio es válido
    console.log("Criterio inválido. Usa 'titulo', 'autor' o 'genero'.");
    return [];
  }  
  const resultados = [];

  for (let i = 0; i < libros.length; i++) {      // Recorre el array de libros
    
    let libro = libros[i];

    let campo = libro[criterio]?.toString().toLocaleUpperCase();  // Comparación insensible a mayúsculas/minúsculas/todo a letras, respeta la ñ
    if (campo && campo.includes(valor.toLocaleUpperCase())) {     //Buscar mas metodos o crear funcion para igualar todo lo ingresado
      resultados.push(libro);
    }
  }

  if (resultados.length > 0) {
    console.log(`Resultados para ${criterio} = "${valor}":`);   // Muestra los resultados encontrados
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

//c) Desarrollar una función ordenarLibros(criterio) que ordene los libros por título o año utilizando el algoritmo de ordenamiento burbuja (bubble sort) y luego muestre los libros ordenados en la consola

function ordenarLibros(criterio) {     // Verifica si el criterio es válido
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

const tablaFormateada = librosOrdenados.map(libro => ({    // Formatea los datos para mostrar en la tabla
  Título: libro.titulo,
  Autor: libro.autor,
  Año: libro.anio,
  Género: libro.genero,
  Disponible: libro.disponible ? "Sí" : "No"
}));

console.log(`📚 Libros ordenados por ${criterio === "titulo" ? "Título" : "Año"}:\n`);
console.table(tablaFormateada);
};

//d) Desarrollar una función borrarLibro(id) que elimine el libro que se le pase por parámetro.

function borrarLibro(id) {
  
  const index = libros.findIndex(libro => libro.id === id);    // Busca el índice del libro por ID

  if (index === -1) {
    console.log(`❌ No se encontró ningún libro con ID ${id}.`);
    return;
  }

  const libro = libros[index];

  
  if (!libro.disponible) {      //Verifica si el libro está prestado y si esta prestado no lo elimina
    console.log(`⚠ El libro "${libro.titulo}" no puede eliminarse porque está actualmente prestado.`);
    return;
  }
  if (index !== -1) {
    const libroEliminado = libros.splice(index, 1)[0];   // Elimina el libro del array y guarda el libro eliminado
    console.log(`✅ Libro "${libroEliminado.titulo}" eliminado correctamente.`);
  } else {
    console.log(`❌ No se encontró ningún libro con ID ${id}.`);
  }
}

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

  usuarios.push(nuevoUsuario);      // Agrega el nuevo usuario al array
  console.log(`✅ Usuario "${nombre}" registrado correctamente con ID ${nuevoId}.`);    // Muestra un mensaje de confirmación
};

//b)Implementar una funcion que me devuelva el array completo de usuarios.

function mostrarTodosLosUsuarios() {
  if (usuarios.length === 0) {        // Verifica si hay usuarios registrados
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

      console.log(`- ID: ${usuario.id}`);       //Muestra los resultados
      console.log(`  Nombre: ${usuario.nombre}`);
      console.log(`  Email: ${usuario.email}`);
      console.log(`  Libros Prestados: ${titulosPrestados.join(", ")}`);
    });
  }

  return usuarios;
}

//c) Crear una función buscarUsuario(email) que devuelva la información de un usuario dado su email.

function buscarUsuario(email) {
  // Validar el formato del email antes de buscar
  if (!esEmailValido(email)) {
    return("❌ Formato de email inválido. Ejemplo válido: usuario@dominio.com");
  }

  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());  // Busca al usuario por email, ignorando mayúsculas/minúsculas

  if (!usuario) {
    return(`❌ No se encontró ningún usuario con el email: ${email}`);   // Si no se encuentra el usuario, devuelve un mensaje de error
  }

  const titulosPrestados = usuario.librosPrestados.map(idLibro => {   // Busca los títulos de los libros prestados
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

 
  if (!usuario) {                                         // Si no se encuentra el usuario, muestra un mensaje de error
    console.log(`❌ No se encontró un usuario con nombre "${nombre}" y email "${email}".`);
    return;
  }

  if (usuario.librosPrestados.length > 0) {          //Verifico si el usuario tiene libros prestados
    console.log(`⚠ No se puede eliminar al usuario "${usuario.nombre}" porque tiene libros prestados.`);
    const titulosPrestados = usuario.librosPrestados.map(id => {
    const libro = libros.find(l => l.id === id);
    return libro ? libro.titulo : `(ID ${id} no encontrado)`;
  });

  console.log(`📚 Libros prestados: ${titulosPrestados.join(", ")}`);  //Muestra los resultados

  return;
}

  usuarios.splice(index, 1);
  console.log(`✅ Usuario "${usuario.nombre}" eliminado correctamente.`);  //Elimino al usuario si no tiene libros prestados
}

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

  const tablaGenero = Object.entries(librosPorGenero).map(([genero, cantidad]) => ({  // Crea una tabla con la cantidad de libros por género
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

//PUNTO 9 Interfaz de usuario por consola 

//a) Implementar una función que muestre un menú de opciones al usuario y permita interactuar con el sistema utilizando prompt().

function menuPrincipal() {   //Kike probe la solucion que vos me pasaste, lo vimos con las chicas en el grupo de Whatsapp, probe las mil soluciones distintas que me tira la IA cada vez que le pregunto y sigue haciendo lo mismo (quiero llorar porque debe ser un ; o algo asi)

  let opcion;
  
  do {

    opcion = prompt(          // Muestra el menú principal con las opciones disponibles
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

    opcionNum = parseInt(opcion); // convierte la entrada a número

    if (isNaN(opcionNum) || opcionNum < 1 || opcionNum > 15) {
      console.log("⚠ Ingrese un número válido (1 al 15).");
      continue; // vuelve a mostrar el menu
    }
    
  switch (opcionNum) {
    case 1:
        console.clear();  // Limpia la consola antes de mostrar el formulario

        const titulo = prompt("📖 Ingrese el título del libro: ")?.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const autor = prompt("✍ Ingrese el autor del libro: ")?.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const anioStr = prompt("📅 Ingrese el año de publicación: ")?.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const genero = prompt("🏷️ Ingrese el género del libro: ")?.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

         // Validaciones
        const anio = parseInt(anioStr);

        if (!titulo || !autor || !genero || isNaN(anio)) {  // Verifica si los campos están vacíos o si el año no es un número válido
          console.log("⚠ Todos los campos son obligatorios y el año debe ser un número válido.");
          break;
        }

        agregarLibro(titulo, autor, anio, genero);   //Agrega el libro
        break;

    case 2:
         console.clear();

         const criterioBuscar = prompt(     // Solicita al usuario el criterio de búsqueda
         "🔍 Buscar por (titulo, autor, genero): "
         ).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

         const criteriosValidos = ["titulo", "autor", "genero"];   //Verifica si el criterio es válido
         if (!criteriosValidos.includes(criterioBuscar)) {
          console.log("⚠ Criterio inválido. Solo se permite: titulo, autor o genero.");
          break;
        }

         const valorBuscar = prompt(`Ingrese el valor a buscar por ${criterioBuscar}:`).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();   // Verifica si el valor de búsqueda no está vacío

         if (!valorBuscar) {
          console.log("⚠ No se ingresó ningún valor de búsqueda.");   // Si el valor de búsqueda está vacío muestra un mensaje 
          break;
        }

        buscarLibro(criterioBuscar, valorBuscar);   // Llama a la función de búsqueda
        break;

    case 3:
        console.clear();  //Este sigue haciendo la pregunta cada vez que pones un caracter (quiero llorar) para mi es el mismo error que en el caso del menu con las opciones de dos digitos y no lo encuentro (lloro)

        const criterioOrden = prompt(         // Solicita al usuario el criterio de ordenamiento
          "¿Por qué criterio desea ordenar los libros?\nEscriba 'titulo' o 'anio':"
          ).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (criterioOrden !== "titulo" && criterioOrden !== "anio") {   // Verifica si el criterio es válido
          console.log("⚠ Criterio inválido. Debe ser 'titulo' o 'anio'.");
        } else {
          ordenarLibros(criterioOrden);           // Llama a la función de ordenamiento
        }

        break;

    case 4:
        console.clear();

        if (libros.length === 0) {    // Verifica si hay libros en la biblioteca
          console.log("⚠ No hay libros en la biblioteca para borrar.");
          break;
        }

        console.log("📚 Lista de libros actuales:");   //Muestra la lista de libros
        console.table(libros);

        const idABorrar = parseInt(prompt("Ingrese el ID del libro que desea borrar:"));    // Solicita al usuario el ID del libro 

        if (isNaN(idABorrar)) {      // Verifica si el ID ingresado es un número válido
          console.log("⚠ Debe ingresar un número válido como ID.");
        } else {
          borrarLibro(idABorrar);      // Llama a la función de borrado
        }

        break;

    case 5:
        console.clear();
        const nombreUsuario = prompt("Nombre del usuario:");  // Solicita el nombre del usuario
        const emailUsuario = prompt("Email del usuario:");  // Solicita el email del usuario
        registrarUsuario(nombreUsuario, emailUsuario);    // Llama a la función de registro de usuario
        break;

    case 6:
        console.clear();
        mostrarTodosLosUsuarios();   // Muestra todos los usuarios registrados
        break;

    case 7:
        console.clear();

        const emailBuscado = prompt("Ingrese el email del usuario a buscar:");   // Verifica si el email ingresado no está vacío

        if (!emailBuscado) {
          console.log("⚠ No se ingresó ningún email.");    // Si el email está vacío muestra un mensaje
          break;
        }

        const resultado = buscarUsuario(emailBuscado);   // Llama a la función de búsqueda de usuario

        console.log(resultado);   // Mostrar en consola para desarrollador
        break;

    case 8:
        console.clear();
        const nombreBorrar = prompt("Nombre del usuario a borrar:");   // Solicita el nombre del usuario a borrar
        const emailBorrar = prompt("Email del usuario a borrar:");    // Solicita el email del usuario a borrar
        borrarUsuario(nombreBorrar, emailBorrar);                    // Llama a la función de borrado de usuario
        break;

    case 9:
        console.clear();

        const librosDisponibles = libros.filter(l => l.disponible);  // Filtra los libros disponibles para prestar
        if (librosDisponibles.length === 0) {
          console.log("⚠ No hay libros disponibles para prestar.");  // Si no hay libros disponibles muestra un mensaje
          break;
        }

        console.log("📚 Libros disponibles:");   //Muestra la lista de libros disponibles
        console.table(librosDisponibles);

        console.log("👤 Usuarios registrados:");  // Muestra la lista de usuarios registrados
        console.table(usuarios);

        const idLibroPrestar = parseInt(prompt("Ingrese el ID del libro a prestar:"));  // Solicita el ID del libro a prestar
        const idUsuarioPrestar = parseInt(prompt("Ingrese el ID del usuario:"));   // Solicita el ID del usuario 

        if (isNaN(idLibroPrestar) || isNaN(idUsuarioPrestar)) {        // Verifica si los IDs ingresados son números válidos
          console.log("⚠ Debe ingresar números válidos para ID de libro y usuario.");
        } else {
          prestarLibro(idLibroPrestar, idUsuarioPrestar);    // Llama a la función de préstamo de libro
      }
      break;

    case 10:
        console.clear();
        const librosPrestados = libros.filter(l => !l.disponible);   // Filtra los libros que están prestados

        if (librosPrestados.length === 0) {
        console.log("✅ No hay libros prestados actualmente.");   // Si no hay libros prestados muestra un mensaje
        break;
        }

        console.log("📚 Libros actualmente prestados:");   // Muestra la lista de libros prestados
        console.table(librosPrestados);

        console.log("👤 Lista de usuarios:");       // Muestra la lista de usuarios registrados

        const idLibro = parseInt(prompt("Ingrese el ID del libro a devolver:"));  // Solicita el ID del libro a devolver
        const idUsuario = parseInt(prompt("Ingrese el ID del usuario que devuelve el libro:"));  // Solicita el ID del usuario que devuelve el libro

        if (isNaN(idLibro) || isNaN(idUsuario)) {    // Verifica si los IDs ingresados son números válidos
          console.log("⚠ Debe ingresar números válidos para el ID del libro y del usuario.");
        } else {
          devolverLibro(idLibro, idUsuario);    // Llama a la función de devolución de libro
       }
       break;

    case 11:
        console.clear();
        generarReporteLibros();  // Llama a la función para generar el reporte de libros
        break;

    case 12:
        console.clear();
        librosConPalabrasEnTitulo(); // Llama a la función para identificar libros con títulos de más de una palabra
        break;

    case 13:
        console.clear();
        calcularEstadisticas();  // Llama a la función para calcular estadísticas de los libros
        break;

    case 14:
        console.clear();
        normalizarDatos();  // Llama a la función para normalizar los datos de los libros y usuarios
        break;

    case 15:
        console.clear();
        console.log("👋 Gracias por usar el sistema de biblioteca.");  //Muestra mensaje de despedida
        break;

    default:
        console.log("⚠ Opción inválida. Por favor, ingrese un número del 1 al 15.");  //Muestra mensaje de error
        break
    }

  } while (opcionNum !== 15);
}
console.clear();
console.log("=======================================");
console.log("📚 Bienvenido al Sistema de Biblioteca");
console.log("=======================================");
menuPrincipal(); // Llama a la función para iniciar el menú principal 

// Fin del sistema de gestión de biblioteca
