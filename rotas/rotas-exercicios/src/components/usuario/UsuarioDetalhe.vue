<template>
    <div class="usuario-detalhe">
        <h3>Usuário Detalhe</h3>
        <p><strong>Código:</strong> {{ id }}</p>
        <!-- :to="`/usuario/${id}/editar`" -->
        <!-- $route.params.id -->
        <router-link tag="button" primario 
            :to="{ name: 'editarUsuario', params: { id },
                query: { completo: true, lingua: 'pt' },
                hash: '#rodape' }">
            Editar
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['id'],
    beforeRouteEnter(to, from, next) {
        console.log('dentro do componente -> usuário detalhe');
        // neste ponto não é possível utilizar as propriedades do componente
        // pode ser utilizado dentro next
        // next(vm => {console.log(vm.id)})
        next()

        // pode ser utilizada para testar autenticação
        // caso autenticado next(), não autenticado next(false)
    }
    // data() {
    //     return {
    //         id: this.$route.params.id
    //     }
    // },
    // watch: {
    //     $route(to, from) {
    //         this.id = to.params.id
    //     }
    // },
    
}
</script>

<style>

</style>
