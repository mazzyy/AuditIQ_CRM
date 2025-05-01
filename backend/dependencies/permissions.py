ROLE_HIERARCHY = {
    "superuser": 1,
    "admin": 2,
    "auditor": 3,
    "manager": 4,
    "trial": 5  # optional, if trial is in your system
}

def can_update(current_user_role: str, target_role: str) -> bool:
    # Superuser can update anyone
    if current_user_role == "superuser":
        return True
    # Admin can update auditor + manager
    if current_user_role == "admin" and target_role in ["auditor", "manager"]:
        return True
    # Auditor can update manager
    if current_user_role == "auditor" and target_role == "manager":
        return True
    return False
