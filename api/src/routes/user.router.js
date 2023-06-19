const router = require("express").Router();
const {
  postUser,
  getUser,
  postWatchList,
  checkWatchList,
  removeWatchList,
  getWatchList,
} = require("../controller/user.controller");

router.post("/signup", postUser); //when user go to /signup, run postUser function

router.post("/signin", getUser); //when user go to /signin, run getUser function

router.post("/watchlist", postWatchList);

router
  .post("/checkWatchList", checkWatchList)
  .delete("/checkWatchList", removeWatchList);

router.get("/watchlistPage", getWatchList);

// router.post('/subscribelist', postSubscribeList)

module.exports = router;
