export const getError = (firebaseErr) => {
  if (firebaseErr.includes("Firebase: Error (auth/")) {
    return firebaseErr
      .replace("Firebase: Error (auth/", "")
      .replace(").", "")
      .split("-")
      .join(" ")
  } else {
    return "something went wrong"
  }


}