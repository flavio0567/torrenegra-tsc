# Backend

## Recover password

**FR** Funtional Requirements

- user should be able to recover the password given a email;
- user shuould receive an email with instructions do recovery the password;
- user should be able to reset his/her password;

**NFR** Non-Functional Requirements

- use Mailtrap tp test sendding emails at dev environment;
- use Amazon SES to send emails at production;
- the sedding email process should be started in background job;

**BR** Business Rules

- the link sent by email to reset password should expire in 2h;
- user should be able to confirm a new password when resetting his/her password

## Fritst access

**FR** Funtional Requirements

= [] First access

 - user should be able to change his/her password when first access 

**NFR** Non-Functional Requirements

**BR** Business Rules

- allow user to change his/her password when it is first access

