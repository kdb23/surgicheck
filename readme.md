Phase 5 Project - SurgiCheck

A user must login to preform any actions or see any information. A sign up is located on the login page for users without a login. Username must be unique in addition to passwords being atleast 8 characters long.

Once logged in the user is able to add a patient and then is transported to patient list. A search bar is avaiable at the top of the page which enables the patient list to be searched through by patient name or mrn.

A user is able to see a list of all patients(name, mrn, dob and the procedure (name and attending surgeon only)) and then select the patient to see that particular patient's information (personal information, procedure details, and the checklist). Once patient is selected the user is able to update and delete the individual patient in addition to updating individual checklist and/or procedure details. 

In the admin user section a user is able to add a new surgeon to post a procedure and add patients' to thier list. A user can also see a list of surgeons (procedures) and the patients associated with that surgeon

useContext used for Login 

Stretch:
** Master admin account is able to create logins for staff accounts with temporary passwords. Staff able to login with temporary login and prompted to change information immediately **

** Associate a certain surgery with a certain checklist (TKA differs from Phase 3 DBS)**

## Work In Progress ##

-When making a new pateint - associated with procedure and fully incomplete checklist(user able to edit procedure associated with patient, user able to edit checklist --- flask upload for fake consent page ?)

- List of surgeons and their pateints

- Delete procedures and associated checklist

- Bootstrap of Individual Patient page
 
- Add Image to patient profiles

-Admin Login Page (Recovery Email, Change Password, Admin Stock Photo)

- Front End Error handleing

-Validations for Password (8 characters, must contain an Uppercase letter and a number)
    -front end window alert for unique username
    -popup ? for window alert of sign up error
