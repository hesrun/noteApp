const formatDateEn = (inputDate) => {
    if (!inputDate) return null;
    const date = new Date(inputDate);
    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formatted;
};
export default formatDateEn;
