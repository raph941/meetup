import Vue from 'vue'
import Vuex from 'vuex'
import meetup from './Meetup'
import user from './User'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
   modules: {
       meetup: meetup,
       user: user,
       shared
   }
})

//Note this file holds a combination of states from the meetup and user module