import {message} from 'antd'
export const submitForm = (event, fields, setResponseMessage, user, history, mode, id, setLoading) => {

  const formPrompt = document.getElementById("formPrompt")
  formPrompt.innerText="Form Submitted"
  const callEndpoint =
    mode === "update"
      ? `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${id}`
      : "https://us-central1-cleanearth-api.cloudfunctions.net/app/events";
  const callMethod = mode === "update" ? "PATCH" : "POST";

  const formValues = {};

  fields &&
    fields.forEach((field) => {
      return (formValues[field.name[0]] = field.value);
    });

  if (!user) {
    return null;
  }
  formValues.userPhoto = user.photoURL;
  formValues.userId = user.uid;
  formValues.createdBy = user.displayName;
  formValues.hostedBy = user.displayName;

  console.log({ formValues });
  setLoading(true);
  fetch(callEndpoint, {
    method: callMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  })
    .then((result) => result.json())
    .then((data) => {
      
        setLoading(false);
        if(callMethod === 'PATCH'){
        return (
          history.push(`/event/${id}`) && message("Event Updated.")
        )} else {
          return history.push("/") 
        }  
    })
    .catch(() => setLoading(false));
  event.preventDefault();
};

export function getSingleEvent(id, setEvent) {
  fetch(`https://us-central1-cleanearth-api.cloudfunctions.net/app/event/${id}`)
    .then((res) => res.json())
    .then((data) => setEvent(data))
    .catch((error) => console.log(error));
}
