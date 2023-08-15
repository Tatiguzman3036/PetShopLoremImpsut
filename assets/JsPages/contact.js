const {createApp} = Vue 

createApp({
    data(){
        return {
            open: false,
            hayDatosIngresados: false,
            mostrarDatosIngresados: false,
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            mascota: '',
            mensaje: '',
            datosIngresados: []
        }
    },
    computed: {
        validarDatosIngresados() {
            this.hayDatosIngresados = this.nombre != '' && this.apellido != '' && this.mensaje != ''
        }
    },
    methods: {
        enviarDatosFormulario() {
            const nombreUsuario = this.nombre
            this.datosIngresados.push({
                nombre: this.nombre,
                apellido: this.apellido,
                mensaje: this.mensaje
            })
            this.resetearFormulario()
            this.mostrarDatosIngresados = true
                alertify.alert("Your query has been sent correctly", `We will contact you soon, thanks! ${nombreUsuario}`).set('closable', false)
        },
        resetearFormulario() {
            this.nombre = this.apellido = this.telefono = this.email = this.mascota = this.mensaje = ''
        }
    },
}).mount('#app')