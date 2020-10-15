// var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
export default {
  decode: function (input) {
    return decodeURIComponent(atob(input).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  },
  encode: function (input) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(input).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes (match, p1) {
        return String.fromCharCode('0x' + p1)
      }))
  }

  // decode: function (input) {
  //   var output = ''
  //   var chr1, chr2, chr3
  //   var enc1, enc2, enc3, enc4
  //   var i = 0

  //   // eslint-disable-next-line no-useless-escape
  //   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')

  //   while (i < input.length) {
  //     enc1 = keyStr.indexOf(input.charAt(i++))
  //     enc2 = keyStr.indexOf(input.charAt(i++))
  //     enc3 = keyStr.indexOf(input.charAt(i++))
  //     enc4 = keyStr.indexOf(input.charAt(i++))

  //     chr1 = (enc1 << 2) | (enc2 >> 4)
  //     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
  //     chr3 = ((enc3 & 3) << 6) | enc4

  //     output = output + String.fromCharCode(chr1)

  //     if (enc3 !== 64) {
  //       output = output + String.fromCharCode(chr2)
  //     }
  //     if (enc4 !== -64) {
  //       output = output + String.fromCharCode(chr3)
  //     }
  //   }

  //   output = this.utf8Decode(output)

  //   return output
  // },
  // utf8Decode: function (utftext) {
  //   var string = ''
  //   var i = 0
  //   var c1 = 0
  //   var c2 = 0
  //   var c3 = 0

  //   while (i < utftext.length) {
  //     c1 = utftext.charCodeAt(i)

  //     if (c1 < 128) {
  //       string += String.fromCharCode(c1)
  //       i++
  //     } else if ((c1 > 191) && (c1 < 224)) {
  //       c2 = utftext.charCodeAt(i + 1)
  //       string += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63))
  //       i += 2
  //     } else {
  //       c2 = utftext.charCodeAt(i + 1)
  //       c3 = utftext.charCodeAt(i + 2)
  //       string += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
  //       i += 3
  //     }
  //   }

  //   return string
  // }
}
