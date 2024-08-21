/* document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('validat');
  form.addEventListener('submit', (event) => {
       event.preventDefault(); // Prevent form from submitting immediately

        const name = document.getElementById('NAME').value;
        const dob = document.getElementById('date_of_birth').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const checkPassword = document.getElementById('check_password').value;

        if (!name || !email || !password || !checkPassword) {
            alert('All fields are required!');
            return;
        }

        if (password !== checkPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (dob && new Date(dob) > new Date()) {
            alert('Date of Birth cannot be in the future!');
            return;
        }
        form.submit();
    });
});
 */
/* document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validat');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting immediately

        const name = document.getElementById('NAME').value;
        const dob = document.getElementById('date_of_birth').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const checkPassword = document.getElementById('check_password').value;

        // Client-side validation
        if (!name || !email || !password || !checkPassword) {
            alert('All fields are required!');
            return;
        }

        if (password !== checkPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (dob && new Date(dob) > new Date()) {
            alert('Date of Birth cannot be in the future!');
            return;
        }

        // If validation passes, submit the form
        form.submit(); // This will only be called if all validations pass
    });
});
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validat');

    const submitForm = (formValue) => {
        const url = "http://localhost:3000/submit-form";
        fetch(url, {
            method: "POST", // Use POST for form submission
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response', data);
        })
        .catch(error => {
            console.error('There is a problem:', error);
        });
    };

    const handleForm = function(event) {
        event.preventDefault();
        const errors = {};
        const form = event.target;

        const formValue = {
            name: form.NAME.value.trim(),
            dob: form.date_of_birth.value.trim(),
            email: form.email.value.trim(),
            password: form.password.value.trim(),
            checkPassword: form.check_password.value.trim(),
        };

        // Clear previous errors
        document.querySelectorAll('.error').forEach(span => span.textContent = '');

        // Validate each field
        if (!formValue.name) {
            errors.name = "Name is required";
        }
        if (!formValue.email) {
            errors.email = "Email is required";
        }
        if (!formValue.password) {
            errors.password = "Password is required";
        }
        if (formValue.password !== formValue.checkPassword) {
            errors.checkPassword = "Passwords do not match!";
        }
        if (formValue.dob && new Date(formValue.dob) > new Date()) {
            errors.dob = "Date of Birth cannot be in the future!";
        }

        // If there are errors, display them below the relevant fields
        if (Object.keys(errors).length > 0) {
            for (let key in errors) {
                let errorSpan = document.getElementById(`${key}_error`); // Updated ID to match your HTML
                if (errorSpan) {
                    errorSpan.textContent = errors[key];
                    errorSpan.style.color = 'red'; // Display the error in red
                }
            }
        } else {
            // If no errors, submit the form
            submitForm(formValue);
        }
    };

    form.addEventListener('submit', handleForm);
});
