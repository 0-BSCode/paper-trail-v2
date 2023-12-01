/**
 * Collection of helper methods to do input validation for the UserProfileModal component.
 *
 * Empty fields are considered valid because they are optionally filled out.
 */
const isValid = {
  fullName: (fullName: string): boolean => {
    if (fullName === '') return true;
    const fullNamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; // Matches names with spaces and common punctuation
    return fullNamePattern.test(fullName);
  },
  studentNumber: (studentNumber: string): boolean => {
    if (studentNumber === '') return true;
    const studentNumberPattern = /^[0-9]{8}$/; // Matches 8 digits
    return studentNumberPattern.test(studentNumber);
  },
  contactNumber: (contactNumber: string): boolean => {
    if (contactNumber === '') return true;
    const contactNumberPattern = /^\+[1-9]\d{7,14}$/; // Matches international phone number format
    return contactNumberPattern.test(contactNumber);
  },
  courseAndYear: (courseAndYear: string): boolean => {
    if (courseAndYear === '') return true;
    const courseAndYearPattern = /^[A-Z]{4}-[1-5]$/; // Matches format XXXX-N, where XXXX is 4 uppercase letters and N is a single digit from 1 to 5
    return courseAndYearPattern.test(courseAndYear);
  },
};

export default isValid;
