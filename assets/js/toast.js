const toast = document.getElementById('toast');
var toast_count = 0;

class TOAST_TYPE {
    static INFO = 'info';
    static SUCCESS = 'success';
    static ERROR = 'error';
    static WARNING = 'warning';
};

/**
 * 
 * @param {string} message - The message that the toast will show
 * @param {string} type - The type that the toast will be. Available types: 'info', 'success', 'error', 'warning'
 * @param {number} duration - The duration that the toast will last
 */
function createToast(message = null, type = 'info', duration = 3000) {
    if (message === null) return;
    if (!TOAST_TYPE.hasOwnProperty(type.toLocaleUpperCase())) {
        return;
    }

    toast_count++;

    const notif = document.createElement('div');
    const img = document.createElement('img');
    img.src = "/assets/svg/toast/" + type + ".svg";
    img.height = "20";
    img.style.paddingRight = "1em";

    notif.classList.add('toast');
    notif.classList.add(type);

    notif.innerText = message;
    
    notif.appendChild(img);
    toast.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = 0;
        notif.style.transform = "translateY(calc(100% * " + toast_count + "))";

        setTimeout(() => {
            notif.remove()
            toast_count--;
        }, 500);
    }, duration);
}