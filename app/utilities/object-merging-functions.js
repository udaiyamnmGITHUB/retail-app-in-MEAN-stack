
function mergeObjects(ObjToBeReturned, objTobeMerged) {

    for(var prop in objTobeMerged){
        ObjToBeReturned[prop] = objTobeMerged[prop];
    }
    return ObjToBeReturned;
}
exports.mergeObjects = mergeObjects;