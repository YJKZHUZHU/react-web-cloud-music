/** @format */

const _ = require("lodash") // lodash是一个js工具库，特别方便建议各位去了解一下
const regRules = require("./reg")

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable()
  }
  let backUp = source

  // style={{marginRight: '1px'}} => style={{marginRight: '0.01rem'}}
  if (regRules.pxReg.test(backUp)) {
    backUp = backUp.replace(regRules.pxReg, (px) => {
      let val = px.replace(regRules.numReg, (num) => {
        return num / 256
      })
      val = val.replace(/px$/, "rem")
      return val
    })
  }

  // marginRight: 1 => marginRight: '0.01rem'
  _.each(regRules.styleReg, (reg, styleName) => {
    if (reg.test(backUp)) {
      backUp = backUp.replace(reg, (val) => {
        return val.replace(regRules.numReg, (num) => {
          return `"${num / 256}rem"`
        })
      })
    }
  })

  // img标签 width: 1 => style={{width: '0.01rem'}}
  _.each(regRules.imgReg, (reg, styleName) => {
    if (reg.test(backUp)) {
      backUp = backUp.replace(reg, (val) => {
        let style = null
        val.replace(regRules.numReg, (num) => {
          if (typeof num === "number") {
            style = `${num / 256}rem`
          }
        })
        if (style) {
          return `style={{${styleName}:"${style}"}}`
        }
        return val
      })
    }
  })

  return backUp
}
