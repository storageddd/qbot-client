import store from 'src/store';

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    beforeEnter: (to, from, next) => {
      if (!navigator.onLine) {
        next('/connection');
        return;
      }

      if (!store.state.auth.isAuthorized) {
        next('/login');
        return;
      }

      next();
    }
  },
  {
    path: '/',
    component: () => import('layouts/Guest.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') }
    ],
    beforeEnter: (to, from, next) => {
      if (!navigator.onLine) {
        next('/connection');
        return;
      }

      if (store.state.auth.isAuthorized) {
        next('/');
        return;
      }

      next();
    }
  },
  {
    path: '/',
    component: () => import('layouts/Error.vue'),
    children: [
      { path: '404', component: () => import('pages/Error404.vue')},
      {
        path: 'connection',
        component: () => import('pages/ConnectionError.vue'),
        beforeEnter: (to, from, next) => {
          if (navigator.onLine) {
            next('/')
            return;
          }

          next();
        }}
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

routes.push();

export default routes;
