## Forms

### The Manual Method

#### Initial Values

Often when using forms we need to pre-set values of a form field. This is often the case when the form is used to edit an existing value. A way to do this manually involves using local state to manage the field value:

```
import { useState } from "react";

export default function () {
  const [formEmail, setFormEmail] = useState("my@test.com");
  return (
    <form>
      <input
        name="email"
        value={formEmail}
        onChange={(event) => setFormEmail(event.target.value)}
      />
    </form>
  );
}
```

This looks fine, for a single field. But what if our form has 10 fields, or 20? We would end up with a lot of code to do something that is pretty simple. 

#### Validation

Another common need is to be able to validate a form at or before the time of submission. Checking for things like required fields that are empty or fields that require a certain type of input (like an email) and providing an error message to the user are common needs. A general way of doing that would be something like this:

```
import { useState } from "react";

export default function () {
  const [formEmail, setFormEmail] = useState("my@test.com");
  const [formEmailMessage, setFormEmailMessage] = useState();
  const [validationError, setValidationError] = useState(false);
  function onFormEmailChange(event) {
    const value = event.target.value;
    if (!value.includes("@")) {
      setFormEmailMessage("This must be an email address");
      setValidationError(true);
    } else {
      setFormEmailMessage("");
      setValidationError(false);
    }
    setFormEmail(value);
  }
  function handleFormSubmit(event) {
    if (validationError === true) {
      alert("There is a problem with one or more of your entries");
      event.preventDefault();
    }
  }
  return (
    <form>
      <input name="email" value={formEmail} onChange={onFormEmailChange} />
      <div>{formEmailMessage}</div>
      <input type="submit" onClick={handleFormSubmit} />
    </form>
  );
}
```

As you can see, this required writing a lot more code. We now need a new state field for any error message that the field will have (formEmailMessage), as well as an element to display that error message. We also need a state field to track whether the form is in a submittable (valid) state (validationError). 

We also have to write the actual validation code for each field. In this case it’s a single email field and all we are doing is checking for an '@' in the field value. 

Again, image if we have 10, 20 or 50 fields. We have to duplicate much of the code for each field, and then we need to write some code that checks the validation status of each field and determines whether the form itself is valid and able to be submitted. 

Surely there is a better way to do this.

### Formik

Formik is a JS library created exactly for the purpose of reducing all of that overhead. Using Formik allows for easier initial value setting and field validation. Let’s look at each one of those to see how it compares.

#### Initial Values

```
import React from "react";
import { Formik } from "formik";

export default function () {
  return (
    <Formik initialValues={{ email: "my@test.com" }}>
      {({ values, handleChange, handleBlur }) => (
        <form>
          <input
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </form>
      )}
    </Formik>
  );
}
```

Now that we are using Formik we don’t need to set up any state management ourselves, Formik handles all of it behind the scenes. Setting initial values is a snap.

#### Validation

```
import React from "react";
import { Formik } from "formik";

export default function () {
  return (
    <Formik initialValues={{ email: "my@test.com" }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <form>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email}
          <button type='submit'>Submit</button>
        </form>
      )}
    </Formik>
  );
}
```

Formik handles validation well. As you can see, just adding type='email' to the field tells Formik what it should check for. For most standard use-cases there is not need to write validation code yourself. 

As you can see, we have to assign a couple things to each field (onChange and onBlur ) that help Formik keep track of what is happening. 

This line: {touched.email && errors.email} is where any validation error message will be displayed once the submit button is clicked.

Note that Formik keeps tracking of all the fields in the form and knows whether it is submittable or not. If the submit button is clicked and one or more field is not valid then it will cancel the submission and notify the user. Pretty slick.

## Assignment

Let’s now take what we learned above and put it into practical use.

[Begin Assignment 8]()