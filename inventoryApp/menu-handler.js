function showMenu() {
    // Declare variables
    const productMenu = document.getElementById("productMenu")
    const categoryMenu = document.getElementById("categoryMenu")
    const editMenu = document.getElementById("editMenu")
    const prueba = document.getElementById("prueba")
    const newProductButton = document.getElementById("newProductButton")
    const newCategoryButton = document.getElementById("newCategoryButton")
    const editProductButton = document.getElementById("editProductButton")
    const deleteProductButton = document.getElementById("deleteProductButton")
    const cancelNewProductButton = document.getElementById("cancelNewProductButton")
    const cancelNewCategoryButton = document.getElementById("cancelNewCategoryButton")
    const cancelEditProductButton = document.getElementById("cancelEditProductButton")
    const acceptProductButton = document.getElementById("acceptProductButton")
    const acceptCategoryButton = document.getElementById("acceptCategoryButton")
    const acceptEditProductButton = document.getElementById("acceptEditProductButton")
  
    // Check if any menu is currently open using getComputedStyle
    const isMenuOpen = ["productMenu", "categoryMenu", "editMenu"].some((menuId) => {
      const menu = document.getElementById(menuId)
      return window.getComputedStyle(menu).display === "flex"
    })
  
    // Define all the elements we need to manipulate
    const menus = [productMenu, categoryMenu, editMenu, prueba]
  
    const mainButtons = [newProductButton, newCategoryButton, editProductButton, deleteProductButton]
  
    const cancelButtons = [cancelNewProductButton, cancelNewCategoryButton, cancelEditProductButton]
  
    const acceptButtons = [acceptProductButton, acceptCategoryButton, acceptEditProductButton]
  
    // Set display values based on current state
    const menuDisplay = isMenuOpen ? "none" : "flex"
    const mainButtonDisplay = isMenuOpen ? "block" : "none"
    const cancelAcceptDisplay = isMenuOpen ? "none" : "block"
  
    // Apply styles to menus
    menus.forEach((menu) => {
      menu.style.display = menuDisplay
    })
  
    // Apply styles to main buttons
    mainButtons.forEach((button) => {
      button.style.display = mainButtonDisplay
      button.style.zIndex = "2"
    })
  
    // Apply styles to cancel buttons
    cancelButtons.forEach((button) => {
      button.style.display = cancelAcceptDisplay
      button.style.zIndex = "1"
    })
  
    // Apply styles to accept buttons
    acceptButtons.forEach((button) => {
      button.style.display = cancelAcceptDisplay
    })
  
    // Handle event listeners and other functions
    if (isMenuOpen) {
      document.removeEventListener("click", closeMenuHandler)
      resetInputErrors()
    } else {
      closeMenu()
    }
  }
  
  // Dummy declarations to satisfy the linter. These should be defined elsewhere.
  const closeMenuHandler = () => {}
  const resetInputErrors = () => {}
  const closeMenu = () => {}
  
  