window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

function showDemoAlert(event) {
  event.preventDefault(); // Prevent the default link behavior
  alert("This feature will soon be available!");
}
function showDemoNotification(event) {
  event.preventDefault();
  
  const popup = document.getElementById('notification-popup');
  popup.classList.add('show');
  
  // Auto hide after 4 seconds
  setTimeout(() => {
    closeNotification();
  }, 4000);
}

function closeNotification() {
  const popup = document.getElementById('notification-popup');
  popup.classList.remove('show');
  popup.classList.add('hide');
  
  // Reset classes after animation
  setTimeout(() => {
    popup.classList.remove('hide');
  }, 400);
}

const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileOverlay = document.getElementById('mobile-nav-overlay');

mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
});