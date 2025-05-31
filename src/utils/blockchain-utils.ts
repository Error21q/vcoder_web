import { UserRole } from "../common/auth-utils";

export function canEdit(userRole: UserRole) {
  return userRole !== UserRole.SUPERVISOR;
}

export function canDelete(userRole: UserRole) {
  return userRole !== UserRole.DEVELOPER && userRole !== UserRole.SUPERVISOR;
}

export function canAdd(userRole: UserRole) {
  return userRole !== UserRole.SUPERVISOR;
}

export { UserRole };
