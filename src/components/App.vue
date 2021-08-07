<template>
    <Page>
        <ActionBar title="" android:flat="true"/>
        <TabView tabBackgroundColor="#096946"
                 android:tabTextColor="#000000"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff"
                 androidTabsPosition="bottom"
                 >

                 <!-- Primera pantalla (Pantalla de inicio) -->
            <TabViewItem title="Explorar">
                <FlexboxLayout flexDirection="column" class="fondo" style="background-color:#0BB375;">
                    <Label v-show="explorar" textWrap="true" class="message" text="¿Cómo desea encontrar sus platillos?" height="30%" width="90%"/>
                    <Button v-show="explorar" class="btn btn-primary" text="¡Sorpréndeme!" @tap="getCategorias"/>
                    <Button v-show="explorar" width="90%" class="btn btn-primary" text="¡Lo haré yo mismo!" @tap="toggleSorprendeme"/>
                    <!-- Termina primera pantalla -->
                    
                    <!-- Pantalla de explorar - sorprendeme -->
                    <ListView v-show="categorias" for="cat in listaCategorias" height="70%" style="background-color:#0BB375;">
                            <v-template v-show="restaurantes"  >
                                <AbsoluteLayout flexDirection="column"   >
                                 <Image :src="cat.url" stretch="fill" class="imagen" :tintColor="bgColor" />
                                <Label :text="cat.nombre" class="card"  />
                                </AbsoluteLayout>
                            </v-template>   
                        </ListView>
                        <Button v-show="categorias" width="30" class="btn-circle" text="->" @tap="togglePreferencias"/>
                        <Button v-show="categorias" class="btn-circle" text="Regresar" @tap="getCategorias"/>
                    <!-- Termina pantalla de explorar - sorprendeme -->

                    <!-- Pantalla explorar confirmación - sorprendeme -->
                    <Label v-show="preferencias" textWrap="true" height="20%" width="80%" class="message" text="¿Desea continuar con tus preferencias ya registradas?" alignSelf="center"/>
                    <Button v-show="preferencias" class="btn btn-primary" text="Sí, continuar" @tap="toggleBusqueda"/>
                    <Button v-show="preferencias" width="90%" class="btn btn-primary" text="No, cambiar las calorías"/>
                    <!-- Termina pantalla explorar confirmación - sorprendeme -->

                    <!-- Pantalla explorar búsqueda -- sorprendeme -->
                    <Label v-show="busqueda" height="30%" class="message" text="Buscando platillos..."/>
                    <AbsoluteLayout v-show="busqueda" class="" @tap="getRestaurantes(currentGeoLocation.latitude, currentGeoLocation.longitude)">
                       <!-- <Label class="cv-lbl"/>
                        <Label class="inner-circle"/>-->
                        <ActivityIndicator color="#096946" :busy="isBusy" width="150" height="150"/>
                    </AbsoluteLayout>
                    <Label v-show="busqueda" class="message" text="Buscando restaurantes"/>
                    <!-- Termina pantalla de explorar búsqueda - sorprendeme -->

                    <!-- Pantalla explorar búsqueda -- sorprendeme -->
                    <Label v-show="busquedaPorCaloria" height="30%" class="message" text="Buscando platillos..."/>
                    <AbsoluteLayout v-show="busquedaPorCaloria" class="" @tap="getRestaurantesPorCaloria(currentGeoLocation.latitude, currentGeoLocation.longitude)">
                       <!-- <Label class="cv-lbl"/>
                        <Label class="inner-circle"/>-->
                        <ActivityIndicator color="#096946" :busy="isBusy" width="150" height="150"/>
                    </AbsoluteLayout>
                    <Label v-show="busquedaPorCaloria" class="message" text="Buscando restaurantes"/>
                    <!-- Termina pantalla de explorar búsqueda - sorprendeme -->

                        <!--Pantalla explorar restaurantes - sorprendeme -->
                        <Label v-show="restaurantes" class="message" text="Restaurantes" />
                        <ListView v-show="restaurantes" for="rest in listaRestaurantes" height="85%">
                            <v-template v-show="restaurantes">
                                <AbsoluteLayout flexDirection="column" @tap="getPlatillosAll(rest.restaurante.idRestaurante)">
                                <Image :src="rest.restaurante.imgUrl" stretch="fill" class="imagen"/>
                                <Label :text="rest.restaurante.nombre" class="card"/>
                                </AbsoluteLayout>
                            </v-template>
                        </ListView>
                    <!--termina Pantalla explorar restaurantes - sorprendeme -->

                    <!--Pantalla explorar restaurantes - sorprendeme -->
                        <Label v-show="restaurantesPorCaloria" class="message" text="Restaurantes" />
                        <ListView v-show="restaurantesPorCaloria" for="rest in listaRestaurantes" height="85%">
                            <v-template v-show="restaurantesPorCaloria">
                                <AbsoluteLayout flexDirection="column" @tap="getPlatillos(rest.restaurante.idRestaurante, correo)">
                                <Image :src="rest.restaurante.imgUrl" stretch="fill" class="imagen"/>
                                <Label :text="rest.restaurante.nombre" class="card"/>
                                </AbsoluteLayout>
                            </v-template>
                        </ListView>
                    <!--termina Pantalla explorar restaurantes - sorprendeme -->

                    <!-- Pantalla de lista de platillos por restaurante-->
                        <ListView v-show="platillosCargados" for="platillos in listaPlatillos" height="85%">
                            <v-template v-show="platillosCargados">
                                <GridLayout columns="auto,auto,auto" rows="auto,15, auto">
                                <Label textWrap="true" column="0" row="0" :text="platillos.nombre" class="platillos"/>
                                <Label textWrap="true" column="0" row="2" :text="'Calorias: ' + platillos.calorias" class="platillos"/>
                               <!-- <Label textWrap="true" column="1" row="2"  :text="'Gramos por porción' + platillos.gramosPorPorcion" class="platillos"/>-->
                                <Label textWrap="true" column="1" row="2" :text="'Precio: ' + platillos.precio +'$'" class="platillos"/>
                                </GridLayout>
                            </v-template>
                        </ListView>
                        <!-- Termina pantalla de lista de platillos por restaurante -->

                        


                </FlexboxLayout>


                <!-- Estan son las demás pestañas de la interfaz -->
            </TabViewItem>
            
            <TabViewItem title="Preferencias">
                <GridLayout columns="100,auto,auto" rows="50,auto,auto,auto,auto" flexDirection="column" class="fondo" style="background-color:#0BB375;">
                    <Label class="message" text="Postres" row="1" column="1"/>
                    <Switch checked="true" column="2" row="1" color="snow" backgroundColor="white" />
                    <Label class="message" text="Carnes" row="2" column="1"/>
                    <Switch checked="true" column="2" row="2" color="snow" backgroundColor="white" />
                    <Label class="message" text="Ensadalas" row="3" column="1"/>
                    <Switch checked="true" column="2" row="3" color="snow" backgroundColor="white" />
                    <Label class="message" text="Bebidas" row="4" column="1"/>
                    <Switch checked="true" column="2" row="4" color="snow" backgroundColor="white" />
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Cuenta">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script >
import axios from 'axios';
var geoLocation = require("nativescript-geolocation");
  export default {
      
    data() {
      return {

          //Variables utilizadas para mostrar elementos on v-show
          explorar: true,
          categorias: false,
          preferencias: false,
          busqueda: false,
          busquedaPorCaloria: false,
          restaurantes: false,
          restaurantesPorCaloria: false,
          datosCargados: false,
          platillosCargados: false,
          isBusy: true,
          bgColor: "",
          isActive: true,
          correo: '',
          index: 1,
          caloriasDesayuno: "",


          //Listas utilizadas para guardar las consultas
          listaRestaurantes: [],
          listaCategorias: [],
          listaPlatillos: [],

        //Datos de la ubicación
        currentGeoLocation: {
            latitude: null,
            longitude: null,
            altitude: null,
            direction: null
        }
      }
    },
    computed: {
        
    },
    created() {
        this.getComrreo();
    },
  
    methods: {

        getComrreo(){
            this.correo = this.$store.state.comrreo;
            //return this.$store.state.comrreo
        },

        //Métodos para mostrar/ocultar elementos con v-show
        togglePreferencias(){
            this.categorias = !this.categorias;
            this.preferencias = !this.preferencias;
        },
        toggleBusqueda(){
            geoLocation.isEnabled().then(enabled => {
                if(!enabled){
                    geoLocation.enableLocationRequest().then(() => this.showLocation());
                } else {
                    this.showLocation();
                }
            });
            this.preferencias = !this.preferencias;
            this.busquedaPorCaloria = !this.busquedaPorCaloria;
        },
 
        toggleSorprendeme: function() {
            geoLocation.isEnabled().then(enabled => {
                if(!enabled){
                    geoLocation.enableLocationRequest().then(() => this.showLocation());
                } else {
                    this.showLocation();
                }
            });
            this.explorar = !this.explorar;
            this.busqueda = !this.busqueda;
            
        },
        showLocation: function() {
            geoLocation.watchLocation(location => {
                this.currentGeoLocation = location;
            }, error => {
                   alert(error);
                   }, {
                desiredAccuracy: 3,
                updateDistance: 10,
                minimumUpdateTime: 1000 * 1
            });
        },
        seleccionCategoria(){
            if(this.isActive == true){
                this.bgColor = "green";
                this.isActive = !this.isActive;
            } else {
                this.bgColor= "";
                this.isActive = !this.isActive;
            }
        },

        //////////Peticiones a la BD

        getCategorias(){
            axios
                .get("http://192.140.25.25:8080/api/srcr/categorias/")
                .then((response )=> {
                    this.listaCategorias = response.data;
                })
                .catch(( error) => {
                    console.log(error); 
                });  
                this.explorar = !this.explorar;
                this.categorias = !this.categorias;

        },

        getRestaurantes(latitud, longitud) {
            axios
                .get('http://192.140.25.25:8080/api/srcr/sucursales', {params: {latitud, longitud}})
                .then((response )=> {
                    this.listaRestaurantes = response.data;
                })
                .catch(( error) => {
                    console.log(error); 
                });  
            this.busqueda = !this.busqueda;
            this.restaurantes = !this.restaurantes;
            
        },

        getRestaurantesPorCaloria(latitud, longitud) {
            axios
                .get('http://192.140.25.25:8080/api/srcr/sucursales', {params: {latitud, longitud}})
                .then((response )=> {
                    this.listaRestaurantes = response.data;
                })
                .catch(( error) => {
                    console.log(error); 
                });  
            this.busquedaPorCaloria = !this.busquedaPorCaloria;
            this.restaurantesPorCaloria = !this.restaurantesPorCaloria;
            
        },
        getPlatillos(id_restaurante, correo){
            axios
                .get('http://192.140.25.25:8080/api/srcr/recomendados', {params: {id_restaurante, correo}})
                .then((response )=> {
                    this.listaPlatillos = response.data;
                })
                .catch(( error) => {
                    console.log(error);
                })
            this.platillosCargados = !this.platillosCargados;
            this.restaurantesPorCaloria = !this.restaurantesPorCaloria;
        },
        getPlatillosAll(id_restaurante){
            axios
                .get('http://192.140.25.25:8080/api/srcr/platillos', {params: {id_restaurante}})
                .then((response )=> {
                    this.listaPlatillos = response.data;
                })
                .catch(( error) => {
                    console.log(error);
                })
            this.platillosCargados = !this.platillosCargados;
            this.restaurantes = !this.restaurantes;
        }
        

    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .fondo {
        background-color: #57a362;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 23;
        color: white;
        margin-top:10;
        margin-bottom:10;

        
    }
    	.btn-primary {
		height: 40;
        width: 90%;
		margin: 10 5 15 5;
		background-color: #096946;
        color: white;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}
    .btn-circle{
        height: 50;
        width: 50;
        margin: 5 5 15 5;
        background-color: #096946;
        border: 10;
        border-radius: 50%;
        font-size: 20;
        font-weight: 600;
        color:white;
    }
    .categorias{
        text-align: left;
        font-size: 23;
        vertical-align: center;      
        background-repeat: no-repeat;
        background-size: cover;
    }
    .cv {
        background-color: rgb(250, 250, 250);
        height: 200;
        width: 200;
        animation-name: rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;

        clip-path: circle(60% at 50% 50%);
    }
    .cv-lbl{
        height: 50%;
        width: 50%;
        background-color: rgb(150, 214, 164);
    }
    .inner-circle{
        height: 47%;
        width: 25%;
        background-color: #57a362;
        border-radius: 50%;
        top: 50%;
        left: 140;
    }
    .card{
        /*box-shadow: 0 4px 8px 0 (rgba(0,0,0,0.2));
        transition: 0.3s;
        width: 40%;;
        border-radius: 5;*/
        font-size: 23;
        text-align: center;
        padding-top: 70%;
        padding-left: 15%;
        bottom: 100%;
    } 
    .platillos{
        font-size: 20;

    }
    .imagen{
        height: 100;
        width: 90%;
        left: 10%; 
        opacity: 0.6;
    }
    ActivityIndicator{
        margin-left: 33%;
    }

    @keyframes rotate {
     
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
        
    }
</style>
