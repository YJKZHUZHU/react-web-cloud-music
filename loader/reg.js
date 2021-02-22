/** @format */

// 匹配jsx中的px 如 1px
const pxReg = /\b(\d+(\.\d+)?)px\b/g

// 匹配jsx中 缩写形式的style 如：marginRight: 1
const styleReg = {
  marginTop: /\bmarginTop(?:\s+):(?:\s+)?(\d+)/g,
  marginRight: /\bmarginRight(?:\s+)?:(?:\s+)?(\d+)/g,
  marginBottom: /\bmarginBottom(?:\s+)?:(?:\s+)?(\d+)/g,
  marginLeft: /\bmarginLeft(?:\s+)?:(?:\s+)?(\d+)/g,
  fontSize: /\bfontSize(?:\s+)?:(?:\s+)?(\d+)/g,
  paddingTop: /\bpaddingTop(?:\s+)?:(?:\s+)?(\d+)/g,
  paddingRight: /\bpaddingRight(?:\s+)?:(?:\s+)?(\d+)/g,
  paddingBottom: /\bpaddingBottom(?:\s+)?:(?:\s+)?(\d+)/g,
  paddingLeft: /\bpaddingLeft(?:\s+)?:(?:\s+)?(\d+)/g
}

// 匹配img 中的行内样式 width: '20'
const imgReg = {
  height: /\bheight(?:\s+)?=(?:\s+)?(\'||\")?(\d+)?=(\'||\")?/g,
  width: /\bwidth(?:\s+)?=(?:\s+)?(\'||\")?(\d+)?=(\'||\")?/g
}

// 匹配数字
const numReg = /(\d+)/g
module.exports = {
  pxReg,
  styleReg,
  imgReg,
  numReg
}
