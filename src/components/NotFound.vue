<template>
    <div class="not-found-container">
        <h1>404</h1>
        <h3>Página no encontrada</h3>
        <p>No pudimos encontrar la página que estás buscando</p>
        <v-btn color="primary" @click="goHome">Ir a inicio</v-btn>
    </div>
</template>
<script>
export default {
    name: 'NotFound',
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>
<style scoped >
    .not-found-container{
        text-align: center;
        margin-top: 100px;
        & p{
            margin: 20px 0;
        }
    }
    h1{
        font-size: 100px;
        font-weight: bold;
    }
    @media screen and (max-width: 600px) {
        .not-found-container{
            width: 90%;
        }
    }
</style>