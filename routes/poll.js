const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');
var ObjectID = require('mongoose').Types.ObjectId;

router
  .route('/')
  .get(handle.showPolls)
  .post(auth, handle.createPoll);

router.get('/user', auth, handle.usersPolls);

router
  .route('/:id')
  .get(handle.getPoll)
  .post(auth, handle.vote)
  .put(auth, handle.updatePoll)
  .delete(auth, handle.deletePoll);

module.exports = router;