export function validate(productSchema){
    return (request, response, next) => {
        const result = productSchema.safeParse(request.body);
        if(!result.success){
            return response.status(400).jason({
                error: "validation failed",
                details: result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }
        request.body = result.data;
        next();
    };
}