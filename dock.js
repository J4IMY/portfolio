class Dock {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            items: [],
            spring: { mass: 0.1, stiffness: 150, damping: 12 },
            magnification: 70,
            distance: 200,
            panelHeight: 68,
            dockHeight: 256,
            baseItemSize: 50,
            ...options
        };
        
        this.mouseX = Infinity;
        this.isHovered = false;
        this.dockItems = [];
        this.leaveTimeout = null;
        
        this.init();
    }
    
    init() {
        this.createDockStructure();
        this.setupEventListeners();
        this.render();
    }
    
    createDockStructure() {
        this.container.innerHTML = `
            <div class="dock-outer">
                <div class="dock-panel" role="toolbar" aria-label="Application dock">
                </div>
            </div>
        `;
        
        this.dockPanel = this.container.querySelector('.dock-panel');
        this.dockOuter = this.container.querySelector('.dock-outer');
        
        // Set initial height
        this.dockPanel.style.height = `${this.options.panelHeight}px`;
    }
    
    setupEventListeners() {
        // Use the outer container for hover detection to prevent flickering
        this.dockOuter.addEventListener('mousemove', (e) => {
            this.isHovered = true;
            this.mouseX = e.clientX;
            this.updateDock();
        });
        
        this.dockOuter.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.mouseX = Infinity;
            this.updateDock();
        });
        
        // Add some buffer time to prevent rapid flickering
        this.dockOuter.addEventListener('mouseenter', () => {
            clearTimeout(this.leaveTimeout);
        });
    }
    
    render() {
        this.dockPanel.innerHTML = '';
        this.dockItems = [];
        
        this.options.items.forEach((item, index) => {
            const dockItem = this.createDockItem(item, index);
            this.dockPanel.appendChild(dockItem.element);
            this.dockItems.push(dockItem);
        });
    }
    
    createDockItem(item, index) {
        const element = document.createElement('div');
        element.className = `dock-item ${item.className || ''}`;
        element.tabIndex = 0;
        element.setAttribute('role', 'button');
        element.setAttribute('aria-haspopup', 'true');
        
        // Create icon
        const icon = document.createElement('div');
        icon.className = 'dock-icon';
        icon.innerHTML = item.icon;
        
        // Create label
        const label = document.createElement('div');
        label.className = 'dock-label';
        label.textContent = item.label;
        label.style.opacity = '0';
        label.style.transform = 'translateX(-50%) translateY(0px)';
        
        element.appendChild(icon);
        element.appendChild(label);
        
        // Event listeners
        element.addEventListener('click', item.onClick);
        element.addEventListener('mouseenter', () => this.showLabel(label));
        element.addEventListener('mouseleave', () => this.hideLabel(label));
        element.addEventListener('focus', () => this.showLabel(label));
        element.addEventListener('blur', () => this.hideLabel(label));
        
        // Set initial size
        element.style.width = `${this.options.baseItemSize}px`;
        element.style.height = `${this.options.baseItemSize}px`;
        
        return {
            element,
            label,
            baseSize: this.options.baseItemSize
        };
    }
    
    showLabel(label) {
        label.style.opacity = '1';
        label.style.transform = 'translateX(-50%) translateY(-10px)';
        label.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }
    
    hideLabel(label) {
        label.style.opacity = '0';
        label.style.transform = 'translateX(-50%) translateY(0px)';
        label.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }
    
    updateDock() {
        const maxHeight = Math.max(this.options.dockHeight, this.options.magnification + this.options.magnification / 2 + 4);
        const targetHeight = this.isHovered ? maxHeight : this.options.panelHeight;
        
        // Animate dock height
        this.animateHeight(this.dockOuter, targetHeight);
        
        // Update item sizes with improved distance calculation
        this.dockItems.forEach((dockItem) => {
            const rect = dockItem.element.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(this.mouseX - itemCenter);
            
            let targetSize = this.options.baseItemSize;
            if (this.isHovered && distance < this.options.distance) {
                const factor = Math.max(0, 1 - (distance / this.options.distance));
                const sizeIncrease = (this.options.magnification - this.options.baseItemSize) * factor;
                targetSize = this.options.baseItemSize + sizeIncrease;
            }
            
            this.animateSize(dockItem.element, targetSize);
        });
    }
    
    animateHeight(element, targetHeight) {
        element.style.transition = 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.height = `${targetHeight}px`;
    }
    
    animateSize(element, targetSize) {
        element.style.transition = 'width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.width = `${targetSize}px`;
        element.style.height = `${targetSize}px`;
        // Use transform origin to grow from bottom
        element.style.transformOrigin = 'center bottom';
    }
    
    updateItems(newItems) {
        this.options.items = newItems;
        this.render();
    }
}

// Export for use
window.Dock = Dock;