
export const convertBase64toURL = (base64Buffer, mimetype = 'image/png') => {
    if (!base64Buffer) {
        return "/placeholder-image.jpg";
    }

    // If base64Buffer is already a data URL, return it
    if (typeof base64Buffer === 'string' && base64Buffer.startsWith('data:')) {
        return base64Buffer;
    }

    // Convert buffer to base64 string if needed
    let base64String = base64Buffer;
    if (base64Buffer.type === 'Buffer' && base64Buffer.data) {
        // Convert Buffer object to base64 string
        base64String = btoa(String.fromCharCode(...base64Buffer.data));
    } else if (Array.isArray(base64Buffer)) {
        // Convert array to base64 string
        base64String = btoa(String.fromCharCode(...base64Buffer));
    }

    const url = `data:${mimetype};base64,${base64String}`;
    return url;
};