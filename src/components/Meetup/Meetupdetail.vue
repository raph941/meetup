<template>
  <v-container>
    <v-layout row wrap>
      <v-flex col-12>
        <v-card>
          <v-card-title>
            <h4>{{ meetup.title }}</h4>
          </v-card-title>
          <v-img
            :src="meetup.imageUrl"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="info--text">{{ meetup.date }} -- {{ meetup.address }}</div>
            <div>
              {{meetup.detail}}
            </div>
          </v-card-text>
          <v-card-action>
            <v-btn class="ma-2" tile color="indigo" dark>Register</v-btn>
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
      }
    }
  }
</script>