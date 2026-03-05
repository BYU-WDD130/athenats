
// Open modals
const modalLinks = document.querySelectorAll('.open-modal');
const modals = document.querySelectorAll('.modal');

modalLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const modalId = this.dataset.modal;
    document.getElementById(modalId).classList.remove('hidden');
  });
});

// Close modals
modals.forEach(modal => {
  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Close by clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

});


const navbutton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  navBar.classList.toggle('show');  
});
// ---- FOOTER DATES ----
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("LastModified").textContent = "Last Modified: " + document.lastModified;