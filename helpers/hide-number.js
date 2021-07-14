const hideNumber = (phoneNumber = '') => {
    return phoneNumber.replace(/[0-9]/g, 'x');
}

module.exports = {
    hideNumber
}