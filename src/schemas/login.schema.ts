import { userSchema } from "./user.schemas"

export const loginBodySchema = userSchema.omit({
    id: true,
    name: true
})