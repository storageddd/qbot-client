const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: 'index', component: () => import('pages/Index.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: () => import('layouts/Guest.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Error.vue'),
    children: [
      { path: '404', component: () => import('pages/Error404.vue')},
      {
        path: 'connection',
        component: () => import('pages/ConnectionError.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '404'
  },
  {
    path: '/',
    redirect: 'index'
  }
];

export default routes;
