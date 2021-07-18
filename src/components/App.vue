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
                    <Label v-show="isToggle" class="message" text="¿Cómo desea encontrar sus platillos?" height="30%"/>
                    <Button v-show="isToggle" class="btn btn-primary" text="¡Sorprendeme!"/>
                    <Button v-show="isToggle" class="btn btn-primary" text="¡Lo hare yo mismo!" @tap="toggleUI"/>
                    
                
                    <Label v-show="!isToggle" width="20%" height="15%" class="categorias" text="Postres"/>
                    <Label v-show="!isToggle" width="20%" height="15%" class="categorias" text="Carnes"/>
                    <Label v-show="!isToggle" width="20%" height="15%" class="categorias" text="Ensaladas"/>
                    <Label v-show="!isToggle" width="20%" height="15%" class="categorias" text="Bebidas"/>
                    <Button v-show="!isToggle" width="30" class="btn-circle" text="->" />
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
  export default {
    data() {
      return {
          isToggle: true,
        msg: 'Hello World!'
      }
    },
    methods: {
        toggleUI(){
            this.isToggle = !this.isToggle;
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
        font-size: 20;
        color: white;
    }
    	.btn-primary {
		height: 50;
        width: 90%;
		margin: 30 5 15 5;
		background-color: rgb(32, 141, 65);
        color: white;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}
    .btn-circle{
        height: 50;
        width: 50;
        margin: 30 5 15 5;
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
        background-image: url("~/assets/images/logo.png");
        background-repeat: no-repeat;
    }
</style>
