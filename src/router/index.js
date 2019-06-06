import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Join = () => import('@/views/Join')
const Chat = () => import('@/views/Chat')

export default new Router({
    routes: [
      {
        path: '/',
        name: 'join',
        component: Join
      },
      {
        path: '/chat',
        name: 'chat',
        component: Chat,
        props: true
      }
    ]
  })