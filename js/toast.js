const Toast = {
  init() {
    this.hideTimeout = null;

    this.el = document.createElement("div");
    this.el.className = "toast";
    document.body.appendChild(this.el);
  },

  show(message, state, position) {
    clearTimeout(this.hideTimeout);

    this.el.textContent = message;
    this.el.className = "toast toast--visible";

    if (state) {
      this.el.classList.add(`toast--${state}`);
    }

    if (position) {
      this.el.classList.add(`toast--${position}`);
    }

    this.hideTimeout = setTimeout(() => {
      this.el.classList.remove("toast--visible");
    }, 3000);
  }
};

const ToastImage = {
  init() {
    this.hideTimeout = null;

    this.el = document.createElement("div");
    this.el.className = "toast-image";

    this.text = document.createElement('h2');
    this.image = document.createElement('img');
    this.link = document.createElement('a');

    this.el.appendChild(this.image);
    this.el.appendChild(this.text);
    this.el.appendChild(this.link);
    document.body.appendChild(this.el);
  },

  show(img, message, link) {
    clearTimeout(this.hideTimeout);

    this.image.src = img;
    this.text.textContent = message;
    this.el.className = "toast-image toast-image--visible";

    if (link) {
      this.link.textContent = 'Entrar';
      this.link.href = link;
      //alert(link)
    }

    this.hideTimeout = setTimeout(() => {
      this.el.classList.remove("toast-image--visible");
    }, 3000);
  }
};

document.addEventListener("DOMContentLoaded", () => ToastImage.init());
document.addEventListener("DOMContentLoaded", () => Toast.init());