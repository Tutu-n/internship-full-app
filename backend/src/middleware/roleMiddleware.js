
const roleHierarchy = {
    student : 1,
    mentor: 2,
    admin: 3
};

const roleMiddleware = (requiredRole) => {
    return (req, res, next) =>{
        const userRole = req.user.role;

        if(!userRole){
            return res.status(403).json({
                message: 'Role not found'
            });
        }

        if(roleHierarchy[userRole] < roleHierarchy[requiredRole]){
            return res.status(403).json({
                message: 'Access denied: insufficient permissions'
            });
        }
        next(); //User has required role, proceed and grant access
    };
};

/*const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied: insufficient permissions' 
    });
    }
    next(); //User has required role, proceed

    };
};
*/
export default roleMiddleware;