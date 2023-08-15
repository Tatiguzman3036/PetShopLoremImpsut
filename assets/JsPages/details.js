const { createApp } = Vue;

createApp({
    data(){
        return{
            producto:[]
        }
    },

    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
        .then(res => res.json())
        .then(data => {
            
            this.arrayProductos = data

            const params = new URLSearchParams(location.search);
            const idParams = params.get(`_id`)
            
            this.producto = this.arrayProductos.find((articulo => articulo._id == idParams))

            console.log(this.arrayProductos)

            document.title = `Details / ${this.producto.producto }`

          

            console.log(this.producto)
            console.log(idParams)

        }).catch(error => console.log(error))
    }
}).mount(`#app`)




