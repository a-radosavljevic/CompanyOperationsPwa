import { Buffer } from 'buffer';
import { allowedPreviewTypes, contentTypeMap } from './document.data';
import moment from 'moment';

export function isPreviewSupported(contentType) {
    return allowedPreviewTypes.includes(contentType);
}

export function dataURLToByteArray(dataURL) {
    const base64string = dataURL.split(',')[1];
    const decodedString = Buffer.from(base64string, 'base64');
    const byteArray = new Uint8Array(decodedString.length);

    for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString[i];
    }

    return byteArray;
}

export function byteArrayToDataURL(bytes, contentType) {
    const base64String = Buffer.from(bytes).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64String}`;
    return dataUrl;
}

export function getContentTypeFromDataURL(dataURL) {
    const match = dataURL.match(/^data:(.*?);/);
    if (match && match.length >= 2) {
        return match[1];
    }
    return null;
}

export function getContentTypeFromExtension(extension) {
    const contentType = contentTypeMap[extension];
    return contentType || 'application/octet-stream';
}

export function getFileExtension(fileName) {
    const extension = fileName.split('.').pop();
    return extension;
}

export function convertLocalToUTCDate(date) {
    if (date) return moment(new Date(date)).format('DD.MM.YYYY HH:mm');
    else return '';
}