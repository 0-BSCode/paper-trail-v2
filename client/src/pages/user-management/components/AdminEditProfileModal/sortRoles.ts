/**
 * Helper function to keep track of roles in an order-agnostic way.
 */
const sortRoles = (roles: string[]): string[] => {
  return roles.sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export default sortRoles;
