const {createApp} = Vue;

const app = createApp ({//recibe propiedades 
    data(){
        return{
            info: [],
            imagenesCarrusel1:[],
            imagenesCarrusel2:[]
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
        .then(res => res.json())
        .then (data => {
            this.info = data
            this.imagenesCarrusel1 = this.info.filter(elemento => elemento.disponibles > 5 )
            console.log(this.imagenesCarrusel1);
            this.imagenesCarrusel2 = this.info.filter(elemento => elemento.disponibles === 1 )
            console.log(this.imagenesCarrusel2);
        })
    }
})
.mount ('#app')
