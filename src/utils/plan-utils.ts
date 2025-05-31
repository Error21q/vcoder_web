import { UserRole } from "../common/auth-utils";

export function canEdit(userRole: UserRole) {
  // All except Supervisor can edit
  return userRole !== UserRole.SUPERVISOR;
}

export function canDelete(userRole: UserRole) {
  // All except Developer and Supervisor can delete
  return userRole !== UserRole.DEVELOPER && userRole !== UserRole.SUPERVISOR;
}

export function canAdd(userRole: UserRole) {
  // All except Supervisor can add
  return userRole !== UserRole.SUPERVISOR;
}
