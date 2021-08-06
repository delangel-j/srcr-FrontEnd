<template>
	<Page actionBarHidden="true">
		<FlexboxLayout class="page">
			<StackLayout class="form">
				

				<!-- YA NO SE USAAAAAAAAAAAAAAAAAAAAAAAA
				   
				    GAAAAAAAAAAAAAAAAAIOOOOOOOOOOOOOO-->


				<Label class="header" text="Bienvenido" v-show="bienvenido"/>
                <Label class="header" text="Antes de buscar tus platillos favoritos necesitamos saber más sobre ti y tus gustos" v-show="bienvenido" textWrap="true"/>
                <Image class="logo" src="~/assets/images/logo.png"  v-show="bienvenido"/>

                 <Button v-show="bienvenido" text="->" class="btn btn-primary m-t-20" @tap="toggleRegistro"/>


            <Label class="header" text="Queremos saber la cantidad de calorías que consumes en:" v-show="registro" textWrap="true"/>

                <StackLayout v-show="registro" class="input-field">
                    <Label text="Desayuno" />
					<TextField ref="desayuno" class="input" hint="1000" keyboardType="number" returnKeyType="next"
					 fontSize="18" @returnPress="focusComida"/>
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="registro" class="input-field" marginBottom="25" >
                    <Label text="Comida" /> 
					<TextField class="input" hint="1000" keyboardType="number"  
					 returnKeyType="next" ref="comida" fontSize="18" @returnPress="focusCena"/>
					<StackLayout class="hr-light"  />
				</StackLayout>

				<StackLayout v-show="registro" class="input-field" marginBottom="25">
                    <Label text="Cena" />
					<TextField ref="cena" class="input" hint="1000" keyboardType="number" fontSize="18" 
                    returnKeyType="send" @tap="enviar"/>
					<StackLayout class="hr-light" />
				</StackLayout>

			

               
				<Button v-show="registro" text="->" @tap="enviar" class="btn btn-primary m-t-20" />
				<!--<Label v-show="isLoggingIn" text="¿Olvidaste tu contraseña?" class="login-label" @tap="forgotPassword" />-->
                
			</StackLayout>

			

	        
		</FlexboxLayout>
	</Page>
</template>

<script>
import App from './App.vue';
// A stub for a service that authenticates users.
const userService = {
    register(user) {
        return Promise.resolve(user);
    },
    login(user) {
        return Promise.resolve(user);
    },
    resetPassword(email) {
        return Promise.resolve(email);
    }
};


export default {
    data() {
        return {
            bienvenido: true,
            registro: false,
            user: {
                name: "Jemsus",
                email: "foo@foo.com",
                password: "foo",
                confirmPassword: "foo"
            }
        };
    },
    methods: {
        toggleRegistro() {
            this.bienvenido = !this.bienvenido;
            this.registro = !this.registro;
        },


        focusComida() {
            this.$refs.comida.nativeView.focus();
        },
        focusCena(){
            this.$refs.cena.nativeView.focus();
        },

        enviar() {
            this.$navigateTo(App);
                
        },

        


        
        

    }
};
</script>

<style scoped>
	.page {
		align-items: center;
		flex-direction: column;
        background-color: #2fa13c;
	}

	.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-bottom: 12;
		height: 90;
		font-weight: bold;
	}

	.header {
		horizontal-align: center;
		font-size: 20;
		font-weight: 600;
		margin-bottom: 50;
		text-align: center;
		color: white;
	}

	.input-field {
		margin-bottom: 25;
	}

	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}

	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: #096946;
        color: white;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}

	.login-label {
		horizontal-align: center;
		color: #A8A8A8;
		font-size: 16;
	}

	.sign-up-label {
		margin-bottom: 20;
	}

	.bold {
		color: #000000;
	}
</style>