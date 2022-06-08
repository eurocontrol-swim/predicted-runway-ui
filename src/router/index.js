import * as VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ArrivalsPage from '@/pages/ArrivalsPage.vue';
import ArrivalsRunwayPredictionPage from '@/pages/ArrivalsRunwayPredictionPage.vue';
import ArrivalsRunwayConfigPredictionPage from '@/pages/ArrivalsRunwayConfigPredictionPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: 'arrivals/:destinationIcao',
        name: 'Arrivals',
        component: ArrivalsPage,
        children: [
          {
            path: 'runway-prediction',
            name: 'ArrivalsRunwayPrediction',
            component: ArrivalsRunwayPredictionPage,
          },
          {
            path: 'runway-config-prediction',
            name: 'ArrivalsRunwayConfigPrediction',
            component: ArrivalsRunwayConfigPredictionPage,
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
