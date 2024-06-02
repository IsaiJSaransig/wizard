<template>
    <header class="header-container">
        <img src="../assets/logo.png" alt="">
        
    </header>
</template>
<script>
export default {
    name: 'HeaderComponent'
}
</script>
<style scoped>
    .header-container {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        & img {
            width: 150px;
        }
    }
</style>