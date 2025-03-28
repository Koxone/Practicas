//Global Variables
let sliderIndex = 0;
let mainQuantity = 0;

//Global Local Storage Variables
let mainQuantityLS = JSON.parse(localStorage.getItem('mainQuantityLS')) || 0;

//Active or Inactive State Elements in Local Storage
let activeElements = JSON.parse(localStorage.getItem('activeElements')) || {};

//Quick test Section
console.log('Quantity:', mainQuantity);
console.log('Quantity in Local Storage:', mainQuantityLS);
const avatar  = document.getElementById('avatarContainer');
avatar.addEventListener('click', () => {
    localStorage.clear();
})

//Function to save status in Local Storage
function saveStatus() {
    localStorage.setItem('activeElements', JSON.stringify(activeElements));
}

//Function to get Active Elements from Local Storage
function loadStatus() {
    const savedStatus = localStorage.getItem('activeElements');
    return savedStatus ? JSON.parse(savedStatus) : {};
}

//Function to Open Main Menu
function openMainMenu() {
    const mainMenu = document.getElementById('mainMenuContainer');
    const layout = document.getElementById('layout');

    mainMenu.style.display = 'flex';
    layout.style.display = 'flex';
}

//Function to Open Main Menu
function closeMainMenu() {
    const mainMenu = document.getElementById('mainMenuContainer');
    const layout = document.getElementById('layout');

    mainMenu.style.display = 'none';
    layout.style.display = 'none';
}

//Event Listener for Main Menu Button
function mainMenuButton() {
    const mainMenuButton = document.getElementById('mainMenuButton');
    mainMenuButton.addEventListener('click', () => {
        openMainMenu()
    })
}
mainMenuButton()

//Event Listener for Close Button in Main Menu
function closeMainMenuButton() {
    const  closeButton = document.getElementById('mainMenuCloseButton');
    closeButton.addEventListener('click', () => {
        closeMainMenu()
    })
}
closeMainMenuButton()

//Function to update quantity
function updateQuantity() {
    const quantity = document.getElementById('quantity');
    quantity.textContent = mainQuantity;
}

//Function to reset quantity 
function reset() {
    const quantity = document.getElementById('quantity');
    quantity.textContent = 0;
    mainQuantity = 0;
}

//Event Listeners for Minus and Plus Buttons
function plusButton() {
    const plusButton = document.getElementById('plusButton');

    plusButton.addEventListener('click', () => {
        if (mainQuantity >= 0) {
            mainQuantity++;
            mainQuantityLS++;
            updateQuantity()
            console.log('Cantidad Actual Plus:', mainQuantity)
        }
    })
}
plusButton()

//Event Listeners for Minus and Plus Buttons
function minusButton() {
    const minusButton = document.getElementById('minusButton');

    minusButton.addEventListener('click', () => {
        if (mainQuantity > 0) {
            mainQuantity--;
            mainQuantityLS--;
            updateQuantity()
            console.log('Cantidad Actual Minus:', mainQuantity)
        } else {
            console.log('Tiene que ser minimo 1')
            return;
        }
    })
}
minusButton()

//Function to Update UI
function updateUi() {
    let pieces = document.getElementById('quantityInput');
    let price = document.getElementById('currentPrice');//$125.00
    let priceText = price.textContent;
    priceText = priceText.replace('$', '');
    let priceNumber = parseFloat(priceText); //125.00

    const totalPrice = document.getElementById('totalPrice');  //Total del  carro

    pieces.value = mainQuantityLS;
    totalPrice.textContent = `$${priceNumber * mainQuantityLS}`;
}
updateUi()

//Function for Checkout Button in cart
function checkoutButtonCart() {
    const input = document.getElementById('quantityInput').value;

    localStorage.setItem('mainQuantityLS', JSON.stringify(input));
}

//Function to manipulate quantity inside cart
function quantityInsideCart() {
    const cartMinusButton = document.getElementById('cartMinusButton');
    const cartPlusButton = document.getElementById('cartPlusButton');
    const input = document.getElementById('quantityInput');
    const total = document.getElementById('totalPrice');
    const price = document.getElementById('price');
    let priceText = document.getElementById('price').textContent;
    const checkoutButton = document.getElementById('checkoutButton');
    const cartFill = document.getElementById('cartFill');

    priceText = priceText.replace('$', '');
    const priceNumber = parseFloat(priceText);

    cartPlusButton.addEventListener('click', () => {
        input.value++;
        mainQuantity++;
        mainQuantityLS++;
        total.textContent = `$${input.value * priceNumber}`;
    })
    cartMinusButton.addEventListener('click', () => {
        input.value--;
        mainQuantity--;
        mainQuantityLS--;
        total.textContent = `$${input.value * priceNumber}`;
    })

    checkoutButton.addEventListener('click', () => {
        checkoutButtonCart()
        cartFill.textContent = mainQuantityLS;
    })
}
quantityInsideCart()

