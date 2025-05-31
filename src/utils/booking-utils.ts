import { UserRole } from "../common/auth-utils";

export function canApprove(userRole: UserRole) {
  // Only allow roles except Developer and Supervisor
  return userRole !== UserRole.DEVELOPER && userRole !== UserRole.SUPERVISOR;
}

export function canCancel(userRole: UserRole) {
  // Only allow roles except Developer and Supervisor
  return userRole !== UserRole.DEVELOPER && userRole !== UserRole.SUPERVISOR;
}

export function canDeliver(userRole: UserRole) {
  // Allow Developer and all except Manager and Supervisor
  return userRole !== UserRole.MANAGER && userRole !== UserRole.SUPERVISOR;
}

export function canEdit(userRole: UserRole) {
  // Allow all except Manager and Supervisor
  return userRole !== UserRole.MANAGER && userRole !== UserRole.SUPERVISOR;
}

export function canDelete(userRole: UserRole) {
  // Allow all except Manager and Supervisor
  return userRole !== UserRole.MANAGER && userRole !== UserRole.SUPERVISOR;
}

export function canAdd(userRole: UserRole) {
  // Allow all except Manager and Supervisor
  return userRole !== UserRole.MANAGER && userRole !== UserRole.SUPERVISOR;
}
