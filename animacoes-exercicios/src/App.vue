<template>
	<div id="app" class="container-fluid">
		<h1>Animações</h1>
		<hr>
		<b-button variant="primary" class="mb-4" @click="exibir = !exibir">Mostrar mensagem</b-button>

		<!-- <transition name="fade">
			<b-alert variant="info" show v-if="exibir">{{ msg }}</b-alert>
		</transition> -->
		<!-- TYPE é utilizado para sinalizadar o tipo da animação mandatoria, 
		quando existe mais de um tipo e o tempo de animação é diferente -->
		<!-- APPEAR é utilizado para que a animação aconteça no carregamento do componente -->
		<!-- <transition name="slide" type="animation" appear>
			<b-alert variant="info" show v-if="exibir">{{ msg }}</b-alert>
		</transition>

		<transition 
			enter-active-class="animated bounce"
			leave-active-class="animated shake">
			<b-alert variant="info" show v-if="exibir">{{ msg }}</b-alert>
		</transition> -->
		<hr>
		<b-select v-model="tipoAnimacao" class="mb-4">
			<option value="fade">Fade</option>
			<option value="slide">Slide</option>
		</b-select>
		<!-- MODE=OUT-IN indica que a animação de saida ocorrerá primeiro, 
		para funcionar corretamente é necessário utilizar o atributo key -->
		<transition :name="tipoAnimacao" mode="out-in">
			<b-alert variant="info" show v-if="exibir" key="info">{{ msg }}</b-alert>
			<b-alert variant="warning" show v-else key="warn">{{ msg }}</b-alert>
		</transition>

		<hr>
		<button @click="exibir2 = !exibir2">Alternar</button>
		<!-- css=false indica que a transição não será afetada por css -->
		<transition
			:css="false" 
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			@enter-cancelled="enterCancelled"
			
			@before-leave="beforeLeave"
			@leave="leave"
			@after-leave="afterLeave"
			@leave-cancelled="leaveCancelled">
			<div v-if="exibir2" class="caixa"></div>
		</transition>
		
		<hr>
		<div class="mb-4">
			<b-button variant="primary" class="mr-2"
				@click="componenteSelecionado = 'AlertaInfo'">Info</b-button>
			<b-button variant="secondary" 
				@click="componenteSelecionado = 'AlertaAdvertencia'">Advertência</b-button>
		</div>
		<transition name="fade" mode="out-in">
			<component :is="componenteSelecionado"></component>
		</transition>
	</div>
</template>

<script>
import AlertaAdvertencia from './AlertaAdvertencia.vue'
import AlertaInfo from './AlertaInfo.vue'

export default {
	components: { AlertaAdvertencia, AlertaInfo	},
	data() {
		return {
			msg: 'Uma mensagem de informação para o usuário',
			exibir: false,
			exibir2: true,
			tipoAnimacao: "fade",
			larguraBase: 0,
			componenteSelecionado: 'AlertaInfo'
		}
	},
	methods: {
		animar(el, done, negativo) {
			let rodada = 1
			const temporizador = setInterval(() => {
				const novaLargura = this.larguraBase + (negativo ? -rodada * 10 : rodada * 10)
				el.style.width = `${novaLargura}px`
				rodada++
				if(rodada > 30) {
					clearInterval(temporizador)
					done()
				}
			}, 20)

		},
		beforeEnter(el) {
			//console.log('beforeEnter');
			this.larguraBase = 0
			el.style.width = `${this.larguraBase}px`
		},
		enter(el, done) {
			/*console.log('enter');
			// Se não chamar o done, o ciclo da animação será quebrado
			done()*/
			this.animar(el, done, false)
		},
		// afterEnter(el) {
		// 	console.log('afterEnter');
		// },
		// enterCancelled(el) {
		// 	console.log('enterCancelled');
		// },
		beforeLeave(el) {
			//console.log('beforeLeave');
			this.larguraBase = 300
			el.style.width = `${this.larguraBase}px`
		},
		leave(el, done) {
			/*console.log('leave');
			// Se não chamar o done, o ciclo da animação será quebrado
			done()*/
			this.animar(el, done, true)
		},
		// afterLeave(el) {
		// 	console.log('afterLeave');
		// },
		// leaveCancelled(el) {
		// 	console.log('leaveCancelled');
		// }
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
	font-size: 1.5rem;
}

.caixa {
	height: 100px;
	width: 300px;
	margin: 30px auto;
	background-color: lightgreen;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 2s;
}
/*
.fade-enter-to {
	opacity: 1;
}

.fade-leave {
	opacity: 1;
}

.fade-leave-active {
	transition: opacity 2s;
}

.fade-leave-to {
	opacity: 0;
}*/

@keyframes slide-in {
	from { transform: translateY(40px); }
	to { transform: translateY(0); }
}

@keyframes slide-out {
	from { transform: translateY(0); }
	to { transform: translateY(40px); }
}

.slide-enter-active {
	animation: slide-in 2s ease;
	transition: opacity 2s;
}

.slide-leave-active {
	animation: slide-out 2s ease;
	transition: opacity 2s;
}

.slide-enter, .slide-leave-to {
	opacity: 0;
}

</style>
