<template>
	<Page actionBarHidden="true">
        <ScrollView scrollBarIndicatorVisible="true">
		<FlexboxLayout class="page">
			<StackLayout class="form">
				<Image class="logo" src="~/assets/images/logo.png"  v-show="isLoggingIn"/>
				<Label class="header" text="Bienvenido" v-show="isLoggingIn"/>
                <Label class="header" text="Registro" v-show="!isLoggingIn"/>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="Nombre" />
					<TextField ref="nombre" class="input" hint="Nombre" v-model="Cliente.nombre" returnKeyType="done"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25" >
                    <Label text="Correo" /> 
					<TextField class="input" hint="Correo" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="Cliente.correo"
					 returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25">
                    <Label text="Contraseña" />
					<TextField ref="contrasena" class="input" hint="Contraseña" secure="true" v-model="Cliente.contrasena" :returnKeyType="isLoggingIn ? 'done' : 'next'"
					 @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="Confirmar contraseña" />
					<TextField ref="confirmarContrasena" class="input" hint="Confirmar contraseña" secure="true" v-model="Cliente.confirmarContrasena" returnKeyType="done"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="¿Cuántas calorias ingieres en el desayuno?" />
					<TextField ref="desayuno" class="input" hint="Calorias" v-model="Cliente.caloriasDesayuno" returnKeyType="next"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="¿Cuántas calorias ingieres en la comida?" />
					<TextField ref="comida" class="input" hint="Calorias" v-model="Cliente.caloriasAlmuerzo" returnKeyType="next"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="¿Cuántas calorias ingieres en la cena?" />
					<TextField ref="cena" class="input" hint="Calorias" v-model="Cliente.caloriasCena" returnKeyType="next"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

                <Button :text="isLoggingIn ? 'Crear cuenta' : 'Regresar' " class="btn btn-primary m-t-20" @tap="toggleForm"/>
				<Button :text="isLoggingIn ? 'Iniciar sesión' : 'Registrarse'" @tap="submit(Cliente.correo, Cliente.contrasena)" class="btn btn-primary m-t-20" />
				<!--<Label v-show="isLoggingIn" text="¿Olvidaste tu contraseña?" class="login-label" @tap="forgotPassword" />-->
                
			</StackLayout>

			

	        
		</FlexboxLayout>
        </ScrollView>
	</Page>
</template>

<script>
import App from './App.vue';
import axios from 'axios';

// A stub for a service that authenticates users.
const userService = {
    register(Cliente) {
        return Promise.resolve(Cliente);
    },
    login(Cliente) {
        return Promise.resolve(Cliente);
    },
    resetPassword(contrasena) {
        return Promise.resolve(contrasena);
    }
};


export default {
    data() {
        return {
            isLoggingIn: true,
            Cliente: {
                nombre: "",
                correo: "",
                contrasena: "",
                confirmarContrasena: "",
                caloriasDesayuno: "",
                caloriasAlmuerzo: "",
                caloriasCena: ""
            },
            auth: {
                        correo: "",
                        contrasena: ""
                        }
        };
    },
    
    methods: {
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },

        submit(correo, contrasena) {
            if (!this.Cliente.contrasena || !this.Cliente.contrasena) {
                this.alert(
                    "Ingresa tu correo y contraseña"
                );
                return;
            }
            if (this.isLoggingIn) {
                this.login(correo, contrasena);
            } else {
                this.register();
            }
        },

        
        login(correo, contrasena) {

          
        const token = 
            userService
                axios.get("http://192.140.25.25:8080/api/srcr/login", {params: {correo, contrasena}})
                .then((response )=> {
                    this.Cliente = response.data;
                    console.log(correo + " " + response.data.correo);
                    //console.log(this.Cliente.contrasena + " " +this.response.contrasena);
                    if(
                        correo === response.data.correo && 
                        contrasena === response.data.contrasena){
                            //this.$store.commit();
                            this.$navigateTo(App)
                    }else{
                        this.alert("Error al iniciar sesión")
                    }
                })
                .catch(( error) => {
                    console.log(error);
                    this.alert("Datos incorrectos"); 
                });  
        },

        register() {
            if (this.Cliente.contrasena != this.Cliente.confirmarContrasena) {
                this.alert("Las contraseñas no coinciden.");
                return;
            }

            userService
                axios
                    .post("http://192.140.25.25:8080/api/srcr/clientes/agregar", {
                        nombre: this.Cliente.nombre,
                        correo: this.Cliente.correo,
                        contrasena: this.Cliente.contrasena,
                        caloriasDesayuno: this.Cliente.caloriasDesayuno,
                        caloriasAlmuerzo: this.Cliente.caloriasAlmuerzo,
                        caloriasCena: this.Cliente.ca,loriasCena
                    })
                .then(() => {
                    this.alert("Tu cuenta ha sido creada.");
                    this.isLoggingIn = true;
                })
                .catch((error) => {
                    this.alert(
                        "Error al crear la cuenta"
                    );
                    console.log(error);
                });
        },

        forgotPassword() {
            prompt({
                title: "Olvide la contraseña",
                message:
                    "Ingresa el correo que utiilizasta para registrarte a CRISVER para reiniciar tu contraseña",
                inputType: "email",
                defaultText: "",
                okButtonText: "Ok",
                cancelButtonText: "Cancelar"
            }).then(data => {
                if (data.result) {
                    userService
                        .resetPassword(data.text.trim())
                        .then(() => {
                            this.alert(
                                "Su contraseña ha sido reiniciada. Sigue las instrucciones que han sido enviadas a su correo"
                            );
                        })
                        .catch(() => {
                            this.alert(
                                "Ha ocurrido un error al reiniciar su contraseña."
                            );
                        });
                }
            });
        },

        focusPassword() {
            this.$refs.contrasena.nativeView.focus();
        },
        focusConfirmPassword() {
            if (!this.isLoggingIn) {
                this.$refs.confirmarContrasena.nativeView.focus();
            }
        },

        alert(message) {
            return alert({
                title: "SRCR",
                okButtonText: "OK",
                message: message
            });
        }
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
		font-size: 32;
		font-weight: 600;
		margin-bottom: 70;
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