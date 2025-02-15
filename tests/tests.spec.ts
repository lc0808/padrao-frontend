import { test, expect } from "@playwright/test";

// Home page tests
test.describe("Home Page", () => {
  test("should load the home page correctly", async ({ page }) => {
    await page.goto("/");

    // Check if logo is visible
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // Verify logo width
    const logoWidth = await logo.evaluate((el) => el.clientWidth);
    expect(logoWidth).toBeGreaterThan(0);

    // Check product count text
    const productCountText = page.locator("[data-testid=Produtos]");
    await expect(productCountText).toBeVisible();

    // Verify products are loaded
    const productCards = page.locator(".grid >> [data-testid=product-card]");
    await expect(productCards).toHaveCount(6);
  });

  test("should open product details page when clicking on product card", async ({
    page,
  }) => {
    await page.goto("/");

    // Click on first product
    const firstProduct = page
      .locator('.grid >> [data-testid="product-card"]')
      .first();
    await firstProduct.click();

    // Wait for navigation
    await page.waitForURL(/product\/1/);

    // Verify product details page
    await expect(page).toHaveURL(/product\/1/);
    await expect(page.locator("[data-testid=product-name]")).toHaveText(
      "Tênis Futurista"
    );
    await expect(page.locator("[data-testid=description-title]")).toHaveText(
      "Descrição"
    );
    await expect(page.locator("[data-testid=description-content]")).toHaveText(
      "Tênis futurista com design inovador e confortável. Ideal para quem busca estilo e conforto."
    );

    // Navigate back to home page
    await page.goBack();
    await expect(page).toHaveURL("/");
  });

  test("should search products correctly", async ({ page }) => {
    await page.goto("/");

    // Type in search input
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.type("Tênis");
    await page.waitForTimeout(500);

    // Verify input value
    const inputValue = await searchInput.inputValue();
    expect(inputValue).toBe("Tênis");

    // Wait for search results
    await page.waitForSelector('.grid >> [data-testid="product-card"]');

    // Verify filtered products
    const products = await page
      .locator('.grid >> [data-testid="product-card"]')
      .count();
    expect(products).toBeGreaterThan(0);

    // Check if all products contain search term
    const productNames = await page
      .locator('.grid >> [data-testid="product-card"]')
      .allTextContents();
    productNames.forEach((name) => {
      expect(name.toLowerCase()).toContain("tênis");
    });
  });
});

// Pagination tests
test.describe("Pagination", () => {
  test("should display pagination correctly", async ({ page }) => {
    await page.goto("/");

    // Check if pagination is visible
    const pagination = page.locator('nav[aria-label="Pagination"]');
    await expect(pagination).toBeVisible();

    // Verify page buttons
    const pageButtons = pagination.locator("button:not([aria-label])");
    await expect(pageButtons).toHaveCount(3);

    // Check if previous button is disabled on first page
    const previousButton = pagination.locator(
      'button[aria-label="Previous page"]'
    );
    await expect(previousButton).toBeDisabled();

    // Check if next button is enabled
    const nextButton = pagination.locator('button[aria-label="Next page"]');
    await expect(nextButton).toBeEnabled();
  });

  test("should navigate to next page correctly", async ({ page }) => {
    await page.goto("/");

    // Get products from first page
    const firstPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const firstPageProductNames = await Promise.all(
      firstPageProducts.map((product) => product.innerText())
    );

    // Click next button
    const nextButton = page.locator('button[aria-label="Next page"]');
    await nextButton.click();

    // Wait for products to update
    await page.waitForSelector(".grid >> [data-testid=product-card]");

    // Get products from second page
    const secondPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const secondPageProductNames = await Promise.all(
      secondPageProducts.map((product) => product.innerText())
    );

    // Verify products changed
    expect(secondPageProductNames).not.toEqual(firstPageProductNames);

    // Check if current page updated
    const currentPageButton = page.locator('button[aria-current="page"]');
    await expect(currentPageButton).toHaveText("2");
  });

  test("should navigate to previous page correctly", async ({ page }) => {
    await page.goto("/");

    // Navigate to second page
    const nextButton = page.locator('button[aria-label="Next page"]');
    await nextButton.click();
    await page.waitForSelector(".grid >> [data-testid=product-card]");

    // Get products from second page
    const secondPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const secondPageProductNames = await Promise.all(
      secondPageProducts.map((product) => product.innerText())
    );

    // Click previous button
    const previousButton = page.locator('button[aria-label="Previous page"]');
    await previousButton.click();

    // Wait for products to update
    await page.waitForSelector(".grid >> [data-testid=product-card]");

    // Get products from first page
    const firstPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const firstPageProductNames = await Promise.all(
      firstPageProducts.map((product) => product.innerText())
    );

    // Verify products changed
    expect(firstPageProductNames).not.toEqual(secondPageProductNames);

    // Check if current page updated
    const currentPageButton = page.locator('button[aria-current="page"]');
    await expect(currentPageButton).toHaveText("1");
  });

  test("should navigate to specific page correctly", async ({ page }) => {
    await page.goto("/");

    // Get products from first page
    const firstPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const firstPageProductNames = await Promise.all(
      firstPageProducts.map((product) => product.innerText())
    );

    // Click on page 3 button
    const page3Button = page.locator("button", { hasText: "3" });
    await page3Button.click();

    // Wait for products to update
    await page.waitForSelector(".grid >> [data-testid=product-card]");

    // Get products from third page
    const thirdPageProducts = await page
      .locator(".grid >> [data-testid=product-card]")
      .all();
    const thirdPageProductNames = await Promise.all(
      thirdPageProducts.map((product) => product.innerText())
    );

    // Verify products changed
    expect(thirdPageProductNames).not.toEqual(firstPageProductNames);

    // Check if current page updated
    const currentPageButton = page.locator('button[aria-current="page"]');
    await expect(currentPageButton).toHaveText("3");
  });
});

