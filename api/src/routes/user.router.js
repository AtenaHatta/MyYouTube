const router = require("express").Router();
const {
  postUser,
  getUser,
  postWatchList,
  postSubscribeList,
  checkWatchList,
  removeWatchList,
  checkSubribeList,
  getWatchList,
  removeFromSubscribeList
} = require("../controller/user.controller");

router.post("/signup", postUser); //when user go to /signup, run postUser function

router.post("/signin", getUser); //when user go to /signin, run getUser function

router.post("/watchlist", postWatchList);
router.post("/subscribelist", postSubscribeList).delete("/subscribelist", removeFromSubscribeList);

router
  .post("/checkWatchList", checkWatchList)
  .delete("/checkWatchList", removeWatchList);
  
router
  .post("/checkSubribeList", checkSubribeList)
  .delete("/checkWatchList", removeWatchList);

router.get("/watchlistPage", getWatchList);

// router.post('/subscribelist', postSubscribeList)

module.exports = router;
