<template>
  <v-app id="inspire">   
    <v-card>
      <v-toolbar short dark>
        <v-app-bar-nav-icon class="d-flex d-sm-none d-lg-none"
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
        <v-toolbar-items class="d-sm-flex" v-if="userIsAuthenticated">
          
          <v-avatar size="40" class="avata">
            <v-menu :offset-y="true" bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" >
                  <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                </v-btn>
              </template>
              <v-list>
                <v-list-item router to="/profile">
                  Profile
                </v-list-item>
                <v-list-item text @click="onLogout">
                  Logout
                </v-list-item>
              </v-list>
            </v-menu>  
          </v-avatar>

        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer v-model="sideNav" absolute>
      <v-list>
        <v-list-item-group v-model="model" color="indigo">
          <v-list-item router :to="item.link"
            v-for="(item, i) in items"
            :key="i" >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- start logout button -->
      <v-list v-if="userIsAuthenticated">
        <v-list-item-group color="indigo" >
          <v-list-item inactive @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- end logout button -->
    </v-navigation-drawer>
    <main light>
      <router-view></router-view>
    </main>
  </v-app>
  
</template>


<script>
  export default {
    data: () => ({
      model: 1,
      sideNav: false,
    }),
    computed: {
      items () {
        let Items = [
          { icon: 'mdi-account-plus', text: 'Sign up', link: '/signup' },
          { icon: 'mdi-login', text: 'Sign in', link: '/signin' },
        ]
        if (this.userIsAuthenticated) {
          Items = [
            { icon: 'mdi-account-multiple', text: 'view meetups', link: '/meetups' },
            { icon: 'mdi-plus', text: 'Organize Meetup', link: '/meetups/new' },
          ]
        }
        return Items
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>


<style scoped>
.avata{
  top:8px;
}

</style>


