//Function to save quantity in local storage with add to cart button 
function addToCartButton() {
    const addToCartButton = document.getElementById('addToCartButton');
    const cartFill = document.getElementById('cartFill');

    addToCartButton.addEventListener('click', () => {
        if (mainQuantity > 0) {

            mainQuantityLS += 

            cartFill.classList.add('active');
            cartFill.textContent = mainQuantityLS;
            localStorage.setItem('mainQuantityLS', mainQuantity);
            console.log('Cantidad en Local Storage:', mainQuantityLS);
            reset()
        } else {
            alert('Quantity cannot be less than 0');
            return;
        }
    })
}
addToCartButton()