import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
              id: "1",
              imageUrl:
                "https://res.cloudinary.com/raph941/image/upload/v1580728850/samples/bike.jpg",
              title: "Supermodel ",
              detail: "industry. Lorem Ipsum has been the industry's standard dever since the 1500s, when an unknown printer ",
              caption: "this is the caption of this meetup, hurray suckers",
              location: "Berline",
              address: "24 Jump Street",
              date: '2017-07-17'
            },
            {
              id: "2",
              color: "#952175",
              imageUrl:
                "https://res.cloudinary.com/raph941/image/upload/v1580728853/samples/imagecon-group.jpg",
              title: "Halcyon Days",
              detail: "industry. Lorem Ipsum has been the industry's standard dever since the 1500s, when an unknown printer ",
              caption: "this is the caption of this meetup, hurray suckers",
              location: "Helsinki",
              address: "24 Jump Street",
              date: '2020-07-17'
            },
        ],
        user: {
            id: 'dsgh123',
            registeredMeetups: ['bsdhb123'] 
        }, 
    },
    mutations: {},
    actions: {},
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5);
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
    },
})