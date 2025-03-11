// Lightbox functionality
class Lightbox {
    constructor() {
        this.currentImageIndex = 0;
        this.images = Array.from(document.querySelectorAll('.image-gallery img'));
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        
        // Bind methods to maintain 'this' context
        this.updateNavigationButtons = this.updateNavigationButtons.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        
        this.init();
    }
    
    init() {
        // Add click handlers to all gallery images
        this.images.forEach(img => {
            img.addEventListener('click', () => this.openLightbox(img));
        });
        
        // Close lightbox when clicking outside the image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                this.closeLightbox();
            }
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft' && this.currentImageIndex > 0) {
                    this.changeImage(-1);
                } else if (e.key === 'ArrowRight' && this.currentImageIndex < this.images.length - 1) {
                    this.changeImage(1);
                } else if (e.key === 'Escape') {
                    this.closeLightbox();
                }
            }
        });
        
        // Add click handlers for navigation buttons
        document.querySelector('.nav-btn.prev').addEventListener('click', () => this.changeImage(-1));
        document.querySelector('.nav-btn.next').addEventListener('click', () => this.changeImage(1));
        document.querySelector('.close-btn').addEventListener('click', this.closeLightbox);
    }
    
    updateNavigationButtons() {
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        
        prevBtn.classList.toggle('disabled', this.currentImageIndex === 0);
        nextBtn.classList.toggle('disabled', this.currentImageIndex === this.images.length - 1);
    }
    
    openLightbox(img) {
        // Find the index of clicked image
        this.currentImageIndex = this.images.indexOf(img);
        
        // Set the image source
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = img.alt;
        
        // Show the lightbox
        this.lightbox.style.display = 'block';
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Prevent body scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    }
    
    changeImage(direction) {
        const newIndex = this.currentImageIndex + direction;
        
        // Check if the new index is within bounds
        if (newIndex >= 0 && newIndex < this.images.length) {
            this.currentImageIndex = newIndex;
            const newImage = this.images[this.currentImageIndex];
            
            this.lightboxImg.src = newImage.src;
            this.lightboxImg.alt = newImage.alt;
            
            this.updateNavigationButtons();
        }
    }
    
    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
}); 