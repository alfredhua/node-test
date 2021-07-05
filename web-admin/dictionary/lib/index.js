import router from './router';
import view from './view';

router.use('', view.routes());

export default router;