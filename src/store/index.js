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
        loading: false,
        error: null,
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadedMeetups({commit}) {
            firebase.data.ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                })
                .catch(
                    (error) => {
                        console.log(error)
                    }
                ) 
        },
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString()
            }
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    commit ('createMeetup', {
                    ...meetup,
                    id : key
                    })
                }).catch((error) => {
                    console.log(error)
                })
            //reach out to firebase to store the data
            
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            ).catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser)
                }
            ).catch(
                error => {
                    commit('setError', error)
                }
            )
        },
        clearError ({commit}) {
            commit('clearError')
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
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    },
})