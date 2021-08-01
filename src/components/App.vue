<template>
    <Page>
        <ActionBar title="" android:flat="true"/>
        <TabView tabBackgroundColor="#094e0d"
                 android:tabTextColor="#000000"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff"
                 >
            <TabViewItem title="Explorar">
                <FlexboxLayout flexDirection="column" class="fondo">
                    <Label v-show="explorar" textWrap="true" class="message" text="¿Cómo desea encontrar sus platillos?" height="30%" width="90%"/>
                    <Button v-show="explorar" class="btn btn-primary" text="¡Sorpréndeme!" @tap="toggleCategorias"/>
                    <Button v-show="explorar" width="90%" class="btn btn-primary" text="¡Lo haré yo mismo!" @tap="toggleSorprendeme"/>
                    
                    
                    <ListView v-show="categorias" for="cat in listaCategorias" height="60%" >
                            <v-template v-show="restaurantes"  >
                                <AbsoluteLayout flexDirection="column"   >
                                 <Image :src="cat.imagen" stretch="fill" class="imagen" :tintColor="bgColor" />
                                <Label :text="cat.nombre" class="card"  />
                               
                               
                                </AbsoluteLayout>
                            
                            </v-template>
                         
                            
                        </ListView>
                        <Button v-show="categorias" width="30" class="btn-circle" text="->" @tap="togglePreferencias"/>
                        <Button v-show="categorias" class="btn-circle" text="Regresar" @tap="toggleCategorias"/>
                    

                    <Label v-show="preferencias" textWrap="true" height="20%" width="80%" class="message" text="Desea continuar con tus preferencias ya registradas?" alignSelf="center"/>
                    <Button v-show="preferencias" class="btn btn-primary" text="Sí, continuar" @tap="toggleBusqueda"/>
                    <Button v-show="preferencias" width="90%" class="btn btn-primary" text="No, cambiar las calorías"/>

                    <Label v-show="busqueda" height="30%" class="message" text="Buscando platillos..."/>
                    <Label v-show="busqueda" :text="'Latitude: ' + currentGeoLocation.latitude" />
                    <Label v-show="busqueda" :text="'Longitude: ' + currentGeoLocation.longitude" />
                    <AbsoluteLayout v-show="busqueda" class="" @tap="getRestaurantes">
                       <!-- <Label class="cv-lbl"/>
                        <Label class="inner-circle"/>-->
                        <ActivityIndicator color="#096946" :busy="isBusy" width="150" height="150"/>
                        
                    </AbsoluteLayout>
                    <Label v-show="busqueda" class="message" text="Buscando restaurantes"/>

                    
                        <Label v-show="restaurantes" class="message" text="Restaurantes" />
                        <ListView v-show="restaurantes" for="rest in listaRestaurantes" height="85%">
                            <v-template v-show="restaurantes">
                                <AbsoluteLayout flexDirection="column">
                                <Image :src="rest.imgUrl" stretch="fill" class="imagen"/>
                                <Label :text="rest.nombre" class="card"/>
                                </AbsoluteLayout>
                            </v-template>
                        </ListView>
                </FlexboxLayout>


                
            </TabViewItem>
            <TabViewItem title="Favoritos">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Preferencias">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
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
//import axios from 'axios';
var geoLocation = require("nativescript-geolocation");
  export default {
    data() {
      return {
          explorar: true,
          categorias: false,
          preferencias: false,
          busqueda: false,
          restaurantes: false,
          datosCargados: false,
          isBusy: true,
          bgColor: "",
          isActive: true,

          listaRestaurantes: [],
          listaCategorias: [
              {
                  nombre: "Postres",
                  imagen: "~/assets/images/postres.jpg"
              },
              {
                  nombre: "Carnes",
                  imagen: "~/assets/images/carnes.jpg"
              },
              {
                  nombre: "Ensaladas",
                  imagen: "~/assets/images/ensaladas.jpg"
              },
              {
                  nombre: "Bebidas",
                  imagen: "~/assets/images/bebidas.jpg"
              },
          ],
        currentGeoLocation: {
            latitude: null,
            longitude: null,
            altitude: null,
            direction: null
        }
      }
    },
    methods: {
        toggleCategorias(){
            this.explorar = !this.explorar;
            this.categorias = !this.categorias;
        },
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
            this.busqueda = !this.busqueda;
        },
        toggleResultados(){
            
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

        },

        getRestaurantes() {
            this.$axios
                .get("restaurantes/")
                .then((response )=> {
                    this.listaRestaurantes = response.data;
                })
                .catch(( error) => {
                    console.log(error); 
                });  
            this.busqueda = !this.busqueda;
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
		background-color: #0BB375;
        color: white;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}
    .btn-circle{
        height: 50;
        width: 50;
        margin: 5 5 15 5;
        background-color: white;
        border: 10;
        font-size: 20;
        font-weight: 600;
        color:#57a362;
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
