import Joi from 'joi-browser'
import ValidationMessages from './localized-validation-messages';

export function validateModel(data, schema) {
    const { error } = Joi.validate(data, schema, { abortEarly: false, stripUnknown: true });
    if (!error) {
        return null;
    }

    const errorData = {};
    error.details.forEach(x => {
        errorData[x.path[0]] = ValidationMessages[x.type]
    });
    return errorData;
}