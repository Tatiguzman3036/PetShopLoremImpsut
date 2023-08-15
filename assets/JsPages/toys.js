const { createApp } = Vue

createApp({
    data(){
        return{
            articulos: [],
            articulosMostrar: [],
            vModelSearch:"",
            vModelCheck: [],
            arrayCarrito: []
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
        .then(response => response.json())
        .then((data) =>{
            this.articulos = data;
            this.articulosMostrar = this.articulos.filter(item => item.categoria == "jugueteria" )
            this.arrayCarrito = this.getLocalStorage() ?? []
        })

    },
    methods: {
        añadirCarrito(id){
            if(this.arrayCarrito.find(articuloCarrito => articuloCarrito.articulo._id == id)) {
                return alertify.success('Added to the cart');
            } 

            const aux = this.articulosMostrar.find(articulo => articulo._id == id)
            this.arrayCarrito.push({articulo: aux, cantidad: 1});
            const json = JSON.stringify(this.arrayCarrito)
            localStorage.setItem("carrito", json)
        },
        borrarCarrito(id){
            this.arrayCarrito = this.arrayCarrito.filter(articuloCarrito => articuloCarrito.articulo._id != id)
            const json = JSON.stringify(this.arrayCarrito)
            localStorage.setItem("carrito", json)
        },
        incrementarCantidadCarrito(id) {
            console.log(id)
            const articuloCarrito = this.arrayCarrito.find(articuloCarrito => articuloCarrito.articulo._id == id)
            if(articuloCarrito) {
                if(articuloCarrito.cantidad < articuloCarrito.articulo.disponibles){
                    articuloCarrito.cantidad += 1
                }
                const json = JSON.stringify(this.arrayCarrito)
                localStorage.setItem("carrito", json)
            }
        },
        decrementarCantidadCarrito(id) {
            console.log(id)
            const articuloCarrito = this.arrayCarrito.find(articuloCarrito => articuloCarrito.articulo._id == id)
            if(articuloCarrito) {
                if (articuloCarrito.cantidad > 1) {
                    articuloCarrito.cantidad -= 1
                }
                const json = JSON.stringify(this.arrayCarrito)
                localStorage.setItem("carrito", json)
            }
        },
        getLocalStorage(){
            return JSON.parse(localStorage.getItem("carrito"))
        },        
        vaciarStorage(){
            localStorage.removeItem("carrito")
            this.arrayCarrito = []
        }
    },


    computed: {
        
        filtro(){
            let articulo = this.articulosMostrar

            if(this.vModelSearch){
                articulo = articulo.filter(item => item.producto.toLowerCase().includes(this.vModelSearch.toLowerCase()))
            }
            return articulo
        },
        funcionPrecioTotal(){
            return this.arrayCarrito.reduce((acumulador, item)=> acumulador + item.articulo.precio * item.cantidad, 0 )
        }
    } 
}).mount('#app');