(function (define) {
  define("noBRNValidator", function (require, exports) {
    exports.isValid = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 9) {
        return false;
      }

      if (!/^[8|9]\d+$/.test(number)) {
        return false;
      }

      if (exports.calculateChecksum(number.substring(0, 8)).toString() !== number[8]) {
        return false;
      }

      return true;
    };

    exports.calculateChecksum = function (number) {
      if (typeof number !== "string") {
        return false;
      }

      if (number.length !== 8) {
        return false;
      }

      number = number.split("").map(function (number) {
        return parseInt(number);
      });

      var checksum =
          11
        - ( (   3 * number[0]
              + 2 * number[1]
              + 7 * number[2]
              + 6 * number[3]
              + 5 * number[4]
              + 4 * number[5]
              + 3 * number[6]
              + 2 * number[7]
            )
            % 11
          );

      if (checksum === 10) {
        return false;
      }

      if (checksum === 11) {
        checksum = 0;
      }

      return checksum;
    };
  });
}(typeof define === 'function' && define.amd ? define : function (id, factory) {
  if (typeof exports !== 'undefined') {
    factory(require, exports);
  } else {
    factory(function(value) {
      return window[value];
    }, (window[id] = {}));
  }
}));
