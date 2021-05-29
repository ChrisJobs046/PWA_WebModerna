//aqui esta el nombre de nuestro cache
const staticDevPWACoffee = "dev-pwacoffee-site-v1";

//estos serian los recursos para almacenar en si mismo
const assets = [

    "/",
    "/Index.html",
    "/Style.css",
    "/App.js",
    "/images/coffee1.jpg",
    "/images/coffee2.jpg",
    "/images/coffee3.jpg",
    "/images/coffee4.jpg",
    "/images/coffee5.jpg",
    "/images/coffee6.jpg",
    "/images/coffee7.jpg",
    "/images/coffee8.jpg",
    "/images/coffee9.jpg",
];

/*
self es el propio service worker. Nos permite escuchar los eventos del ciclo de vida y hacer algo a cambio.

El service worker tiene varios ciclos de vida y uno de ellos es el evento install. 
Se ejecuta cuando se instala el service worker. Se activa tan pronto se ejecuta y solo es llamado una vez por cada service worker.

Cuando se dispara el evento install, ejecutamos el callback que nos da acceso al objecto event.

Almacenar cosas en la caché del navegador puede tardar un tiempo en finalizar porque es asíncrono.

Entonces, para manejarlo necesitamos usar el método waitUntil(), el cual espera a que termine la acción.

Una vez que la API de caché este lista, podemos ejecutar el método open() y 
crear nuestra caché pasando su nombre como argumento a caches.open(staticDevCoffee).

Luego esta devuelve una promesa, que nos ayuda a almacenar nuestros recursos en la caché con cache.addAll(assets).
*/
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevPWACoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})

/*
Aquí usamos el evento fetch para recuperar nuestros datos. El callback nos da acceso a fetchEvent. 
Luego le adjuntamos respondWith() para evitar la respuesta predeterminada del navegador. 
En su lugar devuelve una promesa, ya que la acción de recuperación puede tardar un tiempo en completarse.

Y una vez listo el caché, aplicamos el método caches.match(fetchEvent.request). 
Este verificará si algo en el caché coincide con fetchEvent.request. Por cierto, 
fetchEvent.request es solo nuestro arreglo de recursos.
*/

/*
Ahora, nuestros recursos pueden ser almacenados en caché y recuperados por el service worker, 
lo que aumenta bastante el tiempo de carga de nuestras imágenes.

Y lo más importante, hace que nuestra aplicación esté disponible en modo fuera de línea.
*/
self.addEventListener("fetch", fetchEvent => {

    fetchEvent.responseWith(

        cache.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})