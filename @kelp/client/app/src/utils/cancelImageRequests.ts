function cancelImageRequests() {
  if (window.stop) {
    window.stop()
  } else if (document.execCommand) {
    document.execCommand('Stop', false)
  }
}

export default cancelImageRequests