// Filter tests
test.describe("Filters", () => {
  test("should filter products by category correctly", async ({ page }) => {
    await page.goto("/");

    // Check if filter buttons are visible
    const filterButtons = page.locator('[data-testid^="filter-"]');
    await expect(filterButtons).toHaveCount(4);

    // Click on "Tênis" filter
    const sneakersFilter = page.locator('[data-testid="filter-Tênis"]');
    await sneakersFilter.click();

    // Wait for products to update
    await page.waitForSelector('.grid >> [data-testid="product-card"]');
    const products = await page
      .locator('.grid >> [data-testid="product-card"]')
      .count();
    expect(products).toBeGreaterThanOrEqual(5);

    // Check if "Tênis" button is active
    await expect(sneakersFilter).toHaveClass(/bg-\[#004197\]/);

    // Click on "Camisetas" filter
    const tshirtsFilter = page.locator('[data-testid="filter-Camisetas"]');
    await tshirtsFilter.click();
    await page.waitForSelector('.grid >> [data-testid="product-card"]');

    // Verify filtered products
    const tshirtsProducts = await page
      .locator('.grid >> [data-testid="product-card"]')
      .count();
    expect(tshirtsProducts).toBeGreaterThanOrEqual(5);

    // Check if "Camisetas" button is active
    await expect(tshirtsFilter).toHaveClass(/bg-\[#004197\]/);

    // Click on "All Products" filter
    const allProductsFilter = page.locator('[data-testid="filter-all"]');
    await allProductsFilter.click();
    await page.waitForSelector('.grid >> [data-testid="product-card"]');

    // Verify all products loaded
    const allProducts = await page
      .locator('.grid >> [data-testid="product-card"]')
      .count();
    expect(allProducts).toBeGreaterThanOrEqual(5);

    // Check if "All Products" button is active
    await expect(allProductsFilter).toHaveClass(/bg-\[#004197\]/);
  });
});

// Cart functionality tests
test.describe("Cart Functionality", () => {
  test("should add product to cart correctly", async ({ page }) => {
    await page.goto("/product/1");

    // Check initial cart state
    const cartItems = page.locator('[data-testid="cart-items"]');
    await expect(cartItems).toHaveCount(0);

    // Add product to cart
    const addToCartButton = page.locator('[data-testid="add-to-cart"]');
    await addToCartButton.click();

    // Verify cart updated
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems).toHaveText("1");

    // Add second item
    await addToCartButton.click();
    await expect(cartItems).toHaveText("2");

    // Navigate to cart page
    const cartButton = page.locator('[data-testid="cart-button"]');
    await cartButton.click();
    await page.waitForURL("/cart");

    // Verify product details in cart
    await expect(page.locator("[data-testid=product-name]")).toHaveText(
      "Tênis Futurista"
    );
    await expect(page.locator("[data-testid=description-content]")).toHaveText(
      "Tênis futurista com design inovador e confortável. Ideal para quem busca estilo e conforto."
    );
    await expect(page.locator("[data-testid=cart-item-quantity]")).toHaveText(
      "2"
    );
  });

  test("should remove product from cart correctly", async ({ page }) => {
    await page.goto("/product/1");

    // Add product to cart
    const cartItems = page.locator('[data-testid="cart-items"]');
    await expect(cartItems).toHaveCount(0);

    const addToCartButton = page.locator('[data-testid="add-to-cart"]');
    await addToCartButton.click();

    await expect(cartItems).toHaveCount(1);
    await expect(cartItems).toHaveText("1");

    await addToCartButton.click();

    // Go to cart page
    const cartButton = page.locator('[data-testid="cart-button"]');
    await cartButton.click();

    // Remove item
    const removeButton = page.locator('[data-testid="remove-button"]');
    await removeButton.click();

    // Verify cart is empty
    await expect(cartItems).toHaveCount(0);
  });

  test("should update product quantity in cart correctly", async ({ page }) => {
    await page.goto("/product/1");

    // Add product to cart
    const cartItems = page.locator('[data-testid="cart-items"]');
    await expect(cartItems).toHaveCount(0);

    const addToCartButton = page.locator('[data-testid="add-to-cart"]');
    await addToCartButton.click();

    await expect(cartItems).toHaveCount(1);
    await expect(cartItems).toHaveText("1");

    await addToCartButton.click();
    await expect(cartItems).toHaveText("2");

    // Go to cart page
    const cartButton = page.locator('[data-testid="cart-button"]');
    await cartButton.click();

    // Check initial quantity
    const quantity = page.locator('[data-testid="cart-item-quantity"]');
    await expect(quantity).toHaveText("2");

    // Decrease quantity
    const minusButton = page.locator('[data-testid="cart-item-minus"]');
    await minusButton.click();
    await expect(quantity).toHaveText("1");

    // Increase quantity
    const plusButton = page.locator('[data-testid="cart-item-plus"]');
    await plusButton.click();
    await expect(quantity).toHaveText("2");
  });

  test("should clear cart correctly", async ({ page }) => {
    await page.goto("/product/1");

    // Add products to cart
    const cartItems = page.locator('[data-testid="cart-items"]');
    await expect(cartItems).toHaveCount(0);

    const addToCartButton = page.locator('[data-testid="add-to-cart"]');
    await addToCartButton.click();

    await expect(cartItems).toHaveCount(1);
    await expect(cartItems).toHaveText("1");

    await addToCartButton.click();
    await expect(cartItems).toHaveText("2");

    // Go to cart page
    const cartButton = page.locator('[data-testid="cart-button"]');
    await cartButton.click();

    // Clear cart
    const clearButton = page.locator('[data-testid="clear-cart"]');
    await clearButton.click();

    // Verify cart is empty
    await expect(cartItems).toHaveCount(0);
  });

  test("should show empty cart message correctly", async ({ page }) => {
    await page.goto("/cart");

    // Check empty cart message
    const emptyCartMessage = page.locator("h1");
    await expect(emptyCartMessage).toHaveText("Seu carrinho está vazio");
  });
});

// Favorites functionality
test.describe("Favorites", () => {
  test("should add product to favorites correctly", async ({ page }) => {
    await page.goto("/product/1");

    // Click favorite button
    const heartButton = page.locator('[data-testid="favorite-button"]');
    await heartButton.click();

    // Verify favorite icon state
    const heartIcon = page.locator('[data-testid="favorite-icon"]');
    await expect(heartIcon).toHaveClass(
      /fill-red-500.*text-red-500|text-red-500.*fill-red-500/
    );
  });
});
