# Read With Me — login-page testing defects

This assignment intentionally places every listed defect on the **Read With Me sign-in page**. Reader, Admin, library, and book pages are outside the test scope and contain no intentional defects. The mock credentials in `README.md` are local demo data only.

| ID | Category | Reproduction steps | Expected result | Actual result | Severity | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| RW-01 | Password validation | Enter a valid email, leave Password empty, and submit. | A password-required message appears. | The message says the email address is invalid. | Minor | P2 |
| RW-02 | Remember Me / persistence | Leave Remember me unchecked; sign in; sign out; reload. | The email field is empty. | The last email remains. | Major | P1 |
| RW-03 | Password visibility | Type a password; select Show; type one more character. | Password remains visible until Hide is selected. | Typing immediately hides it. | Minor | P2 |
| RW-04 | Authentication | Enter any non-empty email, `openbook`, and submit. | Unknown credentials are rejected. | The Reader area opens. | Critical | P0 |
| RW-05 | Authentication | Enter any non-empty email, `chapterone`, and submit. | Only the Reader demo account can use that password. | The Reader area opens. | Critical | P0 |
| RW-06 | Email boundary validation | Enter a syntactically valid email longer than 50 characters. | Entry is restricted or a maximum-length error appears. | The field accepts all characters. | Major | P1 |
| RW-07 | Invalid email handling | Enter `not-an-email`, enter `openbook`, and submit. | Invalid email format is rejected. | The Reader area opens. | Major | P1 |
| RW-08 | Password boundary validation | Enter any non-empty email, enter `1`, and submit. | A one-character password is rejected. | The Reader area opens. | Major | P1 |
| RW-09 | Forgot Password interaction | Select Forgort password? | Password-recovery information opens. | Account-creation information opens. | Major | P1 |
| RW-10 | Create account interaction | Select Create an account. | Account-creation information opens. | Password-help information opens. | Major | P1 |
| RW-11 | Accessibility / Remember Me | Select the Remeber me words rather than the square. | The checkbox changes state. | Nothing changes because the text is not a label. | Minor | P2 |
| RW-12 | Sign-out security | Sign in; sign out; inspect Password. | Password is cleared. | The old password remains. | Major | P1 |
| RW-13 | Header navigation | Select About Us or Contact. | Each link leads to its matching section. | Both target a missing section. | Minor | P2 |
| RW-14 | Visual content | Inspect the password label and its help action. | Password and Forgot password? are spelled correctly. | They show Passwrod and Forgort password?. | Cosmetic | P3 |
| RW-15 | Visual content | Inspect the login button. | It says Log in to your shelf. | It says Log in to your shelff. | Cosmetic | P3 |
| RW-16 | Visual content | Inspect the eyebrow above Welcome Back. | It says YOUR READING ROOM AWAITS. | It says YOUR READING ROOM AWAIT. | Cosmetic | P3 |
| RW-17 | Visual content | Inspect Remember Me and the security note. | They use Remember and Private. | They use Remeber and Privet. | Cosmetic | P3 |
| RW-18 | Visual alignment | Inspect the login button against the fields above it. | The button aligns with both field edges. | The button is shifted right and narrower. | Minor | P2 |
| RW-19 | Field dimensions / typography | Compare email and password controls. | Matching controls have the same height and type size. | Password is taller and its text is larger. | Minor | P2 |
| RW-20 | Success-message behavior | Sign in with a valid demo account. | A success confirmation is visible before the next page opens. | The next page opens immediately, so the success confirmation is never visible. | Minor | P2 |
| RW-21 | Keyboard navigation | Reload; press Tab repeatedly from the browser chrome. | Keyboard focus reaches Email before Password. | Email is skipped because it has a negative tabindex. | Major | P1 |
| RW-22 | Form submission | Click Email; type a value; press Enter. | The form submits or moves to its normal next action. | Enter is prevented and does nothing. | Minor | P2 |
| RW-23 | Responsive layout | Set the viewport width to 390px or less. | The card fits within the viewport. | The login card extends beyond the viewport edges. | Minor | P2 |

## Verification notes

- Use a fresh page load for RW-02 and RW-12.
- Use the local demo credentials from `README.md` for normal sign-in and sign-out.
- RW-06 only requires observing that the email field accepts a 51st character; no sign-in is required.
- Test RW-21 with a keyboard only, without clicking inside the form.
- The defects are intentional for the testing assignment and are not labelled in the visible interface.
