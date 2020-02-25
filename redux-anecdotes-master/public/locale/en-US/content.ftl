signin_wellcome = wellcome to {$appName}
signin_already_registered = Already have an account? <linkLogin>Log in</linkLogin>
signin_create_account_heading = Create an account
signin_email_input = 
    .placeholder = Your Email
signin_password_input = 
    .placeholder = Create a password
signin_btn_terms = Аgree to <linkTerms>Terms&Conditions</linkTerms> and <linkPolicy>Privacy Policy</linkPolicy>
signin_btn_register = Register
<#-- complex example -->
shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.