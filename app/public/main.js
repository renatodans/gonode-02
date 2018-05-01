$(document).ready(function() {

  /**
   * Alerts
   */
  setTimeout(function() {
    var alert = document.querySelector('.alert');
    if (alert) {
      alert.className += ' alert-hidden';
    }
  }, 3000);
});

