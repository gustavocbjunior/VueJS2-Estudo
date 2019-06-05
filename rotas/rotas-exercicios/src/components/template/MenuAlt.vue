<template>
    <nav class="menu">
        <ul>
            <!-- exact define que a rota é exatamente barra, não ficando ativo com /usuario -->
            <router-link to="/" tag="li" active-class="active" exact>
                <a>Home</a>
            </router-link>
            <router-link to="/usuario" tag="li" active-class="active">
                <a>User</a>
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
