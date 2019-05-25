<template>
	<div id="app">
		<h1>Diretivas</h1>
		<hr>
		<p v-text="'Usando diretiva <strong>v-text</strong>'"></p>
		<p v-html="'Usando diretiva <strong>v-html</strong>'"></p>
		<hr>
		<p v-destaque>Usando diretiva personalizada</p>
		<!-- passando valores para a directiva -->
		<p v-destaque:fundo.atrasar="'green'">Usando diretiva personalizada</p>
		<p v-destaque.atrasar="cor">Usando diretiva personalizada</p>
		<hr>
		<!-- directiva local -->
		<p v-destaque-local:fundo.atrasar.alternar="{ cor1: 'green', cor2: 'red', atraso: 2000, intervalo: 200}">Usando diretiva personalizada</p>
		<p v-destaque-local.atrasar.alternar="{ cor1: 'red', atraso: 2000, intervalo: 200}">Usando diretiva personalizada</p>
	</div>
</template>

<script>
export default {
	directives: {
		'destaque-local': {
			bind(el, binding/*, vnode*/) {
				const aplicarCor = (cor, corFonte) => {
					if (binding.arg === 'fundo') {
						el.style.backgroundColor = cor
						el.style.color = corFonte
					} else {
						el.style.color = cor
					}

				}
				let atraso = 0
				if(binding.modifiers['atrasar']) atraso = binding.value.atraso
				
				let cor1 = binding.value.cor1
				let cor2 = binding.value.cor2
				let corAtual = cor1
				let corTexto1 = 'black'
				let corTexto2 = 'gray'
				let corTextoAtual = corTexto1

				setTimeout(() => {
					if(binding.modifiers['alternar']) {
						setInterval(() => {
							corAtual = corAtual === cor1 ? cor2 : cor1
							corTextoAtual = corTextoAtual === corTexto1 ? corTexto2 : corTexto1
							aplicarCor(corAtual, corTextoAtual)
						}, binding.value.intervalo);	
					} else {
						aplicarCor(cor1)
					}
				}, atraso);

			}
		}
	},
	data() {
		return {
			cor: 'red'
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	font-size: 2.5rem;
}
</style>
