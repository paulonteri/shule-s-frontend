export function findAndReplace(old_array, new_object) {
    const myNewArray = old_array.filter(function (obj) {
        return obj.id !== new_object.id;
    });
    myNewArray.push(new_object);
    return myNewArray;
}

export function deleteObject(old_array, deleted_object_id) {
    const dataAfterDelete = old_array.filter(
        (obj) => obj.id !== deleted_object_id
    );
    return dataAfterDelete;
}
