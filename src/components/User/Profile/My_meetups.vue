<template>
<div>
    <template class="myMeetupTemplate">
        <v-btn text color="deep-purple accent-4" >
            My MeetUps
        </v-btn>

        <v-list two-line>
            <v-list-item-group multiple >
                <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                    <template >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                            <v-icon color="grey lighten-1" >
                                mdi-star
                            </v-icon>
                        </v-list-item-action>
                    </template>
                </v-list-item>

                <v-divider
                    v-if="index + 1 < items.length"
                    :key="index" >
                </v-divider>
                </template>
            </v-list-item-group>
            </v-list>
    </template>
</div>
</template>


<script>
  export default {
    data: () => ({
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
    },
    computed: {
    }
  }
</script>
