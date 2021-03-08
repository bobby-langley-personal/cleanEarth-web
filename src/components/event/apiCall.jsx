export const submitForm = (event, formValues, setResponseMessage, user) => {
  console.log(formValues);
  if (!user) {
    return null;
  }

  formValues.userId = user.uid
  formValues.createdBy = user.displayName
  formValues.hostedBy = user.displayName

  fetch(
    "https://us-central1-cleanearth-api.cloudfunctions.net/app/events",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }
  )
    .then((result) => result.json())
    .then((data) => {
      data.statusCode < 300
        ? setResponseMessage(data.message)
        : console.log("error");
    })
    .catch((error) => console.log("error", error));
  // event.preventDefault();
};
