export default function validateAddKeyword(values) {
  let errors = {};

  //Email Errors
  if (!values.keyword) {
    errors.email = "Keyword field is empty";
  } else if (values.keyword == "hello") {
    values.keyword = "Shut up";
  }

  return errors;
}
