import { setupProductListeners, renderProducts } from "./product-functions.js"
import { setupUIListeners } from "./ui-functions.js"
import { sourceOfTruth } from "./utils.js"

function initializeApp() {
  setupProductListeners()
  setupUIListeners()
  renderProducts()
}

// Load initial data (if any)
function loadInitialData() {
  const savedData = localStorage.getItem("inventoryData")
  if (savedData) {
    sourceOfTruth.push(...JSON.parse(savedData))
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("inventoryData", JSON.stringify(sourceOfTruth))
}

document.addEventListener("DOMContentLoaded", () => {
  loadInitialData()
  initializeApp()
})

// Save data periodically or on certain actions
window.addEventListener("beforeunload", saveData)