//Function to save quantity in local storage with add to cart button 
function addToCartButton() {
    const addToCartButton = document.getElementById('addToCartButton');
    const cartFill = document.getElementById('cartFill');
    const cartId = cartFill.id;

    addToCartButton.addEventListener('click', () => {
        if (mainQuantity > 0) {
            cartFill.classList.add('active');
            activeElements[cartId] = {
                id: cartId, 
                status: true
            }
            saveStatus()
            localStorage.setItem('mainQuantityLS', JSON.stringify(mainQuantityLS));
            cartFill.textContent = mainQuantityLS;
            console.log('Cantidad en Local Storage:', mainQuantityLS);
            reset()
            updateUi()
        } else {
            alert('Quantity cannot be less than 0');
            return;
        }
    })
}
addToCartButton()

//Function to show Cart Menu
function showCartMenu() {
    const cartButton = document.getElementById('mainCartButton');
    cartButton.addEventListener('click', () => {
        const cartMenu = document.getElementById('cartMenu');
        const cartValue = getComputedStyle(cartMenu);

        if (cartValue.display !== 'flex') {
            cartMenu.style.display = 'flex'
        } else {
            cartMenu.style.display = 'none'
        }

    })
}
showCartMenu()

//Function to get saved elements and add Active Class
function applyActiveStatus() {
    const activeElements = loadStatus();
    for (let cartId in activeElements) {
        const cart = activeElements[cartId];
        const element = document.getElementById(cart.id);

        if (element && cart.status) {
            element.classList.add('active');
            element.textContent = mainQuantityLS
        }
    }
}
applyActiveStatus()

//Function for Picture Slider
function pictureSlider() {
    const nextButton = document.getElementById('nextButtonMain')
    const prevButton = document.getElementById('prevButtonMain')
    const images = document.querySelectorAll('.sliderPicture')
    
    nextButton.addEventListener('click', () => {

        images[sliderIndex].classList.remove('active')

        sliderIndex++;
        if (sliderIndex >= images.length) {
            sliderIndex = 0;
        }

        images[sliderIndex].classList.add('active')
    })

    prevButton.addEventListener('click', () => {

        images[sliderIndex].classList.remove('active')

        sliderIndex--;
        if (sliderIndex < 0) {
            sliderIndex = images.length - 1;
        }

        images[sliderIndex].classList.add('active')
    })
    
}
pictureSlider()

//Function to hide prev and next button
function hideButtons() {
    const prevButton = document.querySelectorAll('.prevButton')
    const nextButton = document.querySelectorAll('.nextButton')
    
    prevButton.forEach(function (button) {
        button.style.display = 'none'
    })
    nextButton.forEach(function (button) {
        button.style.display = 'none'
    })
}

//Function to hide prev and next button
function showButtons() {
    const prevButton = document.querySelectorAll('.prevButton')
    const nextButton = document.querySelectorAll('.nextButton')
    
    prevButton.forEach(function (button) {
        button.style.display = 'flex'
    })
    nextButton.forEach(function (button) {
        button.style.display = 'flex'
    })
}

//Function for LightBox
function lightboxHandler() {
    const imagesMain = document.querySelectorAll('.sliderPicture');
    const layout = document.getElementById('layout');
    imagesMain.forEach(image => {
        image.addEventListener('click', (event) => {
            const lightboxContainer = document.getElementById('lightboxContainer');
            lightboxContainer.classList.add('active')
            layout.style.display = 'flex'
            hideButtons()
        })
    });
}
lightboxHandler()

//Function to close lightbox
function closeLightboxButton() {
    const closeLightbox = document.getElementById('closeButtonLightbox');
    const layout = document.getElementById('layout');
    closeLightbox.addEventListener('click', () => {
        const lightboxContainer = document.getElementById('lightboxContainer');
        lightboxContainer.classList.remove('active');
        layout.style.display = 'none'
        showButtons()
    })
}
closeLightboxButton()

//Function for browsing images inside lightbox
function lightboxBrowser() {
    const imagesMosaic = document.querySelectorAll('.lightboxImage');
    const currentLightboxImage = document.querySelector('.lightboxCurrentImage');

    imagesMosaic.forEach(image => {
        image.addEventListener('click', () => {
            let  imageSrc = image.src;
            currentLightboxImage.src = imageSrc
        })
    });
}
lightboxBrowser()



