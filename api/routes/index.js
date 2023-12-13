const { Router } = require("express")
const { categoryController, productController, userController } = require("../controllers")
const verifyToken = require("../middlewares/validate-token")
const router = Router()

//Rutas Usuario
router.post("/register", userController.signIn)
router.post("/login", userController.login)

// Rutas Categorias
router.post("/category/create", verifyToken, categoryController.addCategory)
router.post("/category/list", verifyToken, categoryController.getCategories)
router.post("/category/search", verifyToken, categoryController.getCategoryByName)
router.get("/category/search/:id", categoryController.getCategoryById)
router.put("/category/update", verifyToken, categoryController.updateCategory)
router.post("/category/delete", verifyToken, categoryController.deleteCategory)

// Rutas Productos
router.post("/product/create", verifyToken, productController.addProduct)
router.post("/product/list", verifyToken, productController.getProducts)
router.post("/product/search", verifyToken, productController.getProductByName)
router.get("/product/search/:id", productController.getProductById)
router.put("/product/update", verifyToken, productController.updateProduct)
router.post("/product/delete", verifyToken, productController.deleteProduct)
router.put("/stock/update", verifyToken, productController.updateStock)


module.exports = router