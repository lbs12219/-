class ORDERNUMBER {
  constructor() {
    this.number = 1;
    this.openidObj = {};
  }
  order(openid) {
    try {
      if (this.findOpenid(openid)) {
        this.openidObj[openid]["number"]++;
        // this.getThis()
        return this.openidObj[openid]["number"];
      } else {
        this.openidObj[openid] = {};
        this.openidObj[openid]["number"] = this.number;
        // this.getThis()
        return 1;
      }
    } catch (err) {
      return err;
    }
  }
//   init() {
//     this.number = 1;
//   }
  findOpenid(openid) {
    return Object.keys(this.openidObj).includes(openid);
  }
  getThis(){
    console.log(this.openidObj)
  }
}

module.exports = ORDERNUMBER;
