import * as Yup from 'yup';

export default async (schema, data, formRef, reset) => {
    try {
        await schema.validate(data, {
            abortEarly: false,
        });
        reset();
        formRef.current.setErrors({});
        return true;
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            const errorMessages = {};
            err.inner.forEach(error => {
                errorMessages[error.path] = error.message;
            });
            formRef.current.setErrors(errorMessages);
        }
        return false;
    }
};
