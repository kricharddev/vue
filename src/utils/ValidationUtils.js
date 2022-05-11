export const textValidationUtils = {
    phoneNumberPattern:/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    numberTextPattern:/^[0-9]/,
    currencyTextPattern:/(^\$)([0-9]*)\.(\d{2})/
};

export const customValidatorUtils = ({
    callbacks,
    validationLogic,
    isValidValue,
    isInvalidValue,
}) => {
    let isValidated = isValidValue;

    const revalidate = () => {
        callbacks.forEach((func) => {
            func();
        });
    };

    const adapterConfig = {
        getValue: () => {
            return validationLogic;
        },
        applyValidationResults: (e) => {
            isValidated = e.isValid ? isValidValue : isInvalidValue;
        },
        validationRequestsCallbacks: callbacks,
    };

    return {
        revalidate,
        adapterConfig,
        isValidated,
    }
}