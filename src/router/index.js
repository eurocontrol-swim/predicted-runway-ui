import * as VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: '/arrivals/:destinationIcao',
        name: 'Arrivals',
        component: () => import(/* webpackChunkName: "arrivals" */ '@/pages/ArrivalsPage'),
        children: [
          {
            path: '/arrivals/:destinationIcao/runway-prediction',
            name: 'ArrivalsRunwayPrediction',
            component: () => import(/* webpackChunkName: "runway-prediction" */ '@/pages/ArrivalsRunwayPredictionPage')
          },
          {
            path: '/arrivals/:destinationIcao/runway-config-prediction',
            name: 'ArrivalsRunwayConfigPrediction',
            component: () => import(/* webpackChunkName: "runway-config-prediction" */ '@/pages/ArrivalsRunwayConfigPredictionPage')
          }
        ]
      }
    ]
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

export default router;
