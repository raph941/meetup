import * as firebase from 'firebase'
//Note this file holds the state for meetup related stuff

export default {
    state: {
        loadedMeetups: [],
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
        updateMeetup (state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
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
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
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
                            creatorId: obj[key].creatorId,
                            location: obj[key].location
                        })
                    }
                    commit('setLoading', false)
                    commit('setLoadedMeetups', meetups)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                ) 
        },
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                }).then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.')) //slices the file name after the dot, to obtain the  extension of the image
                    return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
                })
                .then(fileData => {
                    const pathToFile = fileData.ref.fullPath
                    const fileReference = firebase.storage().ref(pathToFile)
                    return fileReference.getDownloadURL()
                })
                .then(url => {
                    imageUrl = url
                    return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup, 
                        imageUrl: imageUrl, 
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            //reach out to firebase to store the data
            
        },
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('updateMeetup', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
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
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    },
}