'use strict';
/* from http://codereview.stackexchange.com/a/38096 */

$.fn.selectText = function () {
  return $(this).on('click', function () {

    var range, selection;

    if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.removeAllRanges();
      selection.addRange(range);
    } else if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(this);
      range.select();
    }
  });
};