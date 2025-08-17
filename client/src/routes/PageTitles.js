const pageTitles = {
  "/": {
    title: "Home",
    breadcrumbs: [
      { name: "Home" }
    ]
  },

  "/dashboard": {
    title: "Dashboard",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Dashboard" }
    ]
  },

  "/products": {
    title: "All Products",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Products" }
    ]
  },

  "/products/:id": {
    title: "Product Details",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Details" }
    ]
  },

  "/users": {
    title: "Users",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Users" }
    ]
  },

  "/users/:userId": {
    title: "User Profile",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Users", path: "/users" },
      { name: "Profile" }
    ]
  },

  "/settings": {
    title: "Settings",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Settings" }
    ]
  }
};

export default pageTitles;
