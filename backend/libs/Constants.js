module.exports = Object.freeze({

    // encryption constants
    SALT_WORK_FACTOR:10,
    ALGORITHM: 'aes-256-ctr',
    EXPIRES: 4320,
    VERIFICATION_EXPIRES: 24,
    geo: {
        METERS_TO_MILES: 0.000621371192,
        MILES_TO_METERS: 1609.344,
        DEFAULT_DISTANCE: 20
    },
    roles: {
        VENDOR_ASSOCIATE: "VENDOR_ASSOCIATE",
        VENDOR_ADMIN: "VENDOR_ADMIN"
    },
    deal_types: {
        LIMITED: "LIMITED",
        BILLBOARD: "BILLBOARD"
    },  
    verification: {
        NOT_SUBMITTED: "Not subimitted",
        PENDING: "Pending",
        ACCEPTED: "Accepted",
        REJECTED: "Rejected"
    },
    communication_verification: {
        PHONE_CODE: "PHONE_CODE",
        PHONE_CALL: "PHONE_CALL",
        EMAIL_CODE: "EMAIL_CODE",
        EMAIL_TOKEN: "EMAIL_TOKEN",
    },
    request_status: {
        STATUS_PENDING: "PENDING",
        STATUS_APPROVED: "APPROVED",
        STATUS_REJECTED: "REJECTED"
    },
    messages: {
        INTERNAL_ERROR: "An internal error has occurred",
        USER_NOT_FOUND: "Authentication failed. User not found.",
        REDEMPTION_NOT_FOUND: "Redemptionr not found.",
        ADDRESS_NOT_FOUND: "Address not found.",
        INVALID_PASSWORD: "Authentication failed. Wrong password.",
        NO_PASSWORD: "No password provided.",
        USERNAME_EXISTS: "A user with this username already exists.",
        EMAIL_EXISTS: "A user with this email address already exists.",
        PHONE_EXISTS: "A user with this phone number already exists.",
        INVALID_USER: "Invalid user",
        UNAUTHORIZED_USER: "Unauthorized user",
        EXISTING_USER: "Username already exists",
        AUTHORIZED: "Authorized",
        INVALID_TOKEN: "Invalid token",
        TOKEN_EXPIRED: "Token has expired",
        VALID_TOKEN: "Token is valid",
        PASSWORD_RESET_ERROR: "Error requesting password reset",
        PASSWORD_RESET_ACCEPTED: "Password reset request accepted",
        INVITATION_REQUEST_ACCEPTED: "Invitation request accepted",
        PASSWORD_RESET_COMPLETE: "Password reset complete",
        PASSWORD_RESET_ALREDY_DONE: "This reset has already been performed",
        TOKEN_USER_NOT_FOUND: "User not found.",
        DEAL_NOT_FOUND: "Deal not found.",
        DEAL_EXPIRED: "Deal has expired.",
        DEAL_MAXED: "Deal max has been met.",
        LOCATION_NOT_FOUND: "Location not found.",
        USER_NOT_FOUND: "User not found.",
        AD_NOT_FOUND: "Ad not found.",
        COMMENTS_NOT_FOUND: "Comments not found.",
        REVIEWS_NOT_FOUND: "Reviews not found.",
        REQUESTS_NOT_FOUND: "Requests not found.",
        REQUEST_NOT_FOUND: "Request not found.",
        REPLY_NOT_FOUND: "Reply not found.",
        NO_EMAIL_FOUND: "No email found.",
        NO_INVITATION_FOUND: "No invitation found.",
        INVITATION_ALREADY_ACCEPTED: "Invitation already accepted.",
        INVITATION_ALREADY_REJECTED: "Invitation already rejected.",
        NO_PHONE_FOUND: "No phone number found.",
        NO_CODE_FOUND: "Code not found.",
        NO_TOKEN_FOUND: "Token not found.",
        PREVIOUSLY_VERIFIED: "Already Verified.",
        VERIFICATION_EXPIRED: "Verification has expired.",
        CURRENT_PASSWORD_NOT_PROVIDED: "Current password not provided.",
        NEW_PASSWORD_NOT_PROVIDED: "New password not provided.",
        MISSING_INFORMATION: "Some field(s) is/are empty"
    },
    mail: {
        PASSWORD_RESET_SUBJECT: "Password Reset",
        EMAIL_VERIFICATION_CODE_SUBJECT: "Verify Email",
        EMAIL_VERIFICATION_TOKEN_SUBJECT: "Verify Email",
        EMAIL_WELCOME: "Welcome to seekaya!",
        EMAIL_CONTACT: "Contact us from vendor - seekaya!",
        EMAIL_INVITE: "Inviation seekaya!"
    },
    templates: {
        PASSWORD_RESET: 1,
        PASSWORD_RESET_SMS: 2,
        EMAIL_VERIFICATION_CODE: 3,
        EMAIL_VERIFICATION_TOKEN: 4,
        PHONE_VERIFICATION_CODE: 5,
        WELCOME_EMAIL: 6,
        CONTACT_EMAIL: 7,
        INVITATION: 8
    },
    variables: {
        FIRST_NAME: "$$FIRST_NAME$$",
        LAST_NAME: "$$LAST_NAME$$",
        EMAIL_ADDRESS: "$$EMAIL_ADDRESS$$",
        USERNAME: "$$USERNAME$$",
        PASSWORD_RESET_HOURS: "$$PASSWORD_RESET_HOURS$$",
        PASSWORD_RESET_URL: "$$PASSWORD_RESET_URL$$",
        PASSWORD_RESET_ID: "$$PASSWORD_RESET_ID$$",
        EMAIL_VERIFICATION_RESET_HOURS: "$$EMAIL_VERIFICATION_RESET_HOURS$$",
        EMAIL_VERIFICATION_URL: "$$EMAIL_VERIFICATION_URL$$",
        EMAIL_VERIFICATION_TOKEN: "$$EMAIL_VERIFICATION_TOKEN$$",
        EMAIL_VERIFICATION_CODE: "$$EMAIL_VERIFICATION_CODE$$",
        INVITATION_ACCEPT_URL: "$$INVITATION_ACCEPT_URL$$",
        INVITATION_TOKEN: "$$INVITATION_TOKEN$$",
        SUBJECT: "$$SUBJECT$$",
        MESSAGE: "$$MESSAGE$$",
        CODE: "$$CODE$$",
        VENDOR_NAME: "$$VENDOR_NAME$$",
        VENDOR_ADDRESS: "$$VENDOR_ADDRESS$$",
        VENDOR_PHONE: "$$VENDOR_PHONE$$"
    }, 
    authorization: {
        ADD_VENDOR_USER: "VENDOR_ADMIN",
        
    }
});
