export function aclObj(roles: Object) {
    if (!roles) return;
    let aclObj = {};
    roles.map((e: { name: string }) => {
        aclObj[`${'role' + ':' + e.name}`] = {
            read: true,
            write: true
        };
    });
    return aclObj;
}
