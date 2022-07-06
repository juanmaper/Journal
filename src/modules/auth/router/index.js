
export default {
  name: 'auth',
  component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layouts/AuthLayout.vue'),
  children: [

  ]
}