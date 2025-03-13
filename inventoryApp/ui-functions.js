import { elements } from "./utils.js"

export function showProducts() {
  elements.productPageContainer.style.display = "none"
  getElement("productCategory").style.display = "flex"
  getElement("categoriesContainer").style.display = "none"
}

export function showCategories() {
  elements.productPageContainer.style.display = "none"
  getElement("productCategory").style.display = "none"
  getElement("categoriesContainer").style.display = "flex"
}

export function toggleProductMenu() {
  const isVisible = elements.productMenu.style.display === "flex"
  elements.productMenu.style.display = isVisible ? "none" : "flex"
  elements.newProductButton.style.display = isVisible ? "block" : "none"
  elements.cancelAddProduct.style.display = isVisible ? "none" : "block"
}

export function toggleCategoryMenu() {
  const isVisible = elements.categoryMenu.style.display === "flex"
  elements.categoryMenu.style.display = isVisible ? "none" : "flex"
  elements.newCategoryButton.style.display = isVisible ? "block" : "none"
  elements.cancelAddCategory.style.display = isVisible ? "none" : "block"
}

export function setupUIListeners() {
  elements.sbProductButton.addEventListener("click", showProducts)
  elements.sbCategoriesButton.addEventListener("click", showCategories)
  elements.newProductButton.addEventListener("click", toggleProductMenu)
  elements.cancelAddProduct.addEventListener("click", toggleProductMenu)
  elements.newCategoryButton.addEventListener("click", toggleCategoryMenu)
  elements.cancelAddCategory.addEventListener("click", toggleCategoryMenu)
  // Add more UI-related event listeners here
}

function getElement(id) {
  return document.getElementById(id)
}

