import { Role } from '#utils/enum.util'
import { NumberNormalizer } from '#utils/function.util'
import { ResponsibleSchema } from '#validators/responsible.validator'
import { SchoolSchema } from '#validators/school.validator'
import { StudentSchema } from '#validators/student.validator'
import vine from '@vinejs/vine'

export const AuthSignInSchema = vine.object({
  access: vine.enum(Role),
  login: vine.string().trim(),
  password: vine.string().trim(),
})

export const AuthSignUpSchema = vine.object({
  name: vine.string().trim(),
  email: vine.string().email().trim(),
  password: vine.string().trim().minLength(8),
  responsible: ResponsibleSchema.clone().optional(),
  school: SchoolSchema.clone().optional(),
  student: StudentSchema.clone().optional(),
  access: vine.enum(Role),
})

export const AuthCheckExistFieldSchema = vine.object({
  access: vine.enum(Role),
  email: vine.string().email().optional(),
  cpf: vine.string().trim().transform(NumberNormalizer).optional(),
})

export const AuthSignInValidator = vine.compile(AuthSignInSchema)
export const AuthSignUpValidator = vine.compile(AuthSignUpSchema)
export const AuthCheckExistFieldValidator = vine.compile(AuthCheckExistFieldSchema)
