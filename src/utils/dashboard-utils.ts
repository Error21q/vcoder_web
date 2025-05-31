import { UserRole } from "../common/auth-utils";

export function canViewDashboardStats(userRole: UserRole | null) {
  // Only allow Admin, Developer, and Manager to view dashboard stats
  return (
    userRole === UserRole.ADMIN ||
    userRole === UserRole.DEVELOPER ||
    userRole === UserRole.MANAGER
  );
}
