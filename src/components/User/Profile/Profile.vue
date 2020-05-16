<template>
<v-container>
    <v-layout row>
        <v-card class="mx-auto" width="100%" >
        <v-badge avatar bordered overlap bottom icon="mdi-pencil" >
            <v-avatar class="profile" color="grey" size="150">
                <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
        </v-badge>
        
        <v-btn class="edit" right >Profile</v-btn>

        <v-card-actions>
            <v-btn text color="deep-purple accent-4">
                Raphael Ehindero
            </v-btn>
            <v-spacer></v-spacer>
            <v-card-text >TotalMeetUps: 78</v-card-text>
            </v-card-actions>
        </v-card>
    </v-layout>

    <v-layout row class="bodyLayout">
        <v-card class="mx-auto" width="100%">
            <v-tabs v-model="tab" background-color="primary" dark>
                <v-tab @click="showMyMeetups=false, showEditProfile=false, showAboutProfile=true"> About </v-tab>
                <v-tab @click="showMyMeetups=true, showEditProfile=false, showAboutProfile=false"> My Meetups </v-tab>
                <v-tab @click="showMyMeetups=false, showEditProfile=true, showAboutProfile=false"> Settings </v-tab>
            </v-tabs>

            <my-meetups v-if="showMyMeetups"></my-meetups>
            
            <edit-profile v-if="showEditProfile"></edit-profile>

            <about-profile v-if="showAboutProfile" ></about-profile>

        </v-card>
    </v-layout>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      showMyMeetups: false,
      showEditProfile: false,
      showAboutProfile: true,
      items: [
        {
          action: '2 March 2020 2:00pm',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
    methods: {
        avatarHover () {
            console.log("hovered")
            return console.log("hovered")
        }
    },
    computed: {
    }
  }
</script>

<style scoped>
    .profile{
        padding:20px;
    }
    .edit{
        float: right;
    }
    .bodyLayout{
        margin: 20px;
    }
    .formClass{
        padding: 20px;
    }
</style>