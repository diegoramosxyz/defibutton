(function (history) {
  var pushState = history.pushState
  history.pushState = function (state) {
    window.goatcounter.count({
        path: location.pathname,
      })
    return pushState.apply(history, arguments)
  }
})(window.history)