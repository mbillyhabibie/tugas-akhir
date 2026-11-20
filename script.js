
document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.querySelector(".nav-right input");
  const products = document.querySelectorAll(".product");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase().trim();

      products.forEach(function (product) {
        const productName = product.querySelector("h3")
          .textContent.toLowerCase();

        product.style.display = productName.includes(keyword)
          ? ""
          : "none";
      });
    });
  }

  const favoriteButtons = document.querySelectorAll(".heart");

  favoriteButtons.forEach(function (button) {
    button.style.cursor = "pointer";

    button.addEventListener("click", function () {
      if (this.textContent === "♡") {
        this.textContent = "♥";
        this.style.color = "red";
        showNotification("Produk ditambahkan ke favorit!");
      } else {
        this.textContent = "♡";
        this.style.color = "black";
        showNotification("Produk dihapus dari favorit!");
      }
    });
  });

  let cart = [];

  products.forEach(function (product) {
    const addButton = document.createElement("button");

    addButton.textContent = "ADD TO CART";
    addButton.className = "add-cart";

    product.appendChild(addButton);

    addButton.addEventListener("click", function () {
      const name = product.querySelector("h3").textContent;
      const price = product.querySelector("strong").textContent;

      cart.push({ name, price });

      updateCart();
      showNotification(name + " berhasil masuk keranjang!");
    });
  });

  const cartIcon = document.querySelector(".nav-right span:last-child");

  function updateCart() {
    if (cartIcon) {
      cartIcon.textContent = "🛒 " + cart.length;
    }
  }

  if (cartIcon) {
    cartIcon.style.cursor = "pointer";

    cartIcon.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Keranjang belanja masih kosong.");
        return;
      }

      let message = "KERANJANG BELANJA\n\n";
      let total = 0;

      cart.forEach(function (item, index) {
        message += (index + 1) + ". " + item.name +
          " - " + item.price + "\n";

        total += Number(item.price.replace(/\D/g, ""));
      });

      message += "\nTotal: Rp " +
        total.toLocaleString("id-ID");

      alert(message);
    });
  }

  function showNotification(message) {
    const oldNotification =
      document.querySelector(".notification");

    if (oldNotification) {
      oldNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(function () {
      notification.remove();
    }, 3000);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(
    ".product, .category, .story > div"
  ).forEach(function (element) {
    element.classList.add("animate");
    observer.observe(element);
  });


  const backToTop = document.createElement("button");

  backToTop.textContent = "↑";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Kembali ke atas");

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", function () {
    backToTop.style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});

document.getElementById("contactForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();
    const status = document.getElementById("formStatus");

    if (nama === "" || email === "" || pesan === "") {
      status.textContent = "Harap isi semua kolom!";
      status.style.color = "red";
      return;
    }

    status.textContent =
      "Terima kasih, " + nama +
      "! Form berhasil diisi (mode demo).";

    status.style.color = "green";

    document.getElementById("contactForm").reset();
});
