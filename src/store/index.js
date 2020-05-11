import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
              description: "this is the caption of this meetup, hurray suckers",
              location: "Berline",
              address: "24 Jump Street",
              date: new Date()
            },
            {
              id: "2",
              color: "#952175",
              imageUrl:
                "https://res.cloudinary.com/raph941/image/upload/v1580728853/samples/imagecon-group.jpg",
              title: "Halcyon Days",
              detail: "industry. Lorem Ipsum has been the industry's standard dever since the 1500s, when an unknown printer ",
              description: "this is the caption of this meetup, hurray suckers",
              location: "Helsinki",
              address: "24 Jump Street",
              date: new Date()
            },
        ],
        user: null, 
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'tfhbfsd'
            }
            //reach out to firebase to store the data
            commit ('createMeetup', meetup)
        },
        signUserUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        }
    },
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
        user (state) {
            return state.user
        }
    },
})