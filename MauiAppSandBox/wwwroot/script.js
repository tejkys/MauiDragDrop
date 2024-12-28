var DragDrop = DragDrop || {};
function makeDraggable(element) {
    var slides = document.getElementsByClassName("dd-item");
    var previousHoverElement = null;
    for (var i = 0; i < slides.length; i++) {
        slides[i].addEventListener('touchmove', (event) => {
            event.preventDefault();
            event.target.style.position = 'absolute';
            event.target.style.zIndex = '99';
            event.target.style.left = event.touches[0].clientX + 'px';
            event.target.style.top = event.touches[0].clientY + 'px';
            var hoverElement = document.elementFromPoint(
                event.touches[0].clientX,
                event.touches[0].clientY
            );
            if (hoverElement != null && (hoverElement.classList.contains("dd-item") || hoverElement.classList.contains("dd-box"))) {
                hoverElement.classList.add('dd-hover');
            }
            if (previousHoverElement != hoverElement) {
                if (previousHoverElement != null) { previousHoverElement.classList.remove('dd-hover'); }
                previousHoverElement = hoverElement;
            }

        }, false);
        slides[i].addEventListener('touchend', (event) => {
            var endTarget = document.elementFromPoint(
                event.changedTouches[0].pageX,
                event.changedTouches[0].pageY
            );
            event.target.style.position = 'static';
            event.target.style.zIndex = '1';
            if (endTarget != null && endTarget.classList.contains("dd-box")) {
                DotNet.invokeMethodAsync('MauiAppSandBox', 'OnDropNode', event.target.dataset.id, endTarget.dataset.id, '');
            }
            else if (endTarget != null && endTarget.classList.contains("dd-item")) {
                DotNet.invokeMethodAsync('MauiAppSandBox', 'OnDropNode', event.target.dataset.id, endTarget.parentElement.dataset.id, endTarget.dataset.id);
            }
            previousHoverElement.classList.remove('dd-hover');
        });
    }
}
