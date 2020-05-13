<template>
  <v-container>
    <v-layout row wrap v-if="loading" class="text-center">
      <v-flex >
        <v-progress-circular indeterminate :width="7"
        :size="40"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex col-12>
        <v-card>
          <v-card-title>
            <h4>{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-detail-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-detail-dialog>
            </template>
          </v-card-title>
          <v-img
            :src="meetup.imageUrl"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} -- {{ meetup.location }}
               <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog></div>
            <div>
              {{meetup.description}}
            </div>
          </v-card-text>
          <v-card-action>
            <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
            <!-- <v-btn class="ma-2" tile color="indigo" dark>Register</v-btn> -->
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>