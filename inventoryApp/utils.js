// Utility functions and global variables

// Helper function to get DOM elements
export function getElement(id) {
    return document.getElementById(id)
  }
  
  // Global variables
  export const elements = {
    sbProductButton: getElement("productButton"),
    sbCategoriesButton: getElement("categoriesButton"),
    newProductButton: getElement("newProductButton"),
    newCategoryButton: getElement("newCategoryButton"),
    cancelAddProduct: getElement("cancelAddProduct"),
    cancelAddCategory: getElement("cancelAddCategory"),
    acceptProductButton: getElement("acceptProductButton"),
    acceptCategoryButton: getElement("acceptCategoryButton"),
    productMenu: getElement("addProducts"),
    categoryMenu: getElement("addCategories"),
    sourceOfTruthContainer: getElement("sourceOfTruthContainer"),
    productPageContainer: getElement("productPageContainer"),
  }
  
  export const sourceOfTruth = []
  
  // Utility function to generate a unique ID
  export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
  
  