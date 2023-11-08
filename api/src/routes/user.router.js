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

router.post("/signup", postUser); 
router.post("/signin", getUser); 

router.post("/subscribelist", postSubscribeList).delete("/subscribelist", removeFromSubscribeList);
router.post("/watchlist", postWatchList);

router
  .post("/checkSubribeList", checkSubribeList)
  .delete("/checkSubribeList", removeWatchList);

router
  .post("/checkWatchList", checkWatchList)
  .delete("/checkWatchList", removeWatchList);

router.get("/watchlistPage", getWatchList);

module.exports = router;
