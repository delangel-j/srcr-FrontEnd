<template>
	<Page actionBarHidden="true">
		<FlexboxLayout class="page">
			<StackLayout class="form">
				<Image class="logo" src="~/assets/images/logo.png"  v-show="isLoggingIn"/>
				<Label class="header" text="Bienvenido" v-show="isLoggingIn"/>

                <StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="Nombre" />
					<TextField ref="name" class="input" hint="Nombre" v-model="user.name" returnKeyType="done"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25" >
                    <Label text="Correo" /> 
					<TextField class="input" hint="Correo" keyboardType="email" autocorrect="false" autocapitalizationType="none" v-model="user.email"
					 returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="25">
                    <Label text="Contraseña" />
					<TextField ref="password" class="input" hint="Contraseña" secure="true" v-model="user.password" :returnKeyType="isLoggingIn ? 'done' : 'next'"
					 @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
                    <Label text="Confirmar contraseña" />
					<TextField ref="confirmPassword" class="input" hint="Confirmar contraseña" secure="true" v-model="user.confirmPassword" returnKeyType="done"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<Button :text="isLoggingIn ? 'Iniciar sesión' : 'Registrarse'" @tap="submit" class="btn btn-primary m-t-20" />
				<!--<Label v-show="isLoggingIn" text="¿Olvidaste tu contraseña?" class="login-label" @tap="forgotPassword" />-->
                <Button :text="isLoggingIn ? 'Crear cuenta' : 'Regresar' " class="btn btn-primary m-t-20" @tap="toggleForm"/>

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
            isLoggingIn: true,
            user: {
                name: "Jemsus",
                email: "foo@foo.com",
                password: "foo",
                confirmPassword: "foo"
            }
        };
    },
    methods: {
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },

        submit() {
            if (!this.user.email || !this.user.password) {
                this.alert(
                    "Ingresa tu correo y contraseña"
                );
                return;
            }
            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },

        login() {
            userService
                .login(this.user)
                .then(() => {
                    this.$navigateTo(App);
                })
                .catch(() => {
                    this.alert("No se encuentra la cuenta");
                });
        },

        register() {
            if (this.user.password != this.user.confirmPassword) {
                this.alert("Las contraseñas no coinciden.");
                return;
            }

            userService
                .register(this.user)
                .then(() => {
                    this.alert("Tu cuenta ha sido creada.");
                    this.isLoggingIn = true;
                })
                .catch(() => {
                    this.alert(
                        "Error al crear la cuenta"
                    );
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
            this.$refs.password.nativeView.focus();
        },
        focusConfirmPassword() {
            if (!this.isLoggingIn) {
                this.$refs.confirmPassword.nativeView.focus();
            }
        },

        alert(message) {
            return alert({
                title: "CRISVER",
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
		background-color: black;
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