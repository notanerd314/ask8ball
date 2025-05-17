interface DictArrayElements {
    [key: string]: string[]
}

export async function sendAsyncGetRequest(url: string, param = null) {
    const parameters = param ? new URLSearchParams(param).toString() : "";
    const fullUrl = parameters ? `${url}?${parameters}` : url;
    console.log(fullUrl)

    const request = await fetch(fullUrl, { method: 'GET' });

    if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
    }

    return await request.json();
}

export function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayElement(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

export function toggleModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal && modal.open) {
        modal.close();
    } else {
        modal.showModal();
    }
}

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text successfully copied to clipboard!');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}

/* dropdown */

export function preventDropdownInjection() {
    const dropdownContents: DictArrayElements = {};
    document.querySelectorAll('select').forEach(dropdown => {
        dropdownContents[dropdown.id] = Array.from(dropdown.options).map(option => option.value.toLowerCase());
    });

    Array.from(document.querySelectorAll('select')).forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            const dropdownOptions = dropdownContents[dropdown.id];
            if (!dropdownOptions.includes(dropdown.value)) {
                alert("Invalid selection. Please choose a valid option.");
            }
        });
    });
}

export function applyFunctionToModalClose() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.dialog__close');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const dialogId = button.dataset.dialogId;
            if (dialogId) toggleModal(dialogId);
        });
    });
}

export function applyFunctionToCopyButtons() {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy_button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inputId = button.dataset.inputId as string;
            console.log(inputId)
            const input = document.getElementById(inputId) as HTMLInputElement;
            copyToClipboard(input.value);
        });
    });
}

export function createNotification(icon_link: string, text: string, timeout: number = 3000) {
    const notificationBar = document.getElementById("notification-bar") as HTMLDivElement;
    
    if (!notificationBar) {
        throw new Error("Notification bar not found");
    }

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = text;
    notificationBar.appendChild(notification);
}

