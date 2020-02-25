signin_wellcome = Добро пожаловать в {$appName}
signin_already_registered = Уже есть аккаунт? <linkLogin>Войти</linkLogin>
<#-- should take an English fallback -->
signin_create_account_heading = Создать аккаунт
signin_email_input = 
    .placeholder = ваш имейл
signin_password_input = 
    .placeholder = пароль
signin_btn_terms = Согласен с <linkTerms>условиями</linkTerms> и <linkPolicy>политикой приватности</linkPolicy>
signin_btn_register = регистрация
<#-- complex example -->
shared-photos = пользователь {$userName} {$photoCount ->
        [one] добавил новое фото
       *[other] добаил {$photoCount} новых фото
    } в {$userGender ->
        [male] в его альбом
        [female] в её альбом
       *[other] в их альбом
    }.