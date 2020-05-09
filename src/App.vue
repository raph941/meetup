<template>
  <v-app id="inspire">   
    <v-card>
      <v-toolbar short dark>
        <v-app-bar-nav-icon class="d-flex d-sm-none"
          @click.native="sideNav = !sideNav">
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">MeetUp</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-for="(item, i) in items" :key="i" class="d-none d-sm-flex">
          <v-btn icon router :to="item.link"><v-icon v-text="item.icon"></v-icon></v-btn>
          <v-btn v-text="item.text" text router :to="item.link"></v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card> 
    <v-navigation-drawer v-model="sideNav" absolute>
      <v-list>
        <v-list-item-group v-model="model" mandatory color="indigo">
          <v-list-item router :to="item.link"
            v-for="(item, i) in items"
            :key="i" >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content >
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <main light>
      <router-view></router-view>
    </main>
  </v-app>
  
</template>


<script>
  export default {
    data: () => ({
      items: [
        { icon: 'mdi-home', text: 'Home', link: '/' },
        { icon: 'mdi-account-multiple', text: 'view meetups', link: '/meetups' },
        { icon: 'mdi-plus', text: 'Organize Meetup', link: '/meetups/new' },
        { icon: 'mdi-account', text: 'Profile', link: '/profile' },
        { icon: 'mdi-account-plus', text: 'Sign up', link: '/signup' },
        {icon: 'mdi-login', text: 'Sign in', link: '/signin' },
      ],
      model: 1,
      sideNav: false,
    }),
  }
</script>


<style>

</style>


