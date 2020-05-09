import Vue from 'vue'
import Router from 'vue-router'
import Home from './node_modules/@/components/Home'
import Meetups from './node_modules/@/components/Meetup/Meetups'
import CreateMeetup from './node_modules/@/components/Meetup/CreateMeetup'
import Meetupdetail from './node_modules/@/components/Meetup/Meetupdetail.vue'
import Profile from './node_modules/@/components/User/Profile'
import Signin from './node_modules/@/components/User/Signin'
import Signup from './node_modules/@/components/User/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/meetups/:id',
      name: 'meetupdetail',
      component: Meetupdetail
    },
  ],
  mode: 'history'
})
