// Defining text characters for the empty and full hearts
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Grab the modal and error message container
const errorModal = document.getElementById("modal")
const errorMessage = document.getElementById("modal-message")

// Add hidden class so it doesn't appear on load
errorModal.classList.add("hidden")

// Add event listeners to all hearts
const hearts = document.querySelectorAll(".like-glyph")
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    // When user clicks, simulate server call
    mimicServerCall()
      .then(() => {
        if (heart.textContent === EMPTY_HEART) {
          // On success, toggle to full heart
          heart.textContent = FULL_HEART
          heart.classList.add("activated-heart")
        } else {
          // Toggle back to empty heart
          heart.textContent = EMPTY_HEART
          heart.classList.remove("activated-heart")
        }
      })
      .catch((error) => {
        // Show modal with error message
        errorMessage.textContent = error
        errorModal.classList.remove("hidden")
        // Hide after 3 seconds
        setTimeout(() => {
          errorModal.classList.add("hidden")
        }, 3000)
      })
  })
})

// Provided mock server call
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2
      if (isRandomFailure) {
        reject("Random server error. Try again.")
      } else {
        resolve("Pretend remote server notified of action!")
      }
    }, 300)
  })
}
