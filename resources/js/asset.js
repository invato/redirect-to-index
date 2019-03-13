Nova.booting((Vue, router, store) => {
    router.beforeEach((to, from, next) => {

        // Are we moving from a create or edit to a detail view and is the resourceName the same on both the from and to object?
        if ((from.name == 'create' || from.name == 'edit') && to.name == 'detail' && from.params.resourceName == to.params.resourceName) {

            // We want to go back to the detail of the parent resource where this resource was made.
            if(from.query.viaResource) {
                let newTo = {
                    name : 'detail',
                    params: {
                        resourceName: from.query.viaResource,
                        resourceId: from.query.viaResourceId
                    }
                }
                next(newTo)
                return;
            }

            // In case there was no parent resource, we just go back to the index of the current.
            let newTo = {
                name : 'index',
                params: {
                    resourceName: to.params.resourceName
                }
            }
            next(newTo)
            return;
        }

        // Any other route we just ignore everything and go on as usual.
        next()
    })
});
