<template>
  <div>
    <div class="text-center">
      <v-btn router to="/meetups" class="ma-2" outlined color="indigo"
        >Explore Meetups</v-btn
      >
      <v-btn router to="/meetups/new" class="ma-2" outlined color="indigo"
        >Organize Meetup</v-btn
      >
    </div>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      class="carousel"
      style="cursor: pointer"
    >
      <v-carousel-item
        v-for="meetup in meetups"
        :key="meetup.id"
        :src="meetup.imageUrl"
        @click="routeWithId(meetup.id)"
      >
        <v-row align="bottom" justify="center">
          <div class="body-1 meetup-title">{{ meetup.title }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  computed: {
    meetups () {
        return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    routeWithId(id) {
      this.$router.push("/meetups/" + id);
    },
  },
};
</script>

<style scoped>
.meetup-title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  font-size: 2em;
  border-radius: 5px;
  color: white;
}
</style>
