module.exports = otpTemplate = (name, otp) => `
Dear ${name}, \n
Your OTP to reset SARVH account password is: ${otp}.\n
OTP expires after 1 hour.
`;
