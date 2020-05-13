<template>
    <v-dialog width="350px" persistent v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn class="ma-2" tile color="indigo" dark v-on="on" >
                {{ userIsRegistered ? 'Unregister': 'Register' }}
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex class="col-xs-12">
                        <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                        <v-card-title v-else >Register for Meetup?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row >
                    <v-card-text >
                        You can always change your mind later on tho.
                    </v-card-text>
                </v-layout>
                <v-flex class="col-xs-12">
                    <v-card-actions>
                        <v-btn text class="red--text darken-1" @click="dialog = false">Cancel</v-btn>
                        <v-btn text class="green--text darken-1" @click="onAgree">Confirm</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
     props: ['meetupId'],
     data () {
         return {  
             dialog: false,
         }
     },
     methods: {
        onAgree () {
             if (this.userIsRegistered) {
                 this.$store.dispatch('unregisterUserFormMeetup', this.meetupId)
             }
             else {
                 this.$store.dispatch('registerUserForMeetup', this.meetupId)
             }
        }
     },
     computed: {
         userIsRegistered () {
             return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                 return meetupId === this.meetupId
             }) >= 0
         }
     }
}
</script>