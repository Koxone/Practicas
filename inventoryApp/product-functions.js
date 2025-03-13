import { elements, sourceOfTruth, generateUniqueId } from "./utils.js"

export function addProduct(productData) {
  const newProduct = {
    id: generateUniqueId(),
    ...productData,
    status: true, // Assuming new products are active by default
  }
  sourceOfTruth.push(newProduct)
  renderProducts()
}

export function renderProducts() {
  const container = elements.sourceOfTruthContainer
  container.innerHTML = ""
  sourceOfTruth.forEach((product) => {
    const productElement = createProductElement(product)
    container.appendChild(productElement)
  })
}

function createProductElement(product) {
  const div = document.createElement("div")
  div.classList.add("productContainer")
  div.id = product.id
  div.innerHTML = `
        <input type="checkbox" class="checkInput" />
        <div class="imageContainer">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/defaultImage.webp';" />
        </div>
        <p class="name">${product.name}</p>
        <div class="status">${product.status ? "Active" : "Inactive"}</div>
        <p class="stock">${product.quantity} in Stock</p>
        <p class="category">${product.category}</p>
    `
  return div
}

export function setupProductListeners() {
  elements.acceptProductButton.addEventListener("click", handleProductSubmit)
  // Add more product-related event listeners here
}

function handleProductSubmit() {
  const name = getElement("productName").value
  const quantity = getElement("productQuantity").value
  const price = getElement("productPrice").value
  const code = getElement("productCode").value
  const category = getElement("productCategory").value
  const imageInput = getElement("uploadImageInput")

  if (name && quantity && price && code && category && imageInput.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const productData = {
        name,
        quantity: Number.parseInt(quantity),
        price: Number.parseFloat(price),
        code,
        category,
        image: e.target.result,
      }
      addProduct(productData)
      resetProductForm()
    }
    reader.readAsDataURL(imageInput.files[0])
  } else {
    alert("Please fill all fields and upload an image")
  }
}

function resetProductForm() {
  getElement("productName").value = ""
  getElement("productQuantity").value = ""
  getElement("productPrice").value = ""
  getElement("productCode").value = ""
  getElement("productCategory").value = "chooseCategory"
  getElement("uploadImageInput").value = ""
}

function getElement(id) {
  return document.getElementById(id)
}

