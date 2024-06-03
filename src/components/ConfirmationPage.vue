<template>
    <div class="confirmation-container">
        <h2>¡GRACIAS POR REGISTRARTE!</h2>
        <img src="../assets/check.png" alt="">
        <p>Tu registro ha sido exitoso, si necesitas ayuda puedes comunicar con nosotros</p>
        <v-btn color="primary" @click="goHome">
            Nuevo Registro
        </v-btn>
    </div>
</template>
<script>
export default {
    name: 'ConfirmationPage',
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
.confirmation-container {
    text-align: center;

    & p {
        margin: 20px 0;
    }
}

img {
    width: 100px;
    display: block;
    margin: 20px auto;
}
@media screen and (max-width: 600px) {
    .confirmation-container {
        width: 90%;
    }
}
</style>