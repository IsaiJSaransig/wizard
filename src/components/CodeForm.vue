<template>
    <div>
        <h3>Haz clic en "Solicitar código"</h3>
        <p>Enviaremos un <b>mensaje de texto</b> a tu número de celular.</p>
        <p>El código tiene vida de 2 minutos.</p>
    </div>
    <v-form>
        <v-otp-input :disabled="loading" :error="error" v-model="otp"></v-otp-input>
        <v-btn color="primary" width="100%" :loading="loading" @click="onSubmit">VALIDAR CÓDIGO</v-btn>
    </v-form>
    <p>Si no recibiste el código haz click nuevamente en "Solicitar código"</p>
</template>
<script>
export default {
    name: 'CodeForm',
    data() {
        return {
            name: '',
            error: false,
            otp: '',
            loading: false
        }
    },
    methods: {
        onSubmit() {
            if (!this.otp) {
                return this.loading = true
            }
            setTimeout(() => (this.loading = false), 2000)
        }
    }

}

</script>
<style scoped>
.code {
    width: 10%;
    display: inline-block;
    margin-right: 2%
}

.code-form {
    margin: 30px auto;
    text-align: center;
}
</style>