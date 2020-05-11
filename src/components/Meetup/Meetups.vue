<template>
  <v-container>
    <v-row dense>
      <v-col v-for="meetup in meetups"
        :key="meetup.id"
        cols="12">
        <v-card
          color="light-blue darken-1"
          dark
          class="col-xs-12 col-sm-10 col-md-10 col-lg-10"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="meetup.title"></v-card-title>

              <v-card-subtitle v-text="meetup.caption"> </v-card-subtitle>
              <div class=" ml-4"><v-icon>mdi-timer-outline</v-icon> {{ meetup.date | date }}</div>
              <div class=" ml-4">
                <v-icon>mdi-map-marker-outline</v-icon> {{ meetup.location }}
              </div>
              <v-card-actions>
                <v-btn text @click="routeWithId(meetup.id)">
                  <v-icon>
                    mdi-arrow-right
                  </v-icon>
                  View Meetup</v-btn
                >
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="meetup.imageUrl"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
      routeWithId(id) {
          this.$router.push('/meetups/' + id);
      }
  },
};
</script>
