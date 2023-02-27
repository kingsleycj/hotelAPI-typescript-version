import joi from "joi"

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const loginSchema = joi.object({
  preferred_method: joi.string().valid("Email", "Telephone"),
  email: joi
    .string()
    .email()
    .when("preferred_method", { is: "Email", then: joi.required() }),
  telephone: joi
    .string()
    .when("preferred_method", { is: "Telephone", then: joi.required() }),
  password: joi.string().min(3).max(10).required(),
  confirmPassword: joi.ref("password"),
  admin: joi.boolean().required(), // admin check
  guestCheck: joi.boolean().truthy("Yes").valid(true).required(), // an admin should also get user/guest permissions
});

const validateSchema = validator(loginSchema)

export default validateSchema;